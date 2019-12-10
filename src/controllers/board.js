import BoardView from "../components/board";
import TasksListController from "./tasks-list";
import ButtonLoadMoreView from "../components/button-load-more";
import {render} from "../helpers";

export default class BoardController {
  constructor(tasksListModel, tasksPerPage, tasksCount) {
    this._tasksPerPage = tasksPerPage;
    this._tasksCount = tasksCount;
    this._showingTasksCount = 0;
    this._view = new BoardView();
    this._element = this._view.getElement();
    this._listElement = this._element.querySelector(`.board__tasks`);
    this._listController = new TasksListController(tasksListModel, this._listElement);
    this._buttonLoadMoreView = null;
    this._buttonLoadMoreElement = null;
  }

  render(renderToElement) {
    render(renderToElement, this._element);
    this.renderTasksPage();

    if (this._tasksPerPage < this._tasksCount) {
      this._buttonLoadMoreView = new ButtonLoadMoreView();
      this._buttonLoadMoreElement = this._buttonLoadMoreView.getElement();
      this.renderButtonLoadMore();
    }
  }

  renderTasksPage() {
    this._listController.render(this._showingTasksCount, this._showingTasksCount + this._tasksPerPage);
    this._showingTasksCount += this._tasksPerPage;

    if (this._showingTasksCount >= this._tasksCount && this._buttonLoadMoreElement) {
      this._buttonLoadMoreElement.remove();
      this._buttonLoadMoreView.removeElement();
    }
  }

  renderButtonLoadMore() {
    if (this._buttonLoadMoreView && this._buttonLoadMoreElement) {
      render(this._element, this._buttonLoadMoreElement);
      this._buttonLoadMoreView.setClickHandler(() => {
        this.renderTasksPage();
      });
    }
  }
}
