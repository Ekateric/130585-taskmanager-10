import {getRandomIntegerNumber} from "../helpers";

const MockDescriptions = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const MockRepeatingDays = {
  mo: false,
  tu: false,
  we: false,
  th: false,
  fr: false,
  sa: false,
  su: false
};

const MockTags = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`
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

const getRandomRepeatingDays = () => {
  const repeatingDays = Object.assign({}, MockRepeatingDays);

  for (let day in repeatingDays) {
    if ({}.hasOwnProperty.call(day, repeatingDays)) {
      repeatingDays[day] = Math.random() > 0.5;
    }
  }

  return repeatingDays;
};

const getRandomTags = () => {
  const tagsCount = getRandomIntegerNumber(0, 3);
  const mockTagsLength = MockTags.length;
  let tags = new Array(tagsCount).fill(``);

  tags = tags.map(() => MockTags[getRandomIntegerNumber(0, mockTagsLength - 1)]);

  return new Set(tags);
};

export const createTaskData = () => {
  const dueDate = Math.random() > 0.5 ? getRandomDate(-7, 7) : null;
  return {
    description: MockDescriptions[getRandomIntegerNumber(0, MockDescriptions.length - 1)],
    dueDate,
    repeatingDays: dueDate ? MockRepeatingDays : getRandomRepeatingDays(),
    tags: getRandomTags()
  };
};


