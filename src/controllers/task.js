import TaskView from "../views/task";
import TaskFormView from "../views/task-form";
import render from "../utils/render";
import replace from "../utils/replace";

export default class TaskController {
  constructor(taskModel) {
    this._model = taskModel;
    this._view = new TaskView(this._model);
    this._formView = new TaskFormView(this._model);
  }

  _replaceViewToEdit() {
    replace(this._formView, this._view);
  }

  _replaceEditToView() {
    replace(this._view, this._formView);
  }

  render(renderToElement) {
    render(renderToElement, this._view);
    this.setHandlers();
  }

  setHandlers() {
    const _that = this;
    const onExitForm = (event) => {
      const isEscKey = event.key === `Escape` || event.key === `Esc`;

      if (isEscKey) {
        _that._replaceEditToView();
        document.removeEventListener(`keydown`, onExitForm);
      }
    };

    this._view.setClickEditButtonHandler(() => {
      this._replaceViewToEdit();

      document.addEventListener(`keydown`, onExitForm);
    });

    this._formView.setSubmitFormHandler(() => {
      this._replaceEditToView();
    });
  }

  get model() {
    return this._model;
  }
}
