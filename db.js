import { createRequire } from "module";
import { CoursesSchema } from "./src/models/Courses.js";
import { AdminsSchema } from "./src/models/admin.js";
import dotenv from "dotenv"
const require = createRequire(import.meta.url);
const typeorm = require("typeorm");
dotenv.config()
export const dataSource = new typeorm.DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
//   synchronize: true,
  entities: [CoursesSchema, AdminsSchema],
});

export async function connectToDatabase() {
    
    try {
        dataSource.initialize().then(()=>{
            console.log('Database connected');
        })
    } catch (error) {
        console.log('No se pudo conectar a BD ' + error);
    }

    
}
