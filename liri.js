require("dotenv").config();

var keys = require("./keys");
var spotify = new Spotify(keys.spotify);

var searchCMD = process.argv[2];

switch (searchCMD) {
  case "concert-this":
    break;
  case "spotify-this-song":
    break;
  case "movie-this":
    break;
  case "do-what-it-says":
    break;
}
