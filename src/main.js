import {Menu} from "./mock/menu";
import {Filters} from "./mock/filters";
import MenuModel from "./models/menu";
import MenuView from "./views/menu";
import FiltersListModel from "./models/filters-list";
import FiltersView from "./views/filters";
import TasksListModel from "./models/tasks-list";
import BoardController from "./controllers/board";
import render from "./utils/render";

const TASK_PER_PAGE = 8;

const tasksListModel = new TasksListModel();
const tasks = tasksListModel.tasksModels;

const menuModel = new MenuModel(Menu);
const menuItems = menuModel.items;
menuModel.checked = `task`;

const filtersModel = new FiltersListModel(Filters, tasks);
const filters = filtersModel.filters;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new MenuView(menuItems));
render(siteMainElement, new FiltersView(filters));

const boardController = new BoardController(tasksListModel, TASK_PER_PAGE, siteMainElement);
boardController.render();

