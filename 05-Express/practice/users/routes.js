const express = require("express");
const userController = require('./controller');

const app = express.Router();

/* ruta principal */
// app.get("/", (req, res) => {
//   res.send({ message: "Servidor Funcionando! 🚀" });
// });

/* OBTENER TODOS LOS USUARIOS */
app.get("/", userController.getAllUsers);

/* OBTENER USUARIO POR ID */
app.get("/:id", userController.getUserById);

/* CREAR NUEVO USUARIO */
app.post("/", userController.createUser);

/* EDITAR USUARIO */
app.put("/:id", userController.updateUser);

/* ELIMINAR USUARIO */
app.delete("/:id", userController.deleteUser);

module.exports = app;