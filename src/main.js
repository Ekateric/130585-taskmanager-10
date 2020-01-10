import {Menu} from "./mock/menu";
import MenuModel from "./models/menu";
import MenuView from "./views/menu";

import TasksListModel from "./models/tasks-list";
import BoardController from "./controllers/board";
import FiltersController from "./controllers/filters";
import render from "./utils/common/render";

const TASK_PER_PAGE = 8;

const tasksListModel = new TasksListModel();
const menuModel = new MenuModel(Menu);
menuModel.checked = `task`;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const filtersController = new FiltersController(tasksListModel, siteMainElement);
const boardController = new BoardController(tasksListModel, TASK_PER_PAGE, siteMainElement);
const menuView = new MenuView(menuModel.items);

render(siteHeaderElement, menuView);
filtersController.render();
boardController.render();

menuView
  .getElement()
  .querySelector(`.control__label--new-task`)
  .addEventListener(`click`, () => {
    boardController.createTask();
  });

