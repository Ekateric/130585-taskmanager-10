import AbstractView from "./abstract";

const createTasksListTemplate = () => `<div class="board__tasks"></div>`;

export default class TasksListView extends AbstractView {
  getTemplate() {
    return createTasksListTemplate();
  }
}
