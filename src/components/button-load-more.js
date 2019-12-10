import {createElement} from "../helpers";

const createButtonLoadMoreTemplate = () => `<button class="load-more" type="button">load more</button>`;

export default class ButtonLoadMoreView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createButtonLoadMoreTemplate();
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

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
