import getArchiveTasks from "./getArchiveTasks";
import getNotArchiveTasks from "./getNotArchiveTasks";
import getFavoriteTasks from "./getFavoriteTasks";
import getOverdueTasks from "./getOverdueTasks";
import getRepeatingTasks from "./getRepeatingTasks";
import getSameDayTasks from "./getSameDayTasks";
import getTaggedTasks from "./getTaggedTasks";
import Filters from "../../data/filters";

export default (tasks, filterTitle) => {
  switch (filterTitle) {
    case Filters.ALL:
      return getNotArchiveTasks(tasks);
    case Filters.OVERDUE:
      return getOverdueTasks(getNotArchiveTasks(tasks), Date.now());
    case Filters.TODAY:
      return getSameDayTasks(getNotArchiveTasks(tasks), new Date());
    case Filters.FAVORITES:
      return getFavoriteTasks(getNotArchiveTasks(tasks));
    case Filters.REPEATING:
      return getRepeatingTasks(getNotArchiveTasks(tasks));
    case Filters.TAGS:
      return getTaggedTasks(getNotArchiveTasks(tasks));
    case Filters.ARCHIVE:
      return getArchiveTasks(tasks);
    default:
      return tasks;
  }
};
