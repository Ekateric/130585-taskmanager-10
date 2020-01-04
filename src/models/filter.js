import getFilteredTasks from "../utils/filter/getFilteredTasks";

export default class FilterModel {
  constructor(title, data) {
    this._title = title;
    this._filterData = data;
    this.count = this.countFilterValue(this.title);
  }

  countFilterValue(filterTitle) {
    return getFilteredTasks(this._filterData, filterTitle).length;
  }

  get title() {
    return this._title;
  }
}
