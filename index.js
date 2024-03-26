import express from "express";
import cors from "cors";






const app = express();

app.use(cors());
app.use(express.json());

//Request and Response
app.post("/prueba", (req, res) => {
  console.log(req.body);
  return res.json({ estado: "Terminado" });
});

app.post("/login")


app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
