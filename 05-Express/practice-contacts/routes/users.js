const { Router } = require("express");
const axios = require("axios").default;

const router = Router();

router.get("/", (req, res) => {
  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((response) => res.json(response.data))
    .catch(() => res.status(500).json({ message: "Se rompió con .then!" }));
});

router.get("/:id", async (req, res) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users/" + req.params.id
    );
    res.json(response.data);
  } catch {
    res.status(500).json({ message: "Se rompió con async!" });
  }
});

module.exports = router;
