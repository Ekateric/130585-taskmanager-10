import TasksListView from "../views/tasks-list";
import render from "../utils/render";

export default class TasksListController {
  constructor(tasksListModel, containerElement) {
    this._tasksListModel = tasksListModel;
    this._containerElement = containerElement;
    this._tasksControllers = this._tasksListModel.tasksControllers; // хранит исходный массив
    this._sortedTasksControllers = this._tasksControllers.slice();
    this._view = new TasksListView();
    this._element = this._view.getElement();
  }

  sortByDefault() {
    this._sortedTasksControllers = this._tasksControllers.slice();
  }

  sortByDateUp() {
    this._sortedTasksControllers = this._tasksControllers
      .slice()
      .sort((taskOne, taskTwo) => taskOne.model.dueDate - taskTwo.model.dueDate);
  }

  sortByDateDown() {
    this._sortedTasksControllers = this._tasksControllers
      .slice()
      .sort((taskOne, taskTwo) => taskTwo.model.dueDate - taskOne.model.dueDate);
  }

  renderPage(fromTaskIndex, toTaskIndex) {
    this._sortedTasksControllers
      .slice(fromTaskIndex, toTaskIndex)
      .forEach((task) => task.render(this._element));
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
