const Filters = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `tags`,
  `archive`
];

const countFilterValue = (filter, elements) => {
  switch (filter) {
    case `all`:
      return elements.length;
    case `overdue`:
      return elements.filter((el) => el.dueDate instanceof Date && el.dueDate < Date.now()).length;
    case `today`:
      const timeFrom = new Date();
      let timeTo = new Date();
      timeTo.setDate(timeTo.getDate() + 1);
      timeTo.setHours(0, 0, 0, 0);

      return elements.filter((el) => el.dueDate instanceof Date && el.dueDate >= timeFrom && el.dueDate < timeTo).length;
    case `favorites`:
      return elements.filter((el) => el.isFavorite).length;
    case `repeating`:
      return elements.filter((el) => Object.values(el.repeatingDays).includes(true)).length;
    case `tags`:
      return elements.filter((el) => el.tags.size).length;
    case `archive`:
      return elements.filter((el) => el.isArchive).length;
    default:
      return 0;
  }
};

export const createFilterData = (elements) => {
  return Filters.map((filter) => {
    return {
      title: filter,
      count: countFilterValue(filter, elements)
    };
  });
};
