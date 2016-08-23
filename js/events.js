$(".showAddMusic").click(function () {
  $("#addMusicField").toggleClass('hidden');
  $("#mainContainer").toggleClass('hidden');
});

$("#addSong").click(function () {
  if (!($("#addSongName").val()) || !($("#addArtistName").val()) || !($("#addAlbumName").val())) {
    alert("You have to input a new song!")
  } else {

  makeNewSong();
  }
});

$(document).ready(function() {
  $(".removeSong").click(function (event) {
	  var self = (event.target);
	  var selfParents = $(self).parents("div.songInfo");
    $(selfParents).remove();
  });
})
