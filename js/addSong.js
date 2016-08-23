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
