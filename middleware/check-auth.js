const spotifyApi = require("../config/spotify-api");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error(
        "Authentication failed, no access token in authorization header!"
      );
    } else {
      req.token = token;
      next();
    }
  } catch (err) {
    return next({ statusCode: "500", message: err.message });
  }
};
