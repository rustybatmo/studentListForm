import { normalizer, schema, arrayOf } from "./normalize";

const studentsSchema = schema("studentsMap", { id: "id" });

export const studentsNormalizer = normalizer(arrayOf(studentsSchema));

const schoolsSchema = schema("schoolsMap", { id: "id" });

export const schoolsNormalizer = normalizer(arrayOf(schoolsSchema));
