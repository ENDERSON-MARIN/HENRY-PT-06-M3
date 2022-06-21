// const bodyParser = require("body-parser");//ya no se usa
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let prevId = 0;
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests

server.post("/posts", (req, res) => {
  const { author, title, contents } = req.body;

  if (!author || !title || !contents)
    return res.status(STATUS_USER_ERROR).json({
      error: "No se recibieron los parámetros necesarios para crear el Post",
    });

  const post = { author, title, contents, id: ++prevId };
  posts.push(post);
  res.json(post);
});

server.post("/posts/author/:author", (req, res) => {
  const { author } = req.params;
  const { title, contents } = req.body;

  if (!author || !title || !contents)
    return res.status(STATUS_USER_ERROR).json({
      error: "No se recibieron los parámetros necesarios para crear el Post",
    });

  const post = { author, title, contents, id: ++prevId };
  posts.push(post);
  res.json(post);
});

server.get("/posts", (req, res) => {
  if (req.query.term) {
    return res.json(
      posts.filter(
        (post) =>
          post.title.toLowerCase().includes(req.query.term.toLowerCase()) ||
          post.contents.toLowerCase().includes(req.query.term.toLowerCase())
      )
    );
  }
  res.json(posts);
});

server.get("/posts/:author", (req, res) => {
  const result = posts.filter((post) => post.author === req.params.author);

  if (!result.length)
    //si el array devuelto esta vacio
    return res
      .status(STATUS_USER_ERROR)
      .json({ error: "No existe ningun post del autor indicado" });

  res.json(result); //si no esta vacio, lo devuelve
});

server.get("/posts/:author/:title", (req, res) => {
  const result = posts.filter(
    (post) =>
      post.author === req.params.author && post.title === req.params.title
  );

  if (!result.length)
    //si el array devuelto esta vacio
    return res.status(STATUS_USER_ERROR).json({
      error: "No existe ningun post con dicho titulo y autor indicado",
    });

  res.json(result); //si no esta vacio, lo devuelve
});

server.put("/posts", (req, res) => {
  const { id, title, contents } = req.body;

  if (!id || !title || !contents)
    return res.status(STATUS_USER_ERROR).json({
      error:
        "No se recibieron los parámetros necesarios para modificar el Post",
    });

  const post = posts.find((post) => post.id === id);
  if (!post)
    return res
      .status(STATUS_USER_ERROR)
      .json({ error: "No se encontro el Post" });
  post.title = title;
  post.contents = contents;
  res.json(post);
});

server.delete("/posts", (req, res) => {
  const { id } = req.body; //recibimos el id del cuerpo de la peticion

  if (!id)
    //si no existe el id devolvemos un error
    return res.status(STATUS_USER_ERROR).json({
      error: "No se recibieron los parámetros necesarios para Eliminar el Post",
    });

  const post = posts.find((post) => post.id === id); //buscamos en el array posts aquel con el id igual al que viene por parámetro
  if (!post)
    //si no existe el post devolvemos un error
    return res
      .status(STATUS_USER_ERROR)
      .json({ error: "No se encontró en Post" });

  posts = posts.filter((post) => post.id !== id); //filtramos en el array posts aquel con el id distinto al que viene por parámetro

  res.json({ success: true });
});
server.delete("/author", (req, res) => {
  const { author } = req.body; //recibimos el author del cuerpo de la peticion

  if (!author)
    //si no existe el author devolvemos un error
    return res.status(STATUS_USER_ERROR).json({
      error: "No se recibieron los parámetros necesarios para Eliminar el Post",
    });

  const postAuthor = posts.filter((post) => post.author === author); //filtramos en el array posts aquel con el author igual al que viene por parámetro
  if (!postAuthor.length)
    //si el array de post está vacío devolvemos un error
    return res
      .status(STATUS_USER_ERROR)
      .json({ error: "No existe el autor indicado" });

  res.json(postAuthor); //si no está vacío lo devolvemmos
});

module.exports = { posts, server };
