import SortTypes from "../data/sort-types";
import TasksListView from "../views/tasks-list";
import TaskController from "./task";
import render from "../utils/common/render";
import Mode from "../data/mode";

export default class TasksListController {
  constructor(tasksListModel, containerElement, onDataChange, onViewChange) {
    this._tasksListModel = tasksListModel;
    this._containerElement = containerElement;

    this._view = new TasksListView();
    this._element = this._view.getElement();

    this._tasksModels = this._tasksListModel.tasks;
    this._sortedTasksModels = this._tasksModels.slice();
    this._sortType = SortTypes.DEFAULT.id;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
  }

  _sortByDefault() {
    this._sortedTasksModels = this._tasksModels.slice();
  }

  _sortByDateUp() {
    this._sortedTasksModels = this._tasksModels
      .slice()
      .sort((taskOne, taskTwo) => taskOne.dueDate - taskTwo.dueDate);
  }

  _sortByDateDown() {
    this._sortedTasksModels = this._tasksModels
      .slice()
      .sort((taskOne, taskTwo) => taskTwo.dueDate - taskOne.dueDate);
  }

  sort(sortType) {
    this._sortType = sortType;

    switch (sortType) {
      case SortTypes.DEFAULT.id:
        this._sortByDefault();
        break;
      case SortTypes.DATE_UP.id:
        this._sortByDateUp();
        break;
      case SortTypes.DATE_DOWN.id:
        this._sortByDateDown();
        break;
    }
  }

  updateTasksData() {
    this._tasksModels = this._tasksListModel.tasks;
    this.sort(this._sortType);
  }

  renderPage(fromTaskIndex, toTaskIndex) {
    return this._sortedTasksModels
      .slice(fromTaskIndex, toTaskIndex)
      .map((taskModel) => {
        const taskController = new TaskController(taskModel, this._element, this._onDataChange, this._onViewChange);

        taskController.render(Mode.DEFAULT);

        return taskController;
      });
  }

  render() {
    render(this._containerElement, this._view);
  }

  clear() {
    this._element.innerHTML = ``;
  }

  createTask() {
    const emptyTaskModel = this._tasksListModel.createEmptyTaskModel();
    const emptyTaskController = new TaskController(emptyTaskModel, this._element, this._onDataChange, this._onViewChange);

    emptyTaskController.render(Mode.ADD);

    return emptyTaskController;
  }

  get isAllArchived() {
    return this._tasksListModel.isAllArchived;
  }

  get isEmpty() {
    return this._tasksListModel.isEmpty;
  }
}
