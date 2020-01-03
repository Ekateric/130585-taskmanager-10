import {getAllTasks, getTaskById} from "../services/api/index";
import TaskModel from "./task";
import TasksMock from "../mock/tasks";

export default class TasksListModel {
  constructor() {
    this._mock = new TasksMock();
    this._tasks = this._createTasksModels(this.getAllTasks());
    this._isAllArchived = this._checkIsAllArchived();
    this._isEmpty = this._tasks.length === 0;
  }

  _createTasksModels(data) {
    return data.map((task) => new TaskModel(task));
  }

  _checkIsAllArchived() {
    return this._tasks.every((task) => task.isArchive);
  }

  getAllTasks() {
    return getAllTasks(this._mock);
  }

  getTask(id) {
    return getTaskById(id, this._mock);
  }

  updateModelById(modelId, newData) {
    const taskIndex = this._tasks.findIndex((task) => task.id === modelId);
    let newTaskModel = null;

    if (taskIndex > -1) {
      const oldTaskModel = this._tasks.find((task) => task.id === modelId);

      newTaskModel = new TaskModel(Object.assign({}, oldTaskModel, newData));
      this._tasks = [].concat(this._tasks.slice(0, taskIndex), newTaskModel, this._tasks.slice(taskIndex + 1));
    }

    return newTaskModel;
  }

  get tasks() {
    return this._tasks;
  }

  get isAllArchived() {
    return this._isAllArchived;
  }

  get isEmpty() {
    return this._isEmpty;
  }

  set tasks(tasks) {
    this._tasks = this._createTasksModels(Array.from(tasks));
  }
}
