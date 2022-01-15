function samples(state = [], { data, type }) {
  switch (type) {
    case "SAMPLE_LIST_SUCCESS": {
      return data;
      break;
    }

    case "ADD_SAMPLE_SUCCESS": {
      let newState = Object.assign({}, state);
      return [...state, ...[data]];
      break;
    }

    default:
      return state;
  }
}

export { samples };
