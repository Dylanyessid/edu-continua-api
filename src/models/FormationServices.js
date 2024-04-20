import { createRequire } from "module";
const require = createRequire(import.meta.url);
const EntitySchema = require("typeorm").EntitySchema;

export const FormationServicesSchema = new EntitySchema({
  name: "FormationServices",
  tableName: "formation_services",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: "increment",
    },
    name: {
      type: "varchar",
    },
    type: {
      type: "enum",
      enum: ["course", "workshop", "seminar", "diploma"],
    },
    generalInfo: {
      name: 'general_info',
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
    exhibitorName: {
      name: 'exhibitor_name',
      type: "varchar",
    },
    exhibitorPhoto: {
      name: 'exhibitor_photo',
      type: "text",
    },
    organizedBy: {
      name: 'organized_by',
      type: "varchar",
    },
    supportedByName: {
      name: 'supported_by_name',
      type: "varchar",
    },
    supportedByPhoto: {
      name: 'supported_by_photo',
      type: "text",
    },
    cost: {
      type: "decimal",
    },
    discounts: {
      type: "text",
    },
    inscriptionUrl: {
      name: 'inscription_url',
      type: "text",
    },
    deletedAt:{
      type:"datetime",
      nullable:true
    }
  },
});
