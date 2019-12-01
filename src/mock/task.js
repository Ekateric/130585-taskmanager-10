import {getRandomIntegerNumber} from "../helpers";

const MockDescriptions = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const getRandomDate = (daysBefore, daysAfter) => {
  let fromDate = new Date();
  let toDate = new Date();

  fromDate.setDate(fromDate.getDate() + daysBefore);
  toDate.setDate(toDate.getDate() + daysAfter);
  fromDate = fromDate.getTime();
  toDate = toDate.getTime();

  return new Date(getRandomIntegerNumber(fromDate, toDate));
};

export const createTaskData = () => {
  return {
    description: MockDescriptions[getRandomIntegerNumber(0, MockDescriptions.length - 1)],
    dueDate: Math.random() > 0.5 ? getRandomDate(-7, 7) : null
  };
};


