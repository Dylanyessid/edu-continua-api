import express from "express";
import cors from "cors";
import { connectToDatabase } from "./db.js";

import routes from "./src/routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

connectToDatabase();

app.use("/api/v1", routes);

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
