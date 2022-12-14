const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/create", userController.createUser);
router.post("/authenticate", userController.authenticateUser);
router.put("/updatePassword", userController.updatePassword);
router.put(
    "/updateEmailAddressAndUserType",
    userController.updateEmailAddressAndUserType
);
router.get("/signOut", userController.signOutUser);
router.get("/session/:sessionId", userController.getSession);
router.get("/users", userController.getUsers);
router.delete("/delete/:emailAddress", userController.deleteUserAndProfile);

module.exports = router;
