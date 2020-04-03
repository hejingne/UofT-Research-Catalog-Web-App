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
    "/applications/researchId/:researchId",
    applicationController.getApplicationsByResearchId
);
router.patch("/accept/:id", applicationController.acceptApplication);
router.patch("/reject/:id", applicationController.rejectApplication);
router.patch("/review/:id", applicationController.reviewApplication);
router.patch("/offer/:id", applicationController.offerApplication);

module.exports = router;
