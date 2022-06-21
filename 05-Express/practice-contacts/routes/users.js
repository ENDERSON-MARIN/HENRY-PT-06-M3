/* PRACTICANDO CON UNA API EXTERNA MEDIANTE AXIOS */
const { Router } = require("express");
const axios = require("axios").default;

const router = Router();

/* CON PROMESAS .THEN().CATCH */
router.get("/", (req, res) => {
  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((response) => res.json(response.data))
    .catch(() => res.status(500).json({ message: "Se rompió con .then!" }));
});

/* CON ASYNC AWAIT, MANEJANDO EL ERROR MEDIANTE TRY CATCH */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users/" + parseInt(id)
    );
    res.json(response.data);
  } catch {
    res.status(500).json({ message: "Se rompió con async!" });
  }
});

module.exports = router;
