export default class MenuItemModel {
  constructor(data) {
    this.title = data.title;
    this.id = data.id;
    this.isChecked = data.isChecked || false;
  }

  set checked(isChecked) {
    this.isChecked = isChecked;
  }
}
