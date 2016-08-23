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
