const express = require("express");
const model = require("../model");

const routerUsers = express.Router();
const routerTodos = express.Router();

/* Middleware para validar usuarios */

function validateCreateUser(req, res, next) {
  const { name, lastName, email } = req.body;
  //console.log(req.body);
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

routerUsers.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, lastName } = req.body;

  try {
    const user = model.updateUser(id, { name, lastName });
    res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

routerUsers.put("/", (req, res) => {
  const { email, name, lastName } = req.body;

  try {
    const user = model.updateUser(email, { name, lastName });
    res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

routerUsers.put("/:id/disable", (req, res) => {
  const { id } = req.params;
  try {
    const user = model.disableUser(id);
    res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

routerUsers.put("/:id/enable", (req, res) => {
  const { id } = req.params;
  try {
    const user = model.enableUser(id);
    res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

routerUsers.get("/:id", (req, res) => {
  const { id } = req.params;
  try {
    const user = model.getUser(id);
    res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

routerUsers.get("/", (req, res) => {
  try {
    const user = model.getAllUsers();
    res.status(200).json(user);
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
