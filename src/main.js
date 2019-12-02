import {createMenuTemplate} from "./components/menu";
import {createFilterData} from "./mock/filters";
import {createFiltersTemplate} from "./components/filter";
import {createBoardTemplate} from "./components/board";
import {createTasksData} from "./mock/tasks";
import {createTaskTemplate} from "./components/task";
// import {createTaskEditTemplate} from "./components/task-edit";
import {createButtonLoadMoreTemplate} from "./components/button-load-more";
import {getRandomIntegerNumber} from "./helpers";

const TASK_COUNT = getRandomIntegerNumber(1, 20);
const TASK_PER_PAGE = 8;

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
// render(taskListElement, createTaskEditTemplate());
tasks
  .slice(0, TASK_PER_PAGE)
  .forEach((task) => render(taskListElement, createTaskTemplate(task)));

if (TASK_PER_PAGE < TASK_COUNT) {
  const boardElement = siteMainElement.querySelector(`.board`);
  render(boardElement, createButtonLoadMoreTemplate());

  const loadMoreButton = boardElement.querySelector(`.load-more`);
  let showingTasksCount = TASK_PER_PAGE;

  loadMoreButton.addEventListener(`click`, () => {
    const newShowingTasksCount = showingTasksCount + TASK_PER_PAGE;
    tasks
      .slice(showingTasksCount, newShowingTasksCount)
      .forEach((task) => render(taskListElement, createTaskTemplate(task)));

    showingTasksCount = newShowingTasksCount;

    if (showingTasksCount >= TASK_COUNT) {
      loadMoreButton.remove();
    }
  });
}
