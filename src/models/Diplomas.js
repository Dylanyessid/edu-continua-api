import { createRequire } from "module";
const require = createRequire(import.meta.url);
const EntitySchema = require("typeorm").EntitySchema;

export const DiplomasSchema = new EntitySchema({
    name: "Diploma",
    tableName: "diplomas",
    columns: {
      id: {
        primary: true,
        type: "int",
        generated: "increment",
      },
      name: {
        type: "varchar",
      },
      general_info: {
        type: "text",
      },
      image: {
        type: "text",
      },
      syllabus: {
        type: "text",
      },
      hours: {
        type: "decimal",
      },
      exhibitor_name: {
        type: "varchar",
      },
      exhibitor_photo: {
        type: "text",
      },
      organized_by: {
        type: "varchar",
      },
      supported_by_name: {
        type: "varchar",
      },
      supported_by_photo: {
        type: "text",
      },
      cost: {
        type: "decimal",
      },
      discounts: {
        type: "text",
      },
      inscription_url: {
        type: "text",
      },
    },
  });
  