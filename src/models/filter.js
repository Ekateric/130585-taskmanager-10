export default class FilterModel {
  constructor(title, data) {
    this._title = title;
    this._filterData = data;
    this.count = this.countFilterValue(this.title);
  }

  countFilterValue(filterTitle) {
    switch (filterTitle) {
      case `all`:
        return this._filterData.length;
      case `overdue`:
        return this._filterData.filter((el) => el.dueDate instanceof Date && el.dueDate < Date.now()).length;
      case `today`:
        const timeFrom = new Date();

        let timeTo = new Date();
        timeTo.setDate(timeTo.getDate() + 1);
        timeTo.setHours(0, 0, 0, 0);

        return this._filterData.filter((el) => el.dueDate instanceof Date && el.dueDate >= timeFrom && el.dueDate < timeTo).length;
      case `favorites`:
        return this._filterData.filter((el) => el.isFavorite).length;
      case `repeating`:
        return this._filterData.filter((el) => Object.values(el.repeatingDays).includes(true)).length;
      case `tags`:
        return this._filterData.filter((el) => el.tags.size).length;
      case `archive`:
        return this._filterData.filter((el) => el.isArchive).length;
      default:
        return 0;
    }
  }

  get title() {
    return this._title;
  }
}
