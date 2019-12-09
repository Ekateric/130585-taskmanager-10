import TaskModel from "./task";

export default class TasksListModel {
  constructor(data) {
    this._tasks = this._createTasks(data);
  }

  _createTasks(data) {
    return data.map((task) => new TaskModel(task));
  }

  get tasks() {
    return this._tasks;
  }
}
