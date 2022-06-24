/* Declaramos los arrays que simularan la base de datos */
const users = [];
const todos = [];

/* Creamos una funcion para generar los id de users y todos */

function idGeneratorMaker() {
  let prevUserId = 0;
  let prevTodoId = 0;

  return function (type) {
    switch (type) {
      case "user":
        return ++prevUserId;
      case "todo":
        return ++prevTodoId;
      default:
        return null;
    }
  };
}

const idGenerator = idGeneratorMaker();

/* creamos las funciones para la API de USERS */
function createUser(name, lastName, email) {
  const existUser = users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );

  if (existUser) {
    throw new Error("User with this email already exists!.");
  }

  const user = {
    id: idGenerator("user"),
    name,
    lastName,
    email,
    enabled: true,
  };

  users.push(user);
  return user;
}

function updateUser(idOrEmail, { name, lastName }) {
  const user = users.find(
    (user) =>
      user.id === idOrEmail ||
      user.email.toLowerCase() === idOrEmail.toLowerCase()
  );

  if (!user) {
    throw new Error("User not found!");
  }

  name && (user.name = name);
  lastName && (user.lastName = lastName);

  return user;
}

function disableUser(idOrEmail) {
  const user = users.find(
    (user) =>
      user.id === idOrEmail ||
      user.email.toLowerCase() === idOrEmail.toLowerCase()
  );

  if (!user) {
    throw new Error("User not found!");
  }

  user.enabled = false;

  return user;
}

function enableUser(idOrEmail) {
  const user = users.find(
    (user) =>
      user.id === idOrEmail ||
      user.email.toLowerCase() === idOrEmail.toLowerCase()
  );

  if (!user) {
    throw new Error("User not found!");
  }

  user.enabled = true;

  return user;
}

function getUser(idOrEmail, extended) {
  extended = extended === "true";

  const user = users.find(
    (user) =>
      user.id === idOrEmail ||
      user.email.toLowerCase() === idOrEmail.toLowerCase()
  );

  if (!user) {
    throw new Error("User not found");
  }

  if (extended) {
    user.todos = getTodosByUser(user.id);
  }

  return user;
}

function getAllUsers() {
  return users;
}

/* creamos las funciones para la API de TODOS */
function createTodo(title, description, userId) {
  const user = users.find((user) => user.id === userId);

  if (!user) {
    throw new Error("User not found!");
  }

  const todo = {
    id: idGenerator("todo"),
    title,
    description,
    userId,
    completed: false,
  };

  todos.push(todo);

  return todo;
}

function completeTodo(id) {
  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    throw new Error("Todo not found!");
  }

  todo.completed = true;
}

function completeAllUserTodos(idOrEmail) {
  const user = users.find(
    (user) =>
      user.id === idOrEmail ||
      user.email.toLowerCase() === idOrEmail.toLowerCase()
  );

  if (!user) {
    throw new Error("User not found!");
  }

  const todosCompleted = [];

  todos.forEach((todo) => {
    if (todo.userId === user.id && !todo.completed) {
      todo.completed = true;
      todosCompleted.push(todo);
    }
  });

  return todosCompleted;
}

function getTodosByUser(idOrEmail, search) {
  const user = users.find(
    (user) =>
      user.id === idOrEmail ||
      user.email.toLowerCase() === idOrEmail.toLowerCase()
  );

  if (!user) {
    throw new Error("User not found!");
  }

  let todosByUser = [];

  if (search) {
    todosByUser = todos.filter((todo) => {
      if (todo.userId === user.id) {
        if (todo.title.toLowerCase().includes(search.toLowerCase())) {
          return true;
        } else if (
          todo.description.toLowerCase().includes(search.toLowerCase())
        ) {
          return true;
        }
      }
      return false;
    });
  } else {
    todosByUser = todos.filter((todo) => todo.userId === user.id);
  }

  return todosByUser;
}

function getAllTodos() {
  return todos;
}

module.exports = {
  createUser,
  updateUser,
  disableUser,
  enableUser,
  getUser,
  getAllUsers,
  createTodo,
  completeTodo,
  completeAllUserTodos,
  getTodosByUser,
  getAllTodos,
};
