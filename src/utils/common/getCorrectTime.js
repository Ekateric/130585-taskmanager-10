import moment from "moment";

export default (date) => {
  return {
    date: moment(date).format(`DD MMMM`),
    time: moment(date).format(`hh:mm A`)
  };
};
