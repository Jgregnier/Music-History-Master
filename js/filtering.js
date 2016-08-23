"use strict";


var populateArtist = function(artistList) {
for (let i = 0; i < artistList.length; i++){
  $("#artistList").append(
      `<option value:"${artistList[i]}"> ${artistList[i]} </option>`
    );
  }
};

var populateAlbum = function(albumList) {
  for (let i = 0; i < albumList.length; i++){
  $("#albumList").append(
      `<option value:"${albumList[i]}"> ${albumList[i]} </option>`
    );
  }
};

var populateGenre = function(genreList) {
  for (let i = 0; i < genreList.length; i++){
    $("#genreList").append(
      `<option value:"${genreList[i]}"> ${genreList[i]} </option>`
    );

    $("#genreDiv").append(`
      <div class="genre">
        <input type="radio" name="genre" class="genre" value="${genreList[i]}">
        <label class="lineOfGenre" for="${genreList[i]}">${genreList[i]}</label>
      </div>`
    );
  }
};

var addFiltering = function () {
  $("#filterButton").click(function(){

  });
};

module.exports = {addFiltering, populateArtist, populateAlbum, populateGenre};
