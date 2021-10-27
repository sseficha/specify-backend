const spotifyApi = require("../config/spotify-api");

// Create the authorization URL
// var authorizeURL = spotifyApi.createAuthorizeURL(scopes);

const loginHandler = (req, res, next) => {
  let code = req.body.code;
  spotifyApi.authorizationCodeGrant(code).then(
    function (data) {
      res.status(200).json({
        access_token: data.body.access_token,
        refresh_token: data.body.refresh_token,
        expiration_date: new Date(
          new Date().getTime() + 1000 * data.body.expires_in
        ),
      });
    },
    function (err) {
      next({ statusCode: err.statusCode, message: err.body.error_description });
    }
  );
};

const refreshTokenHandler = (req, res, next) => {
  let refreshToken = req.body.refreshToken;
  spotifyApi.setRefreshToken(refreshToken);

  spotifyApi.refreshAccessToken().then(
    function (data) {
      console.log("The access token has been refreshed!");
      res.status(200).json({
        access_token: data.body.access_token,
        refresh_token: refreshToken,
        expiration_date: new Date(
          new Date().getTime() + 1000 * data.body.expires_in
        ),
      });
    },
    function (err) {
      next({ statusCode: err.statusCode, message: err.body.error_description });
    }
  );
};

const topTracksHandler = (req, res, next) => {
  let token = req.token;
  spotifyApi.setAccessToken(token);
  spotifyApi.getMyTopTracks().then(
    function (data) {
      let topTracks = data.body.items;
      res.json({ topTracks: topTracks });
    },
    function (err) {
      next({ statusCode: err.statusCode, message: err.body.error.message });
    }
  );
};

const topArtistsHandler = (req, res, next) => {
  let token = req.token;
  spotifyApi.setAccessToken(token);
  spotifyApi.getMyTopArtists().then(
    function (data) {
      let topArtists = data.body.items;
      res.json({ topArtists: topArtists });
    },
    function (err) {
      next({ statusCode: err.statusCode, message: err.body.error.message });
    }
  );
};

const genresHandler = (req, res, next) => {
  spotifyApi.getAvailableGenreSeeds().then(
    function (data) {
      let genreSeeds = data.body;
      res.json(genreSeeds);
    },
    function (err) {
      console.log(err);
      next({ statusCode: err.statusCode, message: err.body.error.message });
    }
  );
};

const analysisHandler = (req, res, next) => {
  let token = req.token;
  let tracks = req.body.tracks;
  spotifyApi.setAccessToken(token);
  spotifyApi.getAudioFeaturesForTracks([tracks]).then(
    function (data) {
      let features = data.body;
      res.json(features);
    },
    function (err) {
      console.log(err);
      next({ statusCode: err.statusCode, message: err.body.error.message });
    }
  );
};

const recommendationsHandler = (req, res, next) => {
  let token = req.token;
  spotifyApi.setAccessToken(token);
  let body = req.body;
  console.log(body);
  spotifyApi
    .getRecommendations({
      // market: "GR",
      seed_tracks: body.trackSeeds,
      seed_artists: body.artistSeeds,
      seed_genres: body.genreSeeds,
      min_energy: body.energy.min,
      max_energy: body.energy.max,
      min_danceability: body.danceability.min,
      max_danceability: body.danceability.max,
      min_acousticness: body.acousticness.min,
      max_acousticness: body.acousticness.max,
      min_instrumentalness: body.instrumentalness.min,
      max_instrumentalness: body.instrumentalness.max,
      ////any new audio features
    })
    .then(
      function (data) {
        let recommendations = data.body;
        // console.log(recommendations);
        res.json(recommendations);
      },
      function (err) {
        next({ statusCode: err.statusCode, message: err.body.error.message });
      }
    );
};

const createPlaylistHandler = (req, res, next) => {
  // return res.json({ message: "ok" });
  let token = req.token;
  spotifyApi.setAccessToken(token);
  let name = req.query.name;
  let uris = req.body.uris;
  console.log(name, uris);

  spotifyApi
    .createPlaylist(name, { description: "My description", public: true })
    .then(
      function (data) {
        let id = data.body.id;
        spotifyApi.addTracksToPlaylist(id, uris).then(
          function (data) {
            res.status(201).json({ message: "Playlist successfully created" });
          },
          function (err) {
            next({
              statusCode: err.statusCode,
              message: err.body.error.message,
            });
          }
        );
      },
      function (err) {
        next({ statusCode: err.statusCode, message: err.body.error.message });
      }
    );
};

exports.loginHandler = loginHandler;
exports.topTracksHandler = topTracksHandler;
exports.topArtistsHandler = topArtistsHandler;
exports.genresHandler = genresHandler;
exports.analysisHandler = analysisHandler;
exports.refreshTokenHandler = refreshTokenHandler;
exports.recommendationsHandler = recommendationsHandler;
exports.createPlaylistHandler = createPlaylistHandler;
