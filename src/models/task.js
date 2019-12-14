import getCorrectTime from "../utils/getCorrectTime";

export default class TaskModel {
  constructor(data) {
    this.id = data.id;
    this.description = data.description;
    this.dueDate = data.dueDate;
    this.repeatingDays = data.repeatingDays;
    this.tags = data.tags;
    this.color = data.color;
    this.isFavorite = data.isFavorite;
    this.isArchive = data.isArchive;
    this.correctTime = this.dueDate ? getCorrectTime(this.dueDate) : {day: ``, month: ``, time: ``};
    this.isDeadline = this.dueDate instanceof Date && this.dueDate < Date.now();
    this.isRepeat = Object.values(this.repeatingDays).includes(true);
  }
}
