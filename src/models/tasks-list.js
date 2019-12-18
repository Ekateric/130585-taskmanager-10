import {getAllTasks, getTaskById} from "../services/api/index";
import TaskController from "../controllers/task";
import TaskModel from "./task";
import TasksMock from "../mock/tasks";

export default class TasksListModel {
  constructor() {
    this._mock = new TasksMock();
    this._tasks = this._createTasks(this.getAllTasks());
    this._isAllArchived = this._checkIsAllArchived();
    this._isEmpty = this._tasks.length === 0;
  }

  _createTasks(data) {
    return data.map((task) => new TaskController(new TaskModel(task)));
  }

  _checkIsAllArchived() {
    return this._tasks.every((taskController) => taskController.model.isArchive);
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

  get isAllArchived() {
    return this._isAllArchived;
  }

  get isEmpty() {
    return this._isEmpty;
  }
}
