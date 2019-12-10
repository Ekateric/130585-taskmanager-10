import {Menu} from "./mock/menu";
import {Filters} from "./mock/filters";
import TasksMock from "./mock/tasks";

import MenuModel from "./models/menu";
import MenuView from "./components/menu";
import FiltersListModel from "./models/filters-list";
import FiltersView from "./components/filters";
import BoardView from "./components/board";
import TasksListModel from "./models/tasks-list";
import TaskView from "./components/task";
import TaskFormView from "./components/task-form";
import ButtonLoadMoreView from "./components/button-load-more";
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
render(siteMainElement, new BoardView().getElement());

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
render(taskListElement, new TaskFormView(tasks[0]).getElement());
tasks
  .slice(1, TASK_PER_PAGE)
  .forEach((task) => render(taskListElement, new TaskView(task).getElement()));

if (TASK_PER_PAGE < TASK_COUNT) {
  const boardElement = siteMainElement.querySelector(`.board`);
  render(boardElement, new ButtonLoadMoreView().getElement());

  const loadMoreButton = boardElement.querySelector(`.load-more`);
  let showingTasksCount = TASK_PER_PAGE;

  loadMoreButton.addEventListener(`click`, () => {
    const newShowingTasksCount = showingTasksCount + TASK_PER_PAGE;
    tasks
      .slice(showingTasksCount, newShowingTasksCount)
      .forEach((task) => render(taskListElement, new TaskView(task).getElement()));

    showingTasksCount = newShowingTasksCount;

    if (showingTasksCount >= TASK_COUNT) {
      loadMoreButton.remove();
    }
  });
}
