// Constants
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

// Utilities
export const getRandomIntegerNumber = (min, max) => min + Math.floor(Math.random() * (max + 1 - min));

export const getCorrectTime = (date) => {
  const hours = date.getHours();

  return {
    day: date.getDate(),
    month: MONTHS[date.getMonth()],
    time: `${hours % 12}:${date.getMinutes()} ${hours < 12 ? `AM` : `PM`}`
  };
};
