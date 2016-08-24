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
