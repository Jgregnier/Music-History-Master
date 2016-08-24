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
