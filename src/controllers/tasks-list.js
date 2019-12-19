import TasksListView from "../views/tasks-list";
import TaskController from "./task";
import render from "../utils/render";

export default class TasksListController {
  constructor(tasksListModel, containerElement) {
    this._tasksListModel = tasksListModel;
    this._containerElement = containerElement;

    this._view = new TasksListView();
    this._element = this._view.getElement();

    this._tasksModels = this._tasksListModel.tasksModels;
    this._sortedTasksModels = this._tasksModels.slice();
  }

  sortByDefault() {
    this._sortedTasksModels = this._tasksModels.slice();
  }

  sortByDateUp() {
    this._sortedTasksModels = this._tasksModels
      .slice()
      .sort((taskOne, taskTwo) => taskOne.dueDate - taskTwo.dueDate);
  }

  sortByDateDown() {
    this._sortedTasksModels = this._tasksModels
      .slice()
      .sort((taskOne, taskTwo) => taskTwo.dueDate - taskOne.dueDate);
  }

  renderPage(fromTaskIndex, toTaskIndex) {
    return this._sortedTasksModels
      .slice(fromTaskIndex, toTaskIndex)
      .map((taskModel) => {
        const taskController = new TaskController(taskModel, this._element);

        taskController.render();

        return taskController;
      });
  }

  render() {
    render(this._containerElement, this._view);
  }

  clear() {
    this._element.innerHTML = ``;
  }

  get isAllArchived() {
    return this._tasksListModel.isAllArchived;
  }

  get isEmpty() {
    return this._tasksListModel.isEmpty;
  }
}
