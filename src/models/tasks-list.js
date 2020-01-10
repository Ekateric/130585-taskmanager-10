import {getAllTasks, getTaskById} from "../services/api/index";
import TaskModel from "./task";
import TasksMock from "../mock/tasks";
import getFilteredTasks from "../utils/filter/getFilteredTasks";
import Filters from "../data/filters";
import EmptyTask from "../data/empty-task";

export default class TasksListModel {
  constructor() {
    this._mock = new TasksMock();
    this._tasks = this._createTasksModels(this.getAllTasks());
    this._isAllArchived = this._checkIsAllArchived();
    this._isEmpty = this._tasks.length === 0;

    this._filter = Filters.ALL;
    this._filterChangeHandlers = [];
    this._dataChangeHandlers = [];
  }

  _createTasksModels(data) {
    return data.map((task) => new TaskModel(task));
  }

  _checkIsAllArchived() {
    return this._tasks.every((task) => task.isArchive);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  createEmptyTaskModel() {
    return new TaskModel(EmptyTask);
  }

  getAllTasks() {
    return getAllTasks(this._mock);
  }

  getTask(id) {
    return getTaskById(id, this._mock);
  }

  updateModelById(modelId, newTaskData) {
    const taskIndex = this._tasks.findIndex((task) => task.id === modelId);
    let newTaskModel = null;

    if (taskIndex > -1) {
      const oldTaskModel = this._tasks.find((task) => task.id === modelId);

      newTaskModel = new TaskModel(Object.assign({}, oldTaskModel, newTaskData));
      this._tasks = [].concat(this._tasks.slice(0, taskIndex), newTaskModel, this._tasks.slice(taskIndex + 1));
      this._callHandlers(this._dataChangeHandlers);
    }

    return newTaskModel;
  }

  deleteModelById(modelId) {
    const taskIndex = this._tasks.findIndex((task) => task.id === modelId);
    let isDeleted = false;

    if (taskIndex > -1) {
      this._tasks = [].concat(this._tasks.slice(0, taskIndex), this._tasks.slice(taskIndex + 1));
      this._callHandlers(this._dataChangeHandlers);

      isDeleted = true;
    }

    return isDeleted;
  }

  addModel(taskData) {
    const newTaskModel = new TaskModel(Object.assign({}, taskData));
    this._tasks = [].concat(newTaskModel, this._tasks);
    this._callHandlers(this._dataChangeHandlers);

    return newTaskModel;
  }

  setFilter(filterTitle) {
    this._filter = filterTitle;
    this._filterChangeHandlers.forEach((handler) => handler());
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  get tasks() {
    return getFilteredTasks(this._tasks, this._filter);
  }

  get allTasks() {
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
