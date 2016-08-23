
var songArray = [];

var songList = $.ajax("songList.json").done(function () {

  songArray = songList.responseJSON;

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
})
