
const express = require("express");
const postingController = require("../controllers/postingController");

const router = express.Router();

router.get("/postings", postingController.getResearches);
router.post("/postings", postingController.startMakingPosts);
router.get("/:email", postingController.getResearcherByEmail);
router.post("/createPosting", postingController.createPostForResearcher);
router.delete("/deletePosting/:id/:index", postingController.deletePostForResearcher);
router.put("/updatePosting", postingController.editPost);

module.exports = router;
