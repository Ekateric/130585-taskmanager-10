import render from "../services/utils/render";

export default class TasksListController {
  constructor(tasksListModel, tasksListElement) {
    this._element = tasksListElement;
    this._tasksListModel = tasksListModel;
    this._tasksControllers = this._tasksListModel.tasksControllers;
  }

  render(fromTaskIndex, toTaskIndex) {
    this._tasksControllers
      .slice(fromTaskIndex, toTaskIndex)
      .forEach((task) => render(this._element, task.element));
  }
}
