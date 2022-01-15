import { createSelector } from "reselect";

//studentSelectors

const getStudentsSelectors = (state) => {
  const { list = [], entity = {} } = state.students;

  return state.students;
};

const getStudentSelector = (state, id) => {
  const { list = [], entity = {} } = state.students;
  return entity[id];
};

//reselect

export const selectStudents = createSelector(
  [getStudentsSelectors],
  (getStudentsSelectors) => {
    const { list = [], entity = {} } = getStudentsSelectors;

    return list.map((id) => entity[id]);
  }
);

export const selectStudent = createSelector(
  [getStudentSelector],
  (getStudentSelector) => {
    return getStudentSelector;
  }
);

//SCHOOL RELATED

//reselect
export const getSchoolsSelector =
  ([schoolsSelector],
  (schoolsSelector) => {
    const { list = [], entity = {} } = schoolsSelector;
    return list.map((id) => entity[id]);
  });

const schoolSelector = (state, id) => {
  const { list = [], entity = {} } = state.schools;
  return entity[id];
};

export const getSchoolSelector = createSelector(
  [schoolSelector],
  (schoolSelector) => {
    return schoolSelector;
  }
);

const schoolsSelector = (state) => {
  const schools = state.schools;
  return schools;
};

export const getSchoolsWithLabelAndId = createSelector(
  [schoolsSelector],
  (schoolsSelector) => {
    const { list = [], entity = {} } = schoolsSelector;

    const namesAndIds = list.map((id) => {
      let obj = {};

      // Object.assign(obj, { label: entity.id.name, id: entity.id.schoolId });
      Object.assign(obj, { label: entity[id].name, id: entity[id].schoolId });
      return obj;
    });

    return namesAndIds;
  }
);
