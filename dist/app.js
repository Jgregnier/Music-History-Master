(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var reLoadSongs = require('./generateSongs');

var newSong = null;

var makeNewSong = function () {

    var addSongName = $("#addSongName").val();
    var addArtistName = $("#addArtistName").val();
    var addAlbumName =  $("#addAlbumName").val();
    var addGenreName =  $("#genreList").val();

    newSong =
      { "songName" : `${addSongName}`,
        "artist"   : `${addArtistName}`,
        "album"    : `${addAlbumName}`,
        "genre"    : `${addGenreName}`
      };
    console.log("song in make new song func", newSong);
    return newSong;
};

var addNewSongToFirebase = function (newsong) {
console.log("song after make new song func", newSong);

    $.ajax({
      url: 'https://musichistory-9d69b.firebaseio.com/songs.json',
      type: 'POST',
      data: JSON.stringify(newSong),
      dataType: "json"
    }).done(function(){
      console.log("your song has been posted");
      location.reload();
    });

  $("#addSongName").val("");
  $("#addArtistName").val("");
  $("#addAlbumName").val("");
  $("#genreList").val("");
};

module.exports = {makeNewSong, addNewSongToFirebase};

},{"./generateSongs":4}],2:[function(require,module,exports){
"use strict";

var songAdder = require('./addSong');

var addRemoveSongEvents = function () {

  $(".showAddMusic").click(function () {
    $("#addMusicField").toggleClass('hidden');
    $("#mainContainer").toggleClass('hidden');
  });

  $("#addSong").click(function () {
    if (!($("#addSongName").val()) || !($("#addArtistName").val()) || !($("#addAlbumName").val())) {
      alert("You have to input a new song!");
    } else {
      songAdder.makeNewSong();
      songAdder.addNewSongToFirebase();
    }
  });

  $(".removeSong").click(function (event) {
    var thisID = $(this).attr('id');

    $.ajax({
      url: `https://musichistory-9d69b.firebaseio.com/songs/${thisID}.json`,
      method: "DELETE"
    }).done(function () {
      console.log("your song has been deleted");
      location.reload();
    });
  });
};

module.exports = addRemoveSongEvents;

},{"./addSong":1}],3:[function(require,module,exports){
"use strict";


var populateArtist = function(artistList) {
for (let i = 0; i < artistList.length; i++){
  $("#artistList").append(
      `<option value="${artistList[i].replace(/ /g, "")}"> ${artistList[i]} </option>`
    );
  }
};

var populateAlbum = function(albumList) {
  for (let i = 0; i < albumList.length; i++){
  $("#albumList").append(
      `<option value="${albumList[i].replace(/ /g, "")}"> ${albumList[i]} </option>`
    );
  }
};

var populateGenre = function(genreList) {
  for (let i = 0; i < genreList.length; i++){
    $("#genreList").append(
      `<option value="${genreList[i].replace(/ /g, "")}"> ${genreList[i]} </option>`
    );

    $("#genreDiv").append(`
      <div class="genre">
        <input type="radio" name="genre" class="genre" value="${genreList[i].replace(/ /g, "")}">
        <label class="lineOfGenre" for="${genreList[i]}">${genreList[i]}</label>
      </div>`
    );
  }
};

var addFiltering = function () {
  $("#filterButton").click(function() {
    var filteredArtist = $("#artistList :selected").val();
    var filteredAlbum = $("#albumList :selected").val();
    var filteredGenre = $("#genreDiv :checked").val();

    var songs = $(".showAll");

    songs.children().addClass('hidden');

    songs.each(function () {
      if(($(this).hasClass(`${filteredArtist}`) || ($(this).hasClass(`${filteredAlbum}`)) || ($(this).hasClass(`${filteredGenre}`)))){
        $(this).children().removeClass('hidden');
      }
    });
  });
};
module.exports = {populateArtist, populateAlbum, populateGenre, addFiltering};


},{}],4:[function(require,module,exports){
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



},{"./events":2,"./filtering":3}]},{},[4]);
