const express = require("express");
const userRouter = require("./users/routes");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
/* middlewares */
app.use(cors());
app.use(morgan("dev"));

app.use(express.json()); //para parsear el body de la peticion

/* middleware personalizado, para hacer cualquier cosa*/
// app.use((req, res, next) => {
//   console.log("Request BODY:", req.body);//mostrar el body por consola en todas las peticiones
//   next();
// });

app.use("/users", userRouter);

/* middleware para el manejo de errores */
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send("Upss!, se rompió el Server!");
});

const port = 3000;

app.listen(port, () => console.log(`Server Ready listening on port ${port}!`));
