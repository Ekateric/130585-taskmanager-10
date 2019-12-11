import {getAllTasks, getTaskById} from "../services/api/index";
import TaskModel from "./task";
import TasksMock from "../mock/tasks";

export default class TasksListModel {
  constructor() {
    this._mock = new TasksMock();
    this._tasks = this._createTasksModels(this.getAllTasks());
    console.log(this);
  }

  _createTasksModels(data) {
    return data.map((task) => new TaskModel(task));
  }

  getAllTasks() {
    return getAllTasks(this._mock);
  }

  getTask(id) {
    return getTaskById(id, this._mock);
  }

  get tasks() {
    return this._tasks;
  }
}
