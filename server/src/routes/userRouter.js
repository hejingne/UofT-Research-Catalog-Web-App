const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/create", userController.createUser);
router.post("/authenticate", userController.authenticateUser);
router.put("/updatePassword", userController.updatePassword);
router.get("/signOut", userController.signOutUser);

module.exports = router;
