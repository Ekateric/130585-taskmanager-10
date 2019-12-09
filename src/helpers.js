// Constants
export const DAYS = [
  `mo`,
  `tu`,
  `we`,
  `th`,
  `fr`,
  `sa`,
  `su`
];

export const MONTHS = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`
];

export const COLORS = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`
];

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

// Utilities
export const getRandomInt = (min, max) => min + Math.floor(Math.random() * (max + 1 - min));

export const getCorrectTime = (date) => {
  const hours = date.getHours();

  return {
    day: date.getDate(),
    month: MONTHS[date.getMonth()],
    time: `${hours % 12}:${date.getMinutes()} ${hours < 12 ? `AM` : `PM`}`
  };
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

export const render = (container, element, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
