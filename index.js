import express from "express";
import cors from "cors";
import { createNewCourse } from "./src/controllers/services.controllers.js";
import { connectToDatabase } from "./db.js";
import multer from "multer";
import { login, register } from "./src/controllers/admin.controllers.js";





const app = express();

app.use(cors());
app.use(express.json());

connectToDatabase()

const upload = multer({ dest: 'uploads/'})

//Request and Response
app.post("/prueba", upload.fields([{name:"courseImage"}]),createNewCourse);

app.post("/login", login)
app.post("/register", register)


app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
