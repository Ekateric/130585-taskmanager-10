export default class TaskModel {
  constructor(data) {
    this.description = data.description;
    this.dueDate = data.dueDate;
    this.repeatingDays = data.repeatingDays;
    this.tags = data.tags;
    this.color = data.color;
    this.isFavorite = data.isFavorite;
    this.isArchive = data.isArchive;
  }
}
