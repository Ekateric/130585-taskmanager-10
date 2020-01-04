import FilterModel from "./filter";

export default class FiltersListModel {
  constructor(filtersTitles, filterData) {
    this._filters = this._createFilters(Object.values(filtersTitles), filterData);
    this._checkedId = null;
  }

  _createFilters(filtersTitles, filterData) {
    return filtersTitles.map((filterTitle) => new FilterModel({
      title: filterTitle
    }, filterData));
  }

  get filters() {
    return this._filters;
  }

  get checked() {
    return this._checkedId;
  }

  set checked(title) {
    if (this._checkedId && this._checkedId !== title) {
      this._filters.find((filter) => filter.title === this._checkedId).checked = false;
    }
    this._checkedId = title;
    this._filters.find((filter) => filter.title === title).checked = true;
  }
}
