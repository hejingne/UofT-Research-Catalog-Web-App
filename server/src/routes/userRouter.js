const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/create", userController.createUser);
router.post("/validate", userController.validateUser);

module.exports = router;
