export default (tasks, day) => tasks.filter((task) => task.dueDate instanceof Date && task.dueDate < day);

