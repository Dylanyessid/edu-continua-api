import { createRequire } from "module";
const require = createRequire(import.meta.url);
const EntitySchema = require("typeorm").EntitySchema;

export const AdminsSchema = new EntitySchema({
    name: "Admin",
    tableName:"admins",
    columns:{
        id:{
            primary:true,
            type:"int"
        },
        username:{
            type:"varchar"
        },
        password:{
            type:"text"
        },
        isActive:{
            type:"bool"
        },
       
    }
})
