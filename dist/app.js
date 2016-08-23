(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var makeNewSong = function () {

  var getSongList = $.ajax("songList.json").done(function (data) {

    var songs = data.responseJSON;

    var addSongName = $("#addSongName").val();
    var addArtistName = $("#addArtistName").val();
    var addAlbumName =  $("#addAlbumName").val();
    var addGenreName =  $("#genreList").val();

    $("#songList").append(
        `<div class="songInfo">
          <h1 class="songName"> ${addSongName} </h1>
          <div class="row">
            <ul>
              <li class="artistName col-sm-3"> ${addArtistName} </li>
              <li class="albumName col-sm-3"> ${addAlbumName} </li>
              <li class="genreSongInfo col-sm-2"> ${addGenreName} </li>
              <button class="removeSong btn btn-danger col-sm-3"> Remove Song </button>
            </ul>
          </div>
        </div>`);

    $("#addSongName").val("");
    $("#addArtistName").val("");
    $("#addAlbumName").val("");
    $("#genreList").val("");

    $(".removeSong").click(function (event) {
    var self = (event.target);
    var selfParents = $(self).parents("div.songInfo");
    $(selfParents).remove();
    });
  });
};

module.exports = makeNewSong;

},{}],2:[function(require,module,exports){
"use strict";

var makeNewSong = require('./addSong');

var addRemoveSongEvents = function () {

  $(".showAddMusic").click(function () {
    $("#addMusicField").toggleClass('hidden');
    $("#mainContainer").toggleClass('hidden');
  });

  $("#addSong").click(function () {
    if (!($("#addSongName").val()) || !($("#addArtistName").val()) || !($("#addAlbumName").val())) {
      alert("You have to input a new song!");
    } else {
      makeNewSong();
    }
  });

  $(".removeSong").click(function (event) {
	  var self = (event.target);
	  var selfParents = $(self).parents("div.songInfo");
    $(selfParents).remove();
  });
};

module.exports = addRemoveSongEvents;

},{"./addSong":1}],3:[function(require,module,exports){
"use strict";


var populateArtist = function(artistList) {
for (let i = 0; i < artistList.length; i++){
  $("#artistList").append(
      `<option value:"${artistList[i]}"> ${artistList[i]} </option>`
    );
  }
};

var populateAlbum = function(albumList) {
  for (let i = 0; i < albumList.length; i++){
  $("#albumList").append(
      `<option value:"${albumList[i]}"> ${albumList[i]} </option>`
    );
  }
};

var populateGenre = function(genreList) {
  for (let i = 0; i < genreList.length; i++){
    $("#genreList").append(
      `<option value:"${genreList[i]}"> ${genreList[i]} </option>`
    );

    $("#genreDiv").append(`
      <div class="genre">
        <input type="radio" name="genre" class="genre" value="${genreList[i]}">
        <label class="lineOfGenre" for="${genreList[i]}">${genreList[i]}</label>
      </div>`
    );
  }
};

var addFiltering = function () {
  $("#filterButton").click(function(){

  });
};

module.exports = {addFiltering, populateArtist, populateAlbum, populateGenre};

},{}],4:[function(require,module,exports){
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

},{"./events":2,"./filtering":3}]},{},[4]);
