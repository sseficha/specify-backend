// Init spotify api client wrapper
var SpotifyWebApi = require("spotify-web-api-node");
// var scopes = ["user-read-private", "user-top-read", "streaming"];
var spotifyApi = new SpotifyWebApi({
  clientId: "02f5d8f312494c38a9ef6ffd47e10700",
  clientSecret: "aa0a86a109af42d8a6146d2c8ead390a",
  redirectUri: "http://localhost:3000/login",
});

module.exports = spotifyApi;