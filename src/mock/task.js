import {getRandomIntegerNumber} from "../helpers";



const MockDescriptions = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];



export const createTaskData = () => {
  return {
    description: MockDescriptions[getRandomIntegerNumber(0, MockDescriptions.length - 1)]
  };
};


