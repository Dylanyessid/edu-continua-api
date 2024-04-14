import { createRequire } from "module";
import { CoursesSchema } from "./src/models/Courses.js";
import { AdminsSchema } from "./src/models/admin.js";

import configs from "./src/config/config.js";
import { SeminarsSchema } from "./src/models/Seminars.js";
import { WorkshopsSchema } from "./src/models/Workshops.js";
import { DiplomasSchema } from "./src/models/Diplomas.js";
const require = createRequire(import.meta.url);
const typeorm = require("typeorm");

export const dataSource = new typeorm.DataSource({
  type: "mysql",
  host: configs.database.host,
  port:configs.database.port,
  username: configs.database.username,
  password: configs.database.password,
  database: configs.database.database,
  //   synchronize: true,
  entities: [CoursesSchema, AdminsSchema, SeminarsSchema, WorkshopsSchema, DiplomasSchema],
});

export async function connectToDatabase() {
  try {
    await dataSource.initialize();
    console.log("Database connected");
  } catch (error) {
    console.log("No se pudo conectar a BD " + error);
  }
}
