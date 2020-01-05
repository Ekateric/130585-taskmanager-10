import FiltersView from "../views/filters";
import render from "../utils/common/render";

export default class FiltersController {
  constructor(filtersModel, containerElement) {
    this._model = filtersModel;
    this._containerElement = containerElement;

    this._model.checked = `all`;
    this._view = new FiltersView(this._model.filters);

    this._changeFilterHandler = this._changeFilterHandler.bind(this);
  }

  _changeFilterHandler(filterTitle) {
    if (this._model.checked !== filterTitle) {
      this._model.checked = filterTitle;
      this._model.tasksListModel.setFilter(filterTitle);
    }
  }

  setHandlers() {
    this._view.setChangeFilterHandler((filterTitle) => this._changeFilterHandler(filterTitle));
  }

  render() {
    render(this._containerElement, this._view);
    this.setHandlers();
  }
}
