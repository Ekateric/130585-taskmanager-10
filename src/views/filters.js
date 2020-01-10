import AbstractView from "./abstract";

const getFilterNameById = (id) => {
  return id.replace(`filter__`, ``);
};

const createFilterTemplate = (filter) => {
  const {title, count, isChecked} = filter;

  return (
    `<input
        type="radio"
        id="filter__${title}"
        class="filter__input visually-hidden"
        name="filter"
        ${isChecked ? `checked` : ``}
        ${count ? `` : `disabled`}
      />
      <label for="filter__${title}" class="filter__label">
        ${title}
        <span class="filter__${title}-count">${count}</span>
      </label>`
  );
};

const createFiltersTemplate = (filters) => {
  const filtersTemplate = filters.map((filter) => createFilterTemplate(filter)).join(`\n`);
  return (
    `<section class="main__filter filter container">
      ${filtersTemplate}
    </section>`
  );
};

export default class FiltersView extends AbstractView {
  constructor(filters) {
    super();

    this._filters = filters;
    this._filtersElements = this.getElement().querySelectorAll(`.filter__input`);
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
  }

  setChangeFilterHandler(handler) {
    [...this._filtersElements].forEach((input) => {
      input.addEventListener(`change`, function (event) {
        handler(getFilterNameById(event.target.id));
      });
    });
  }
}
