const { Router } = require("express");
const contacts = require("./contacts");
const users = require("./users");

const router = Router();

router.use("/contacts", contacts);
router.use("/users", users);

module.exports = router;
