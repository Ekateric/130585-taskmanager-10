import SortView from "../views/sort";
import render from "../utils/common/render";

export default class SortController {
  constructor(sortModel, containerElement, changeSortTypeHandler) {
    this._model = sortModel;
    this._containerElement = containerElement;
    this._changeSortTypeHandler = changeSortTypeHandler;

    this._model.checked = `default`;
    this._view = new SortView(this._model.items);
  }

  setHandlers() {
    this._view.setClickLinksHandler((sortType) => {
      if (this._model.checked !== sortType) {
        this._model.checked = sortType;
        this._changeSortTypeHandler();
      }
    });
  }

  render() {
    render(this._containerElement, this._view);
    this.setHandlers();
  }
}
