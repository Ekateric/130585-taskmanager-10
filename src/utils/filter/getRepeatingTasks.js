export default (tasks) => tasks.filter((task) => Object.values(task.repeatingDays).includes(true));
