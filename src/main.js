import {createMenuTemplate} from "./components/menu";
import {createFilterData} from "./mock/filters";
import {createFiltersTemplate} from "./components/filter";
import {createBoardTemplate} from "./components/board";
import TasksMock from "./mock/tasks";
import TasksListModel from "./models/tasks-list";
import TaskView from "./components/task";
import {createTaskEditTemplate} from "./components/task-edit";
import {createButtonLoadMoreTemplate} from "./components/button-load-more";
import {getRandomInt, render, createElement, RenderPosition} from "./helpers";

const TASK_COUNT = getRandomInt(1, 20);
const TASK_PER_PAGE = 8;

const tasksMock = new TasksMock(TASK_COUNT);
const tasksListModel = new TasksListModel(tasksMock.data);

const filters = createFilterData(tasksListModel.tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createElement(createMenuTemplate()));
render(siteMainElement, createElement(createFiltersTemplate(filters)));
render(siteMainElement, createElement(createBoardTemplate()));

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
render(taskListElement, createElement(createTaskEditTemplate(tasksListModel.tasks[0])));
tasksListModel.tasks
  .slice(1, TASK_PER_PAGE)
  .forEach((task) => render(taskListElement, new TaskView(task).getElement()));

if (TASK_PER_PAGE < TASK_COUNT) {
  const boardElement = siteMainElement.querySelector(`.board`);
  render(boardElement, createElement(createButtonLoadMoreTemplate()));

  const loadMoreButton = boardElement.querySelector(`.load-more`);
  let showingTasksCount = TASK_PER_PAGE;

  loadMoreButton.addEventListener(`click`, () => {
    const newShowingTasksCount = showingTasksCount + TASK_PER_PAGE;
    tasksListModel.tasks
      .slice(showingTasksCount, newShowingTasksCount)
      .forEach((task) => render(taskListElement, new TaskView(task).getElement()));

    showingTasksCount = newShowingTasksCount;

    if (showingTasksCount >= TASK_COUNT) {
      loadMoreButton.remove();
    }
  });
}
