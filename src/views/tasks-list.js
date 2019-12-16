import createElement from "../utils/createElement";

const createTasksListTemplate = () => `<div class="board__tasks"></div>`;

export default class TasksListView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTasksListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
