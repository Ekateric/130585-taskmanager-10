import {Menu} from "./mock/menu";
import {Filters} from "./mock/filters";
import TasksMock from "./mock/tasks";
import MenuModel from "./models/menu";
import MenuView from "./components/menu";
import FiltersListModel from "./models/filters-list";
import FiltersView from "./components/filters";
import TasksListModel from "./models/tasks-list";
import BoardController from "./controllers/board";
import {getRandomInt, render} from "./helpers";

const TASK_COUNT = getRandomInt(1, 20);
const TASK_PER_PAGE = 8;

const tasksMock = new TasksMock(TASK_COUNT);
const tasksListModel = new TasksListModel(tasksMock.data);
const tasks = tasksListModel.tasks;

const menuModel = new MenuModel(Menu);
const menuItems = menuModel.items;
menuModel.checked = `task`;

const filtersModel = new FiltersListModel(Filters, tasks);
const filters = filtersModel.filters;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new MenuView(menuItems).getElement());
render(siteMainElement, new FiltersView(filters).getElement());

const boardController = new BoardController(tasksListModel, TASK_PER_PAGE, TASK_COUNT);
boardController.render(siteMainElement);

