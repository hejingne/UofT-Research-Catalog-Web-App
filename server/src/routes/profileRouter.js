const express = require("express");
const profileController = require("../controllers/profileController");

const router = express.Router();

// router.post("/profile", profileCtrl.createProfile);
// router.put('/movie/:id', MovieCtrl.updateMovie)
// router.delete('/movie/:id', MovieCtrl.deleteMovie)
// router.get('/movie/:id', MovieCtrl.getMovieById)
router.get("/:emailAddress", profileController.getProfileByEmail);
router.put("/updateInterests", profileController.updateInterests);
router.put("/updateProfilePicture", profileController.updateProfilePicture);
router.put("/updateDescription", profileController.updateDescription);
router.put("/updateEmploymentInfo", profileController.updateEmploymentInfo);

module.exports = router;
