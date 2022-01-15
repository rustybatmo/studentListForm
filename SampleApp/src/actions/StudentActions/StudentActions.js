import { generateAPITypes } from "../../util/Common";
import { studentsNormalizer } from "../../util/normalizers";
import requestAPI from "../../util/RequestAPI";

export function getStudents(payload) {
  const { term, limit, start } = payload;

  let type = start === 0 ? "STUDENT_LIST" : "MORE_STUDENT_LIST";

  // console.log(term, limit, start);

  return {
    types: generateAPITypes(type),
    callAPI: (state) =>
      requestAPI(
        `http://localhost:3000/students?q=${term}&_start=${start}&_limit=${limit}`
      )
        .get()
        .then((res) => {
          const normaliser = studentsNormalizer(res);
          const { entities, result: list } = normaliser;
          return {
            entity: entities.studentsMap,
            list,
          };
        }),
  };
}

export function getStudent(id) {
  return {
    types: generateAPITypes("GET_STUDENT"),
    callAPI: (state) =>
      requestAPI(`http://localhost:3000/students/${id}`)
        .get()
        .then((res) => res),
  };
}

export function deleteStudent(id) {
  return {
    types: generateAPITypes("DELETE_STUDENT"),
    callAPI: (state) =>
      requestAPI(`http://localhost:3000/students/${id}`)
        .del()
        .then((res) => id),
  };
}

export function updateStudent(payload) {
  const id = payload.id;

  return {
    types: generateAPITypes("EDIT_STUDENT"),
    callAPI: (state) =>
      requestAPI(`http://localhost:3000/students/${id}`)
        .put("", payload)
        .then((res) => {
          return res;
        }),
  };
}

export function addStudent(payload) {
  return {
    types: generateAPITypes("ADD_STUDENT"),
    callAPI: (state) => {
      let url = `http://localhost:3000/students`;
      return requestAPI(url)
        .post("", payload)
        .then((res) => {
          return res;
        });
    },
  };
}

export function getStudentsBySchoolId(id) {
  console.log("Is this getting called tho" + id);
  return {
    types: generateAPITypes("GET_STUDENTS_BY_SCHOOLID"),
    callAPI: (state) => {
      let url = `http://localhost:3000/students?schoolId=${id}`;
      return requestAPI(url)
        .get()
        .then((res) => {
          return res;
        });
    },
  };
}

// export function getStudents(payload) {
//   const { term, limit, start } = payload;

//   let type = start === 0 ? "STUDENT_LIST" : "MORE_STUDENT_LIST";

//   // console.log(term, limit, start);

//   return {
//     types: generateAPITypes(type),
//     callAPI: (state) =>
//       requestAPI(
//         `http://localhost:3000/students?q=${term}&_start=${start}&_limit=${limit}`
//       )
//         .get()
//         .then((res) => {
//           const normaliser = studentsNormalizer(res);
//           const { entities, result: list } = normaliser;
//           return {
//             entity: entities.studentsMap,
//             list,
//           };
//         }),
//   };
// }

// export default getStuden/ts;
// const model = { ...this.state.model };

// const newModel = model.map((m) => {
//   if (m.key === key) {
//     const obj = {
//       ...m,
//     };
//     obj.error = "";
//   } else return m;
// });
