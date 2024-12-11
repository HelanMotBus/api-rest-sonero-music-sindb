import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const leerDatos = () => {
  try {
    const data = fs.readFileSync("./db.json");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const escribirDatos = (data) => {
  try {
    fs.writeFileSync("./db.json", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

app.get("/", (req, res) => {
  res.send("Bienvenido a la Api");
});

app.get("/lps", (req, res) => {
  const data = leerDatos();
  res.json(data.lps);
});

app.post("/lps", (req,res) => {
    const data = leerDatos();
    const body = req.body;
    const newLp = {
        id: data.lps.length + 1,
        ...body,
    };
    data.lps.push(newLp);
    escribirDatos(data);
    res.json(newLp);
})

app.listen(3000, () => {
  console.log("El servidor está levantado en el puerto 3000");
});
