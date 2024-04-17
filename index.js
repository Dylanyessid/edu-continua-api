import express from "express";
import cors from "cors";
import { connectToDatabase } from "./db.js";

import routes from "./src/routes/index.js";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc";

import { swaggerSpec } from './src/config/swagger.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"))
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(swaggerSpec)))

connectToDatabase();

app.use("/api/v1", routes);

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
