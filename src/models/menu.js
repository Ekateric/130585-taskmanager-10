import MenuItemModel from "./menu-item";

export default class MenuModel {
  constructor(data) {
    this._items = this._createItems(data);
    this.checkedId = null;
  }

  _createItems(data) {
    return data.map((item) => new MenuItemModel(item));
  }

  get items() {
    return this._items;
  }

  set checked(id) {
    if (this.checkedId && this.checkedId !== id) {
      this._items.find((item) => item.id === this.checkedId).checked = false;
    }
    this.checkedId = id;
    this._items.find((item) => item.id === id).checked = true;
    console.log(this.items);
  }
}

