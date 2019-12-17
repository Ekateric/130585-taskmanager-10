import TasksListView from "../views/tasks-list";
import render from "../utils/render";

export default class TasksListController {
  constructor(tasksListModel, containerElement) {
    this._tasksListModel = tasksListModel;
    this._containerElement = containerElement;
    this._tasksControllers = this._tasksListModel.tasksControllers;
    this._view = new TasksListView();
    this._element = this._view.getElement();
  }

  renderPage(fromTaskIndex, toTaskIndex) {
    this._tasksControllers
      .slice(fromTaskIndex, toTaskIndex)
      .forEach((task) => task.render(this._element));
  }

  render() {
    render(this._containerElement, this._view);
  }

  get isAllArchived() {
    return this._tasksListModel.isAllArchived;
  }

  get isEmpty() {
    return this._tasksListModel.isEmpty;
  }
}
