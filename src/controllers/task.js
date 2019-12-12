import TaskView from "../views/task";

export default class TaskController {
  constructor(taskModel) {
    this._model = taskModel;
    this._view = new TaskView(this._model);
    this._taskElement = this._view.getElement();
  }

  render() {

  }

  get element() {
    return this._taskElement;
  }

  get model() {
    return this._model;
  }
}
