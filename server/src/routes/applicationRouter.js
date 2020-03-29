const express = require("express");
const applicationController = require("../controllers/applicationController");

const router = express.Router();

router.get("/applications", applicationController.getApplications);
router.post("/create", applicationController.createApplications);
router.delete("/delete/:id", applicationController.deleteApplicationById);

module.exports = router;
