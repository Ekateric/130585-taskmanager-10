import Mode from "../data/mode";
import TaskView from "../views/task";
import TaskFormView from "../views/task-form";
import render from "../utils/common/render";
import replace from "../utils/common/replace";
import remove from "../utils/common/remove";

export default class TaskController {
  constructor(taskModel, containerElement, onDataChange, onViewChange) {
    this._model = taskModel;
    this._containerElement = containerElement;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._view = null;
    this._formView = null;
    this._mode = Mode.DEFAULT;

    this._onExitForm = this._onExitForm.bind(this);
  }

  _replaceViewToEdit() {
    this._onViewChange();
    replace(this._formView, this._view);
    this._mode = Mode.EDIT;
  }

  _replaceEditToView() {
    replace(this._view, this._formView);
    this._mode = Mode.DEFAULT;
    document.removeEventListener(`keydown`, this._onExitForm);
  }

  _onExitForm(event) {
    const isEscKey = event.key === `Escape` || event.key === `Esc`;

    if (isEscKey) {
      this._formView.reset();
      this._replaceEditToView();
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

      if (this._mode === Mode.EDIT) {
        this._replaceEditToView();
      }

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

    this._formView.setSubmitFormHandler((event) => {
      event.preventDefault();
      const formData = this._formView.getData();
      this._onDataChange(this, formData);
    });

    this._formView.setClickDeleteButtonHandler(() => this._onDataChange(this, null));
  }

  setDefaultView() {
    if (this._mode === Mode.EDIT) {
      this._formView.reset();
      this._replaceEditToView();
    }
  }

  destroy() {
    remove(this._view);
    remove(this._formView);
    document.removeEventListener(`keydown`, this._onExitForm);
  }

  get model() {
    return this._model;
  }

  set model(newModel) {
    this._model = newModel;
  }
}
