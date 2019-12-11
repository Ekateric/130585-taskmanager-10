import getRandomInt from "../utils/getRandomInt";
import {DAYS} from "../const/days";
import {COLORS} from "../const/colors";

const MockDescriptions = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const MockTags = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`
];

export default class TasksMock {
  constructor(tasksCount) {
    this._data = this.createTasksData(tasksCount);
  }

  _getRandomDate(daysBefore, daysAfter) {
    let fromDate = new Date();
    let toDate = new Date();

    fromDate.setDate(fromDate.getDate() + daysBefore);
    toDate.setDate(toDate.getDate() + daysAfter);
    fromDate = fromDate.getTime();
    toDate = toDate.getTime();

    return new Date(getRandomInt(fromDate, toDate));
  }

  _getRandomRepeatingDays(days, isRepeating) {
    let repeatingDays = {};

    days.forEach((day) => {
      repeatingDays[day] = isRepeating ? Math.random() > 0.5 : false;
    });

    return repeatingDays;
  }

  _getRandomTags(tagsFrom) {
    const tagsCount = getRandomInt(0, 3);
    const tagsLength = tagsFrom.length;
    let tags = new Array(tagsCount).fill(``);

    tags = tags.map(() => tagsFrom[getRandomInt(0, tagsLength - 1)]);

    return new Set(tags);
  }

  createTaskData() {
    const dueDate = Math.random() > 0.5 ? this._getRandomDate(-7, 7) : null;
    return {
      description: MockDescriptions[getRandomInt(0, MockDescriptions.length - 1)],
      dueDate,
      repeatingDays: dueDate ? this._getRandomRepeatingDays(DAYS, false) : this._getRandomRepeatingDays(DAYS, true),
      tags: this._getRandomTags(MockTags),
      color: COLORS[getRandomInt(0, COLORS.length - 1)],
      isFavorite: Math.random() > 0.5,
      isArchive: Math.random() > 0.5
    };
  }

  createTasksData(tasksCount) {
    return new Array(tasksCount)
      .fill(``)
      .map(() => this.createTaskData());
  }

  get data() {
    return this._data;
  }
}
