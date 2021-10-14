var express = require("express");
var checkAuth = require("../middleware/check-auth");

var router = express.Router();

var {
  loginHandler,
  topTracksHandler,
  topArtistsHandler,
  genresHandler,
  analysisHandler,
  refreshTokenHandler,
  recommendationsHandler,
  createPlaylistHandler,
} = require("../controllers/spotify-controllers");

// router.get("/error", (req, res, next) => {
//   let error = new Error("something went wrong");
//   return next(error);
// });

router.post("/login", loginHandler);

router.post("/refresh_token", refreshTokenHandler);

router.get("/top_tracks", checkAuth, topTracksHandler);

router.get("/top_artists", checkAuth, topArtistsHandler);

router.get("/genres", genresHandler);

router.post("/analysis", checkAuth, analysisHandler);

router.post("/recommendations", checkAuth, recommendationsHandler);

router.post("/create_playlist", checkAuth, createPlaylistHandler);

module.exports = router;
