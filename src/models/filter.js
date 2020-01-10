import getFilteredTasks from "../utils/filter/getFilteredTasks";

export default class FilterModel {
  constructor(filterParams, filterData) {
    this._filterData = filterData;
    this.title = filterParams.title;
    this.isChecked = filterParams.isChecked || false;

    this.count = this.countFilterValue();
  }

  countFilterValue() {
    return getFilteredTasks(this._filterData, this.title).length;
  }

  set checked(isChecked) {
    this.isChecked = isChecked;
  }
}
