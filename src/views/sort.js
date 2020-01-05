import AbstractView from "./abstract";

const createSortItemTemplate = (sortItem) => {
  const {id, title} = sortItem;

  return `<a href="#" data-sort-type="${id}" class="board__filter">${title}</a>`;
};

const createSortTemplate = (sortItems) => {
  const sortItemsTemplate = sortItems
    .map((item) => createSortItemTemplate(item))
    .join(`\n`);

  return (
    `<div class="board__filter-list">
        ${sortItemsTemplate}
      </div>`
  );
};

export default class SortView extends AbstractView {
  constructor(items) {
    super();

    this._items = items;
    this._linksElements = this.getElement().querySelectorAll(`.board__filter`);
  }

  getTemplate() {
    return createSortTemplate(this._items);
  }

  setClickLinksHandler(handler) {
    [...this._linksElements].forEach((link) => {
      link.addEventListener(`click`, function (event) {
        event.preventDefault();
        handler(event.target.dataset.sortType);
      });
    });
  }
}
