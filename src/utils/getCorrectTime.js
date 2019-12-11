import {MONTHS} from "../const/months";

export default (date) => {
  const hours = date.getHours();

  return {
    day: date.getDate(),
    month: MONTHS[date.getMonth()],
    time: `${hours % 12}:${date.getMinutes()} ${hours < 12 ? `AM` : `PM`}`
  };
};
