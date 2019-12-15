import BoardView from "../views/board";
import SortView from "../views/sort";
import TasksListController from "./tasks-list";
import ButtonLoadMoreView from "../views/button-load-more";
import render from "../utils/render";

export default class BoardController {
  constructor(tasksListModel, tasksPerPage) {
    this._tasksPerPage = tasksPerPage;
    this._tasksCount = tasksListModel.tasksModels.length;
    this._showingTasksCount = 0;
    this._view = new BoardView();
    this._element = this._view.getElement();
    this._listController = new TasksListController(tasksListModel);
    this._sortView = new SortView();
    this._sortElement = this._sortView.getElement();
    this._buttonLoadMoreView = null;
    this._buttonLoadMoreElement = null;
  }

  _renderSort() {
    render(this._element, this._sortElement);
  }

  _renderTasksList() {
    this._listController.render(this._element);
  }

  _renderButtonLoadMore() {
    if (this._buttonLoadMoreView && this._buttonLoadMoreElement) {
      render(this._element, this._buttonLoadMoreElement);

      this._buttonLoadMoreView.setClickHandler(() => {
        this.renderTasksPage();
      });
    }
  }

  renderTasksPage() {
    this._listController.renderPage(this._showingTasksCount, this._showingTasksCount + this._tasksPerPage);
    this._showingTasksCount += this._tasksPerPage;

    if (this._showingTasksCount >= this._tasksCount && this._buttonLoadMoreElement) {
      this._buttonLoadMoreElement.remove();
      this._buttonLoadMoreView.removeElement();
    }
  }

  render(renderToElement) {
    this._renderSort();
    this._renderTasksList();
    this.renderTasksPage();

    if (this._tasksPerPage < this._tasksCount) {
      this._buttonLoadMoreView = new ButtonLoadMoreView();
      this._buttonLoadMoreElement = this._buttonLoadMoreView.getElement();
      this._renderButtonLoadMore();
    }
    render(renderToElement, this._element);
  }
}
