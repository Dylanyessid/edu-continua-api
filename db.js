import { createRequire } from "module";
import { FormationServicesSchema } from "./src/models/FormationSerices.js";
import { AdminsSchema } from "./src/models/admin.js";

import configs from "./src/config/config.js";

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
  entities: [FormationServicesSchema, AdminsSchema],
});

export async function connectToDatabase() {
  try {
    await dataSource.initialize();
    console.log("Database connected");
  } catch (error) {
    console.log("No se pudo conectar a BD " + error);
  }
}
