var express = require("express");
var bodyParser = require("body-parser");

var spotify_routes = require("./routes/spotify-routes");
var app = express();
const port = 5000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/spotify_api", spotify_routes);

//custom error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.log(err);
  // res.status(err.statusCode).json({ message: err.body.error_description });
  res.status(err.statusCode).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
