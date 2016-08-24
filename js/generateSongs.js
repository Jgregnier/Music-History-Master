"use strict";

var activateEvents = require('./events');
var addFiltering = require('./filtering');

var songArray = [];
var keyArray = [];

var getSongsFromBase = function() {
  $.ajax({
    url: 'https://musichistory-9d69b.firebaseio.com/songs.json'
  }).done(function(songData){
    populateSongs(songData);
  });
};

var populateSongs = function (songData) {
  var artistList = [];
  var albumList = [];
  var genreList = [];

  $.each(songData, function (key, value){
    $("#songList").append(
      `<div class="songInfo showAll ${value.artist.replace(/ /g, "")} ${value.album.replace(/ /g, "")} ${value.genre}">
        <h1 class="songName"> ${value.songName} </h1>
        <div class="row">
          <ul>
            <li class="artistName col-sm-3"> ${value.artist}</li>
            <li class="albumName col-sm-3"> ${value.album} </li>
            <li class="genreSongInfo col-sm-2"> ${value.genre} </li>
            <button id = "${key}" class="removeSong btn btn-danger col-sm-3"> Remove Song </button>
          </ul>
        </div>
      </div>`);

    artistList.push(value.artist);
    albumList.push(value.album);
    genreList.push(value.genre);

    keyArray.push(key);
    songArray.push(value);
  });

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

  console.log(keyArray);
  console.log(songArray);
  activateEvents();
};

var getData = function() {
  console.log(keyArray, songArray);
  return keyArray;
};

getSongsFromBase();

module.exports = {getSongsFromBase, getData, populateSongs};


