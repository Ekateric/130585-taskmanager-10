import TasksListView from "../views/tasks-list";
import TaskController from "./task";
import render from "../utils/common/render";

export default class TasksListController {
  constructor(tasksListModel, containerElement, onViewChange) {
    this._tasksListModel = tasksListModel;
    this._containerElement = containerElement;

    this._view = new TasksListView();
    this._element = this._view.getElement();

    this._tasksModels = this._tasksListModel.tasks;
    this._sortedTasksModels = this._tasksModels.slice();

    this._onViewChange = onViewChange;
    this._onDataChange = this._onDataChange.bind(this);
  }

  _onDataChange(taskController, newData) {
    const newTaskModel = this._tasksListModel.updateModelById(taskController.model.id, newData);

    if (newTaskModel) {
      taskController.model = newTaskModel;
      taskController.render();
      this.updateTasksData();
    }
  }

  sortByDefault() {
    this._sortedTasksModels = this._tasksModels.slice();
  }

  sortByDateUp() {
    this._sortedTasksModels = this._tasksModels
      .slice()
      .sort((taskOne, taskTwo) => taskOne.dueDate - taskTwo.dueDate);
  }

  sortByDateDown() {
    this._sortedTasksModels = this._tasksModels
      .slice()
      .sort((taskOne, taskTwo) => taskTwo.dueDate - taskOne.dueDate);
  }

  updateTasksData() {
    this._tasksModels = this._tasksListModel.tasks;
  }

  renderPage(fromTaskIndex, toTaskIndex) {
    return this._sortedTasksModels
      .slice(fromTaskIndex, toTaskIndex)
      .map((taskModel) => {
        const taskController = new TaskController(taskModel, this._element, this._onDataChange, this._onViewChange);

        taskController.render();

        return taskController;
      });
  }

  render() {
    render(this._containerElement, this._view);
  }

  clear() {
    this._element.innerHTML = ``;
  }

  get isAllArchived() {
    return this._tasksListModel.isAllArchived;
  }

  get isEmpty() {
    return this._tasksListModel.isEmpty;
  }
}
