import createElement from "../services/utils/createElement";

const createFilterTemplate = (filter) => {
  const {title, count} = filter;

  return (
    `<input
        type="radio"
        id="filter__${title}"
        class="filter__input visually-hidden"
        name="filter"
        ${title === `all` ? `checked` : ``}
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

export default class FiltersView {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
