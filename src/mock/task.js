import { DAYS, COLORS, getRandomIntegerNumber} from "../helpers";

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

const getRandomDate = (daysBefore, daysAfter) => {
  let fromDate = new Date();
  let toDate = new Date();

  fromDate.setDate(fromDate.getDate() + daysBefore);
  toDate.setDate(toDate.getDate() + daysAfter);
  fromDate = fromDate.getTime();
  toDate = toDate.getTime();

  return new Date(getRandomIntegerNumber(fromDate, toDate));
};

const getRandomRepeatingDays = (days, isRepeating) => {
  let repeatingDays = {};

  days.forEach((day) => {
    repeatingDays[day] = isRepeating ? Math.random() > 0.5 : false;
  });

  return repeatingDays;
};

const getRandomTags = (tagsFrom) => {
  const tagsCount = getRandomIntegerNumber(0, 3);
  const tagsLength = tagsFrom.length;
  let tags = new Array(tagsCount).fill(``);

  tags = tags.map(() => tagsFrom[getRandomIntegerNumber(0, tagsLength - 1)]);

  return new Set(tags);
};

export const createTaskData = () => {
  const dueDate = Math.random() > 0.5 ? getRandomDate(-7, 7) : null;
  return {
    description: MockDescriptions[getRandomIntegerNumber(0, MockDescriptions.length - 1)],
    dueDate,
    repeatingDays: dueDate ? getRandomRepeatingDays(DAYS, false) : getRandomRepeatingDays(DAYS,true),
    tags: getRandomTags(MockTags),
    color: COLORS[getRandomIntegerNumber(0, COLORS.length - 1)],
    isFavorite: Math.random() > 0.5,
    isArchive: Math.random() > 0.5
  };
};


