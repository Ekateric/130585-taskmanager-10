import TaskView from "../views/task";
import TaskFormView from "../views/task-form";
import render from "../utils/render";
import replace from "../utils/replace";

export default class TaskController {
  constructor(taskModel, containerElement, onDataChange) {
    this._model = taskModel;
    this._containerElement = containerElement;
    this._onDataChange = onDataChange;

    this._view = null;
    this._formView = null;

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
    const oldTaskView = this._view;
    const oldTaskFormView = this._formView;

    this._view = new TaskView(this._model);
    this._formView = new TaskFormView(this._model);

    this.setHandlers();

    if (oldTaskView && oldTaskFormView) {
      replace(this._view, oldTaskView);
      replace(this._formView, oldTaskFormView);

    } else {
      render(this._containerElement, this._view);
    }
  }

  setHandlers() {
    this._view.setClickEditButtonHandler(() => {
      this._replaceViewToEdit();

      document.addEventListener(`keydown`, this._onExitForm);
    });

    this._view.setClickArchiveButton(() => {
      this._onDataChange(this, {
        isArchive: !this._model.isArchive
      });
    });

    this._view.setClickFavoriteButton(() => {
      this._onDataChange(this, {
        isFavorite: !this._model.isFavorite
      });
    });

    this._formView.setSubmitFormHandler(() => {
      this._replaceEditToView();
    });
  }

  get model() {
    return this._model;
  }

  set model(newModel) {
    this._model = newModel;
  }
}
