import TaskView from "../views/task";
import TaskFormView from "../views/task-form";
import render from "../utils/render";
import replace from "../utils/replace";

export default class TaskController {
  constructor(taskModel, containerElement) {
    this._model = taskModel;
    this._view = new TaskView(this._model);
    this._formView = new TaskFormView(this._model);
    this._containerElement = containerElement;

    this._onExitForm = this._onExitForm.bind(this);
  }

  _replaceViewToEdit() {
    replace(this._formView, this._view);
  }

  _replaceEditToView() {
    replace(this._view, this._formView);
  }

  _onExitForm(event) {
    const isEscKey = event.key === `Escape` || event.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToView();
      document.removeEventListener(`keydown`, this._onExitForm);
    }
  }

  render() {
    render(this._containerElement, this._view);
    this.setHandlers();
  }

  setHandlers() {
    this._view.setClickEditButtonHandler(() => {
      this._replaceViewToEdit();

      document.addEventListener(`keydown`, this._onExitForm);
    });

    this._formView.setSubmitFormHandler(() => {
      this._replaceEditToView();
    });
  }

  get model() {
    return this._model;
  }
}
