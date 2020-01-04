import {Menu} from "./mock/menu";
import Filters from "./data/filters";
import MenuModel from "./models/menu";
import MenuView from "./views/menu";
import FiltersListModel from "./models/filters-list";
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

const filtersModel = new FiltersListModel(Filters, tasksListModel.tasks);
const filtersController = new FiltersController(filtersModel, siteMainElement);
const boardController = new BoardController(tasksListModel, TASK_PER_PAGE, siteMainElement);

render(siteHeaderElement, new MenuView(menuModel.items));
filtersController.render();
boardController.render();

