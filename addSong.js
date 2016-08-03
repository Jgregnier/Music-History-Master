$("#addSong").click(function () {
  if (!($("#addSongName").val()) || !($("#addArtistName").val()) || !($("#addAlbumName").val()) || !($("#addGenreName").val())) {
 	  alert("You have to input a new song!")

  } else {
  makeNewSong();
  }

});

var makeNewSong = function () {

var getSongList = $.ajax("songList.json").done(function () {

  var songs = songList.responseJSON;

  var addSongName = $("#addSongName").val();
  var addArtistName = $("#addArtistName").val();
  var addAlbumName =  $("#addAlbumName").val();
  var addGenreName =  $("#addGenreName").val();

	console.log("Your function runs!!11");

  $("#songList").append(
      `<div class="songInfo">
        <h1 class="songName"> ${addSongName} </h1>
          <div class="row">
            <ul>
              <div class="col-sm-1"> </div>
              <li class="artistName col-sm-3"> ${addArtistName}</li>
              <li class="albumName col-sm-3"> ${addAlbumName} </li>
              <li class="genreSongInfo col-sm-3"> ${addGenreName} </li>
            </ul>
          </div>
        </div>`);

  $("#addSongName").val("");
  $("#addArtistName").val("");
  $("#addAlbumName").val("");
  $("#addGenreName").val("");

 })
}

//Adding to JSON eventally
  // $(songs).append(
  //   `,{ "songName"  : ${addSongName},
  //       "artist"    : ${addArtistName},
  //       "album"     : ${addAlbumName},
  //       "genre"     : ${addGenreName}
  //    });
