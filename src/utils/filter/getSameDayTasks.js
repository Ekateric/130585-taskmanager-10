import moment from "moment";

export default (tasks, day) => {
  const dayMoment = moment(day);

  return tasks.filter((task) => {
    return dayMoment.isSame(task.dueDate, `day`);
  });
};
