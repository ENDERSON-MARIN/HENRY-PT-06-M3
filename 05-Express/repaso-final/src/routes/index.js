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
    const user = model.updateUser(Number(id), { name, lastName });
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
    const user = model.disableUser(Number(id));
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
    const user = model.enableUser(Number(id));
    res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

routerUsers.get("/:id", (req, res) => {
  const { id } = req.params;
  const { extended } = req.query;
  try {
    const user = model.getUser(Number(id), extended);
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

routerTodos.post("/", (req, res) => {
  const { title, description, userId } = req.body;
  try {
    const todo = model.createTodo(title, description, Number(userId));
    res.status(200).json(todo);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

routerTodos.put("/:id", (req, res) => {
  const { id } = req.params;
  try {
    const todo = model.completeTodo(Number(id));
    res.status(200).json(todo);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

routerUsers.put("/:id/todos/complete", (req, res) => {
  const { id } = req.params;
  try {
    const todo = model.completeAllUserTodos(Number(id));
    res.status(200).json(todo);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

routerUsers.get("/:id/todos", (req, res) => {
  const { id } = req.params;
  const {search} = req.query;
  try {
    const todo = model.getTodosByUser(Number(id), search);
    res.status(200).json(todo);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

routerTodos.get("/", (req, res) => {
  try {
    const todo = model.getAllTodos();
    res.status(200).json(todo);
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
