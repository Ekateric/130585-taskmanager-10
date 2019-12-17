import SortItemModel from "./sort-item";

export default class SortModel {
  constructor(data) {
    this._items = this._createItems(data);
    this._checkedId = null;
  }

  _createItems(data) {
    return data.map((item) => new SortItemModel(item));
  }

  get items() {
    return this._items;
  }

  set checked(id) {
    if (this._checkedId && this._checkedId !== id) {
      this._items.find((item) => item.id === this._checkedId).checked = false;
    }
    this._checkedId = id;
    this._items.find((item) => item.id === id).checked = true;
  }

  get checked() {
    return this._checkedId;
  }
}
