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
