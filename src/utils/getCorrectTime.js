import castTimeFormat from "./castTimeFormat";
import MONTHS from "../data/months";

export default (date) => {
  let hours = date.getHours();
  const minutes = castTimeFormat(date.getMinutes());
  const interval = hours < 12 ? `AM` : `PM`;

  hours = castTimeFormat(hours % 12);

  return {
    day: castTimeFormat(date.getDate()),
    month: MONTHS[date.getMonth()],
    time: `${hours}:${minutes} ${interval}`
  };
};
