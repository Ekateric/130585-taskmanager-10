import TaskView from "../components/task";
import {render} from "../helpers";

export default class TasksListController {
  constructor(tasksListModel, tasksListElement) {
    this._tasksListElement = tasksListElement;
    this._tasksModel = tasksListModel;
    this._tasks = this._tasksModel.tasks;
  }

  render(fromTaskIndex, toTaskIndex) {
    this._tasks
      .slice(fromTaskIndex, toTaskIndex)
      .forEach((task) => render(this._tasksListElement, new TaskView(task).getElement()));
  }

  get tasks() {
    return this._tasks;
  }
}
