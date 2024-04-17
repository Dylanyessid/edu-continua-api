import path, {dirname} from "path"
import { fileURLToPath } from "url";
console.log()
export const swaggerSpec = {
    definition:{
      openapi:"3.0.0",
      info:{
        title:"PYGLO-API",
        version:"1.0.0"
      },
      servers:[{
        url:"http://localhost:3000"
      }]
    },
    apis:[`${path.join(dirname(fileURLToPath(import.meta.url)),"..", "./docs/*.yaml")}`]
}