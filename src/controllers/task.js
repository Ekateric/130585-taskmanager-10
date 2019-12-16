import TaskView from "../views/task";
import TaskFormView from "../views/task-form";
import render from "../utils/render";

export default class TaskController {
  constructor(taskModel) {
    this._model = taskModel;
    this._view = new TaskView(this._model);
    this._taskElement = this._view.getElement();
    this._formView = new TaskFormView(this._model);
    this._taskFormElement = this._formView.getElement();
    this._parentElement = null;
  }

  _replaceViewToEdit() {
    this._parentElement.replaceChild(this._taskFormElement, this._taskElement);
  }

  _replaceEditToView() {
    this._parentElement.replaceChild(this._taskElement, this._taskFormElement);
  }

  render(renderToElement) {
    render(renderToElement, this._taskElement);
    this._parentElement = renderToElement;
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

  get element() {
    return this._taskElement;
  }

  get model() {
    return this._model;
  }
}
