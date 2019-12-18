import AbstractView from "./abstract";

const createBoardTemplate = () => `<section class="board container"></section>`;

export default class BoardView extends AbstractView {
  getTemplate() {
    return createBoardTemplate();
  }
}
