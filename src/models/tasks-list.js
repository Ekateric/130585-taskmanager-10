import {getAllTasks, getTaskById} from "../services/api/index";
import TaskModel from "./task";
import TasksMock from "../mock/tasks";

export default class TasksListModel {
  constructor() {
    this._mock = new TasksMock();
    this._tasks = this._createTasksModels(this.getAllTasks());
    this._isAllArchived = this._checkIsAllArchived();
    this._isEmpty = this._checkIsEmpty();
  }

  _createTasksModels(data) {
    return data.map((task) => new TaskModel(task));
  }

  _checkIsAllArchived() {
    return this._tasks.every((task) => task.isArchive);
  }

  _checkIsEmpty() {
    return this._tasks.length === 0;
  }

  getAllTasks() {
    return getAllTasks(this._mock);
  }

  getTask(id) {
    return getTaskById(id, this._mock);
  }

  get tasksModels() {
    return this._tasks;
  }

  get isAllArchived() {
    return this._isAllArchived;
  }

  get isEmpty() {
    return this._isEmpty;
  }
}
