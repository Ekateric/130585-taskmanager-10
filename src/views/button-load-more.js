import AbstractView from "./abstract";

const createButtonLoadMoreTemplate = () => `<button class="load-more" type="button">load more</button>`;

export default class ButtonLoadMoreView extends AbstractView {
  getTemplate() {
    return createButtonLoadMoreTemplate();
  }
}
