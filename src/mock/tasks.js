import {createTaskData} from "./task";

export const createTasksData = (tasksCount) => {
  return new Array(tasksCount)
    .fill(``)
    .map(createTaskData);
};
