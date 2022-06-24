/* importamos los módulos */
const express = require("express");
const { json } = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routers = require("./routes");

/* Creamos la instancia de express y la llamamos app */
const app = express();

/* aplicamos los middlewares necesarios */
app.use(json()); //para parsear la informacion del body
app.use(cors()); //para origenes cruzados
app.use(morgan("dev")); //para mirar todas las peticiones por consola

/* Aplicamos las rutas */
app.use("/users", routers.routerUsers);
app.use("/todos", routers.routerTodos);

/* Exportamos la app */
module.exports = app;
