import express from "express";
import cors from "cors";
import { createNewCourse } from "./src/controllers/services.controllers.js";
import { connectToDatabase } from "./db.js";


import routes from "./src/routes/index.js"




const app = express();

app.use(cors());
app.use(express.json());

connectToDatabase()



app.use("/api/v1",routes)


app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
