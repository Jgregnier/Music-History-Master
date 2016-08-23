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

var activateEvents = require('./events');

var songArray = [];

var loadSongs = function () {
  $.ajax("songList.json").done(function (data) {
    songArray = data.songs;
    console.log("heres the song array after ajax", songArray);
    populateSongs(songArray);
    return songArray;
  });
};

var getSongs = function () {
  return songArray;
};

var populateSongs = function (songArray) {
  console.log("populating songs array", songArray);
  for(var i = 0; i < songArray.length; i++) {
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

    $("#artistList").append(
      `<option value:"${songArray[i].artist}"> ${songArray[i].artist} </option>`
      );

    $("#albumList").append(
      `<option value:"${songArray[i].album}"> ${songArray[i].album} </option>`
      );
  }
  activateEvents();
};

loadSongs();

},{"./events":2}]},{},[3]);
