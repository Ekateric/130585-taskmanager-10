import getArchiveTasks from "./getArchiveTasks";
import getNotArchiveTasks from "./getNotArchiveTasks";
import getFavoriteTasks from "./getFavoriteTasks";
import getOverdueTasks from "./getOverdueTasks";
import getRepeatingTasks from "./getRepeatingTasks";
import getSameDayTasks from "./getSameDayTasks";
import getTaggedTasks from "./getTaggedTasks";

export default (tasks, filterTitle) => {
  switch (filterTitle) {
    case `all`:
      return getNotArchiveTasks(tasks);
    case `overdue`:
      return getOverdueTasks(getNotArchiveTasks(tasks), Date.now());
    case `today`:
      return getSameDayTasks(getNotArchiveTasks(tasks), new Date());
    case `favorites`:
      return getFavoriteTasks(getNotArchiveTasks(tasks));
    case `repeating`:
      return getRepeatingTasks(getNotArchiveTasks(tasks));
    case `tags`:
      return getTaggedTasks(getNotArchiveTasks(tasks));
    case `archive`:
      return getArchiveTasks(tasks);
    default:
      return tasks;
  }
};
