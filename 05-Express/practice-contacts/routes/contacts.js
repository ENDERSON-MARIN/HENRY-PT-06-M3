const { Router } = require("express");

const {
  findAll,
  findById,
  create,
  update,
  remove,
} = require("../controllers/contacts");

const router = Router();

router.get("/", (req, res) => {
  res.json(
    findAll(req.query.name).map((contact) => ({
      ...contact,
      url: `http://localhost:3000/api/contacts/${contact.id}`,
    }))
  );
});

router.get("/:id", (req, res) => {
  const contact = findById(parseInt(req.params.id));
  if (!contact)
    return res
      .status(404)
      .json({ message: "No se encuentra ningun contacto con ese Id." });
  res.json(contact);
});

router.post("/", (req, res) => {
  const { name, phone, email } = req.body;
  if (!name || !phone || !email)
    return res.status(400).json({ message: "faltan inputs!." });

  try {
    res.json(create(name, phone, email));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", (req, res) => {
  const { name, phone} = req.body;
  const {id} = req.params;

  if (!name || !phone)
    return res.status(400).json({ message: "faltan inputs!." });

  try {
    res.json(update(parseInt(id),name, phone));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", (req, res) => {
  const {id} = req.params;

  try {
    res.json(remove(parseInt(id)));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


module.exports = router;
