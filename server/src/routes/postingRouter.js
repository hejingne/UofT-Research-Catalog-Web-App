
const express = require("express");
const postingController = require("../controllers/postingController");

const router = express.Router();

router.get("/postings", postingController.getResearches);

module.exports = router;