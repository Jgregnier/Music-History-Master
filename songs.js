$("#showAddMusic").click(function () {
  $("#addMusicField").toggleClass('hidden');
  $("#mainContainer").toggleClass('hidden');
});

var songList = $.ajax("songList.json").done(function () {
  console.log(songList.responseJSON);
  songArray = songList.responseJSON;

  for(var i = 0; i < songArray.length; i++) {

    $("#songList").append(
		  `<div class="songInfo">
		    <h1 class="songName"> ${songArray[i].songName} </h1>
		      <div class="row">
		        <ul>
		          <div class="col-sm-1"> </div>
		          <li class="artistName col-sm-3"> ${songArray[i].artist}</li>
		          <li class="albumName col-sm-3"> ${songArray[i].album} </li>
		          <li class="genreSongInfo col-sm-3"> ${songArray[i].genre} </li>
		        </ul>
		      </div>
		  </div>`);

    $("#artistList").append(
    	`<option value:"${songArray[i].artist}"> ${songArray[i].artist} </option>`
    	);

    $("#albumList").append(
    	`<option value:"${songArray[i].album}"> ${songArray[i].album} </option>`
      )
  }
})
