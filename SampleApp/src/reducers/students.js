function students(state = [], { data, type }) {
  switch (type) {
    case "STUDENT_LIST_SUCCESS": {
      const { entity, list } = data;
      const obj = {
        entity,
        list,
      };
      return obj;
    }

    case "MORE_STUDENT_LIST_SUCCESS": {
      const { entity, list } = state;

      const stateEntity = { ...entity };
      const stateList = [...list];

      const dataEntity = { ...data.entity };
      const dataList = [...data.list];

      const finalList = stateList.concat(dataList);

      Object.assign(stateEntity, dataEntity);

      const obj = {
        entity: stateEntity,
        list: finalList,
      };

      return obj;
    }

    case "GET_STUDENT_SUCCESS": {
      return data;
    }

    case "DELETE_STUDENT_SUCCESS": {
      const { entity, list = [] } = state;
      const newList = list.filter((item) => item !== data);

      //splice

      const newEntity = { ...entity };
      delete newEntity[data];

      const newObj = {
        list: newList,
        entity: newEntity,
      };

      return newObj;
    }

    case "EDIT_STUDENT_SUCCESS": {
      const id = data.id;

      const { entity, list } = state;

      const newEntity = { ...entity };

      newEntity[id] = data;
      const obj = {
        newEntity,
        list,
      };
      return obj;
    }

    case "ADD_STUDENT_SUCCESS": {
      const id = data.id;
      const newEntity = { ...state.entity };
      newEntity[id] = data;

      const list = state.list;
      const newList = [...list];
      newList.unshift(id);

      const newObj = {
        entity: newEntity,
        list: newList,
      };

      return newObj;
    }

    default:
      return state;
  }
}

export { students };
