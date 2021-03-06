import AbstractView from "./abstract";

const createMenuItemTemplate = (item) => {
  const {id, title, isChecked} = item;
  return (
    `<input
        type="radio"
        name="control"
        id="control__${id}"
        class="control__input visually-hidden"
        ${isChecked ? `checked` : ``}
      />
      <label for="control__${id}" class="control__label control__label--${id}"
        >${title}</label
      >`
  );
};

const createMenuTemplate = (menuItems) => {
  const itemsTemplate = menuItems.map((menuItem) => createMenuItemTemplate(menuItem)).join(`\n`);
  return (
    `<section class="control__btn-wrap">
      ${itemsTemplate}
    </section>`
  );
};

export default class MenuView extends AbstractView {
  constructor(items) {
    super();

    this._items = items;
  }

  getTemplate() {
    return createMenuTemplate(this._items);
  }
}
