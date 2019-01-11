// Requirements
require("dotenv").config();
var keys = require("./keys");
var fs = require("fs");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");

// User Inputs
var userInput = process.argv;
var userCatergory = userInput[2].toUpperCase();
var userSearch = userInput.slice(3).join(" ");

var spotify = new Spotify(keys.spotify);
var omdbKey = keys.omdb.api_key;
var bandsKey = keys.bandsintown.api_key;

// Variables for Better Log Tracking
var dataFeed;
var searchedTerm;
var divider = "--------------------------------------------------\n";

// Searching for Song Information
function spotifyThis() {
  spotify
    .search({ type: "track", query: userSearch, limit: 1 })
    .then(function(response) {
      searchedTerm =
        "Results found for (" + userSearch + ") within Spotify\n\n";
      var songArtist =
        "Artist(s): " + response.tracks.items[0].album.artists[0].name;
      var songName = "\nSong: " + '"' + response.tracks.items[0].name + '"';
      var songAlbum = "\nAlbum: " + response.tracks.items[0].album.name;
      var songPreview =
        "\nPreview: " + response.tracks.items[0].external_urls.spotify + "\n";
      dataFeed =
        divider +
        searchedTerm +
        songArtist +
        songName +
        songAlbum +
        songPreview;
      logFeed();
      console.log("\nCategory: " + userCatergory);
      console.log("Finding song information for (" + userSearch + ") ...\n");
      console.log(songArtist, songName, songAlbum, songPreview);
    })
    .catch(function(err) {
      console.log("Error Occured: " + err);
    });
}

// Searching for Movie Information
function movieThis() {
  axios
    .get("http://www.omdbapi.com/?apikey=" + omdbKey + "&t=" + userSearch)
    .then(function(response) {
      searchedTerm = "Results found for (" + userSearch + ") within OMDB\n\n";
      var movie = "Movie: " + response.data.Title;
      var releaseDate = "\nReleased: " + response.data.Released;
      var rating = "\nIMDB Rating: " + response.data.Ratings[0].Value;
      var rottenTomatoes =
        "\nRotten Tomatoes: " + response.data.Ratings[1].Value;
      var plot = "\nPlot:\n" + response.data.Plot;
      var actors = "\nActors: " + response.data.Actors;
      var country = "\nCountry: " + response.data.Country;
      var language = "\nLanguage: " + response.data.Language + "\n";
      dataFeed =
        divider +
        searchedTerm +
        movie +
        releaseDate +
        rating +
        rottenTomatoes +
        plot +
        actors +
        country +
        language;
      logFeed();
      console.log("\nCategory: " + userCatergory);
      console.log("Finding movie details for (" + userSearch + ") ...\n");
      console.log(
        movie,
        releaseDate,
        rating,
        rottenTomatoes,
        plot,
        actors,
        country,
        language
      );
    })
    .catch(function(err) {
      console.log("Error Occured: " + err + "\n");
    });
}

function concertThis() {
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        userSearch +
        "/events?app_id=" +
        bandsKey
    )
    .then(function(response) {
      searchedTerm =
        "Results found for (" + userSearch + ") on Bandsintown\n\n";
      var venue = "Venue: " + response.data[0].venue.name;
      var location =
        "\nLocation: " +
        response.data[0].venue.city +
        ", " +
        response.data[0].venue.region +
        ", " +
        response.data[0].venue.country;
      var date =
        "\nDate: " + moment(response.data[0].datetime).format("L") + "\n";
      dataFeed = divider + searchedTerm + venue + location + date;
      logFeed();
      console.log("\nCategory: " + userCatergory);
      console.log("Finding live concerts for (" + userSearch + ") ...\n");
      console.log(venue, location, date);
    })
    .catch(function(error) {
      console.log("Error Occured: " + err + "\n");
    });
}

// Searching for information from within random.txt
function executeThis() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log("Error Occured: " + err + "\n");
    }

    var txtArray = data.split(",");
    userCatergory = txtArray[0];
    userSearch = txtArray[1];

    if (userCatergory === "FIND-SONG-INFO-FOR") {
      spotifyThis();
    } else if (userCatergory === "FIND-MOVIE-INFO-FOR") {
      movieThis();
    } else if (userCatergory === "FIND-LIVE-EVENTS-FOR") {
      concertThis();
    }
  });
}

// For archiving search data history into log.txt
function logFeed() {
  fs.appendFile("log.txt", dataFeed, function(err) {
    if (err) {
      return console.log("Error Occured: " + err + "\n");
    }
  });
}

switch (userCatergory) {
  case "FIND-LIVE-EVENTS-FOR":
    // Default Band (Placeholder Info)
    if (userSearch === "") {
      userSearch = "Drake";
    }
    concertThis();
    break;
  case "FIND-SONG-INFO-FOR":
    // Default Song (Placeholder Info)
    if (userSearch === "") {
      userSearch = "Sunflower";
    }
    spotifyThis();
    break;
  case "FIND-MOVIE-INFO-FOR":
    // Default Movie (Placeholder Info)
    if (userSearch === "") {
      userSearch = "Ready Player One";
    }
    movieThis();
    break;
  case "EXECUTE-TXT":
    executeThis();
    break;
  default:
    console.log(
      "\nLIRI: \nI'm not sure I quite understand what you are asking for. Please try again.\n"
    );
}
