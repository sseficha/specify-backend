const spotifyApi = require("../config/spotify-api");

module.exports = (req, res, next) => {
  // if (req.method === 'OPTIONS') {
  //   return next();
  // }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error(
        "Authentication failed, no access token in authorization header!"
      );
    } else {
      //const expirationdate = ...,    if expirationdate...spotifyapi.refrreshtoken and set new accesstoken
      req.token = token;
      next();
    }
  } catch (err) {
    return next({ statusCode: "500", message: err.message });
  }
};
