export const alertData = (state = {}, { type, data }) => {
  switch (type) {
    case "ALERT_SHOW":
      return data;
    case "ALERT_HIDE":
      return {};

    default:
  }
  return state;
};
