import {createMenuTemplate} from "./components/menu";
import {createFilterData} from "./mock/filters";
import {createFiltersTemplate} from "./components/filter";
import {createBoardTemplate} from "./components/board";
import {createTasksData} from "./mock/tasks";
import {createTaskTemplate} from "./components/task";
import {createTaskEditTemplate} from "./components/task-edit";
import {createLoadMoreButtonTemplate} from "./components/load-more-button";

const TASK_COUNT = 10;

const tasks = createTasksData(TASK_COUNT);
const filters = createFilterData(tasks);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createMenuTemplate());
render(siteMainElement, createFiltersTemplate(filters));
render(siteMainElement, createBoardTemplate());

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
render(taskListElement, createTaskEditTemplate());
tasks.forEach((task) => render(taskListElement, createTaskTemplate(task)));

const boardElement = siteMainElement.querySelector(`.board`);
render(boardElement, createLoadMoreButtonTemplate());
