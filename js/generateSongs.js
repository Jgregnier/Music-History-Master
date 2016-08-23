"use strict";

var activateEvents = require('./events');
var addFiltering = require('./filtering');

var songArray = [];

var loadSongs = function () {
  $.ajax("songList.json").done(function (data) {
    songArray = data.songs;
    populateSongs(songArray);
    return songArray;
  });
};

var getSongs = function () {
  return songArray;
};

var populateSongs = function (songArray) {
  var artistList = [];
  var albumList = [];
  var genreList = [];

  for(let i = 0; i < songArray.length; i++) {
    $("#songList").append(
      `<div class="songInfo">
        <h1 class="songName"> ${songArray[i].songName} </h1>
        <div class="row">
          <ul>
            <li class="artistName col-sm-3"> ${songArray[i].artist}</li>
            <li class="albumName col-sm-3"> ${songArray[i].album} </li>
            <li class="genreSongInfo col-sm-2"> ${songArray[i].genre} </li>
            <button class="removeSong btn btn-danger col-sm-3"> Remove Song </button>
          </ul>
        </div>
      </div>`);

    artistList.push(songArray[i].artist);
    albumList.push(songArray[i].album);
    genreList.push(songArray[i].genre);
  }

  function unique(array) {
  var result = [];
  $.each(array, function(i, e) {
    if ($.inArray(e, result) == -1) result.push(e);
  });
  return result;
  }

  addFiltering.populateArtist(unique(artistList).sort());
  addFiltering.populateAlbum(unique(albumList).sort());
  addFiltering.populateGenre(unique(genreList).sort());

  addFiltering.addFiltering();
  activateEvents();
};

loadSongs();
