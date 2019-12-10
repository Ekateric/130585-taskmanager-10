import FilterModel from "./filter";

export default class FiltersListModel {
  constructor(filtersTitles, filterData) {
    this._filters = this._createFilters(filtersTitles, filterData);
  }

  _createFilters(filtersTitles, filterData) {
    return filtersTitles.map((filter) => new FilterModel(filter, filterData));
  }

  get filters() {
    return this._filters;
  }
}
