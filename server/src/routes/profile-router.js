const express = require("express");
const profileCtrl = require( "../controllers/profile-ctrl");

const router = express.Router()

router.post('/profile', profileCtrl.createProfile)
// router.put('/movie/:id', MovieCtrl.updateMovie)
// router.delete('/movie/:id', MovieCtrl.deleteMovie)
// router.get('/movie/:id', MovieCtrl.getMovieById)
router.get('/profiles', profileCtrl.getProfile)

module.exports = router