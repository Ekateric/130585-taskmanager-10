import {SortTypes} from "../mock/sort-types";
import BoardView from "../views/board";
import SortModel from "../models/sort";
import SortController from "./sort";
import TasksListController from "./tasks-list";
import ButtonLoadMoreView from "../views/button-load-more";
import NoTasksView from "../views/no-tasks";
import render from "../utils/render";
import remove from "../utils/remove";

export default class BoardController {
  constructor(tasksListModel, tasksPerPage, containerElement) {
    this._tasksListModel = tasksListModel;
    this._tasksPerPage = tasksPerPage;
    this._containerElement = containerElement;
    this._tasksCount = this._tasksListModel.tasksModels.length;
    this._showingTasksCount = 0;
    this._view = new BoardView();
    this._element = this._view.getElement();
    this._listController = new TasksListController(this._tasksListModel, this._element);
    this._sortModel = null;
    this._buttonLoadMoreView = null;
    this._noTasksView = null;
  }

  _changeSortType() {
    if (this._sortModel) {
      this._listController.clear();

      switch (this._sortModel.checked) {
        case `default`:
          this._listController.sortByDefault();
          break;
        case `date-up`:
          this._listController.sortByDateUp();
          break;
        case `date-down`:
          this._listController.sortByDateDown();
          break;
      }

      this._showingTasksCount = 0;

      if (this._tasksPerPage < this._tasksCount && !this._buttonLoadMoreView) {
        this._buttonLoadMoreView = new ButtonLoadMoreView();
        this._renderButtonLoadMore();
      }

      this.renderTasksPage();
    }
  }

  _renderSort() {
    this._sortModel = new SortModel(SortTypes);
    this._sortController = new SortController(this._sortModel, this._element, this._changeSortType.bind(this));
    this._sortController.render();
  }

  _renderTasksList() {
    this._listController.render();
  }

  _renderButtonLoadMore() {
    if (this._buttonLoadMoreView) {
      render(this._element, this._buttonLoadMoreView);

      this._buttonLoadMoreView.setClickHandler(() => {
        this.renderTasksPage();
      });
    }
  }

  _renderNoTasks() {
    this._noTasksView = new NoTasksView();
    render(this._element, this._noTasksView);
  }

  renderTasksPage() {
    this._listController.renderPage(this._showingTasksCount, this._showingTasksCount + this._tasksPerPage);
    this._showingTasksCount += this._tasksPerPage;

    if (this._showingTasksCount >= this._tasksCount && this._buttonLoadMoreView) {
      remove(this._buttonLoadMoreView);
      this._buttonLoadMoreView = null;
    }
  }

  render() {
    if (this._listController.isAllArchived || this._listController.isEmpty) {
      this._renderNoTasks();

    } else {
      this._renderSort();
      this._renderTasksList();
      this.renderTasksPage();

      if (this._tasksPerPage < this._tasksCount) {
        this._buttonLoadMoreView = new ButtonLoadMoreView();
        this._renderButtonLoadMore();
      }
    }

    render(this._containerElement, this._view);
  }
}
