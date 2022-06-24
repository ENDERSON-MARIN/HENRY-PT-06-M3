const express = require("express");
const model = require("../model");

const routerUsers = express.Router();
const routerTodos = express.Router();

/* Middleware para validar usuarios */

function validateCreateUser(req, res, next) {
  const { name, lastName, email } = req.body;
  console.log(req.body);
  if (
    typeof name !== "string" ||
    typeof lastName !== "string" ||
    typeof email !== "string" ||
    name === "" ||
    lastName === "" ||
    email === ""
  ) {
    return res.status(400).json({
      error: "name, lastName, email are required!",
    });
  }

  next();
}

routerUsers.post("/", validateCreateUser, (req, res) => {
  const { name, lastName, email } = req.body;
  try {
    const user = model.createUser(name, lastName, email);
    res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});



module.exports = {
  routerUsers,
  routerTodos,
};
