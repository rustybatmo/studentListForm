import { generateAPITypes } from "../../util/Common";
import { schoolsNormalizer } from "../../util/normalizers";
import requestAPI from "../../util/RequestAPI";

// export function getSchools() {
//   return {
//     types: generateAPITypes("SCHOOL_LIST"),
//     callAPI: (state) =>
//       requestAPI(`http://localhost:3000/schools`)
//         .get()
//         .then((res) => {
//           const normaliser = schoolsNormalizer(res);
//           const { entities, result: list } = normaliser;

//           return {
//             entity: entities.schoolsMap,
//             list,
//           };
//         }),
//   };
// }

export function getSchools(payload) {
  const { term, limit, start } = payload;
  console.log("Term" + term);
  console.log("Limit" + limit);
  console.log("start" + start);

  let type = start === 0 ? "SCHOOL_LIST" : "MORE_SCHOOL_LIST";

  return {
    types: generateAPITypes(type),
    callAPI: (state) =>
      requestAPI(
        `http://localhost:3000/schools?q=${term}&_start=${start}&_limit=${limit}`
      )
        .get()
        .then((res) => {
          const normaliser = schoolsNormalizer(res);
          const { entities, result: list } = normaliser;
          return {
            entity: entities.schoolsMap,
            list,
          };
        }),
  };
}

export function getSchool(id) {
  return {
    types: generateAPITypes("GET_SCHOOL"),
    callAPI: (state) =>
      requestAPI(`http://localhost:3000/schools/${id}`)
        .get()
        .then((res) => res),
  };
}

export function deleteSchool(id) {
  return {
    types: generateAPITypes("DELETE_SCHOOL"),
    callAPI: (state) =>
      requestAPI(`http://localhost:3000/schools/${id}`)
        .del()
        .then((res) => id),
  };
}

export function updateSchool(payload) {
  const id = payload.id;

  return {
    types: generateAPITypes("EDIT_SCHOOL"),
    callAPI: (state) =>
      requestAPI(`http://localhost:3000/schools/${id}`)
        .put("", payload)
        .then((res) => {
          return res;
        }),
  };
}

export function addSchool(payload) {
  return {
    types: generateAPITypes("ADD_SCHOOL"),
    callAPI: (state) => {
      let url = `http://localhost:3000/schools`;
      return requestAPI(url)
        .post("", payload)
        .then((res) => {
          return res;
        });
    },
  };
}
