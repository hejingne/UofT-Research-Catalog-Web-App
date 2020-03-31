const express = require("express");
const applicationController = require("../controllers/applicationController");

const router = express.Router();

router.get("/applications", applicationController.getApplications);
router.post("/create", applicationController.createApplications);
router.delete("/delete/:id", applicationController.deleteApplicationById);
router.get(
    "/applications/:emailAddress",
    applicationController.getApplicationsByEmail
);
router.get(
    "/applications/:emailAddress/:researchId",
    applicationController.getApplicationsByEmailAndResearchId
);

router.patch("/accept/:id", applicationController.acceptApplication);

module.exports = router;
