import { createRequire } from "module";
const require = createRequire(import.meta.url);
const typeorm = require("typeorm");

export const dataSource = new typeorm.DataSource({
  type: "mysql",
  host: "b9vvt2yszc9v4983qqua-mysql.services.clever-cloud.com",
  port: 3306,
  username: "urmg4fwclz86qtti",
  password: "HU9hZrtLjmdIFrGqXEPF",
  database: "b9vvt2yszc9v4983qqua",
//   synchronize: true,
//   entities: [],
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
