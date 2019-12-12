import {getAllTasks, getTaskById} from "../services/api/index";
import TaskController from "../controllers/task";
import TaskModel from "./task";
import TasksMock from "../mock/tasks";

export default class TasksListModel {
  constructor() {
    this._mock = new TasksMock();
    this._tasks = this._createTasks(this.getAllTasks());
  }

  _createTasks(data) {
    return data.map((task) => new TaskController(new TaskModel(task)));
  }

  getAllTasks() {
    return getAllTasks(this._mock);
  }

  getTask(id) {
    return getTaskById(id, this._mock);
  }

  get tasksControllers() {
    return this._tasks;
  }

  get tasksModels() {
    return this._tasks.map((task) => task.model);
  }
}
