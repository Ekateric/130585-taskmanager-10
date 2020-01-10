import Filters from "../data/filters";
import FiltersListModel from "../models/filters-list";
import FiltersView from "../views/filters";
import render from "../utils/common/render";
import replace from "../utils/common/replace";

export default class FiltersController {
  constructor(tasksListModel, containerElement) {
    this._tasksListModel = tasksListModel;
    this._containerElement = containerElement;

    this._checkedFilter = Filters.ALL;
    this._model = null;
    this._view = null;

    this._changeFilterHandler = this._changeFilterHandler.bind(this);
    this._changeDataHandler = this._changeDataHandler.bind(this);

    this._tasksListModel.setDataChangeHandler(this._changeDataHandler);
  }

  _changeFilterHandler(filterTitle) {
    if (this._model.checked !== filterTitle) {
      this._checkedFilter = filterTitle;
      this._model.checked = this._checkedFilter;
      this._tasksListModel.setFilter(this._checkedFilter);
    }
  }

  _changeDataHandler() {
    this.render();
  }

  setHandlers() {
    this._view.setChangeFilterHandler((filterTitle) => this._changeFilterHandler(filterTitle));
  }

  render() {
    const oldView = this._view;

    this._model = new FiltersListModel(Filters, this._tasksListModel.allTasks);
    this._model.checked = this._checkedFilter;
    this._view = new FiltersView(this._model.filters);

    if (oldView) {
      replace(this._view, oldView);

    } else {
      render(this._containerElement, this._view);
    }

    this.setHandlers();
  }
}
