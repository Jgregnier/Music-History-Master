"use strict";


var populateArtist = function(artistList) {
for (let i = 0; i < artistList.length; i++){
  $("#artistList").append(
      `<option value="${artistList[i].replace(/ /g, "")}"> ${artistList[i]} </option>`
    );
  }
};

var populateAlbum = function(albumList) {
  for (let i = 0; i < albumList.length; i++){
  $("#albumList").append(
      `<option value="${albumList[i].replace(/ /g, "")}"> ${albumList[i]} </option>`
    );
  }
};

var populateGenre = function(genreList) {
  for (let i = 0; i < genreList.length; i++){
    $("#genreList").append(
      `<option value="${genreList[i].replace(/ /g, "")}"> ${genreList[i]} </option>`
    );

    $("#genreDiv").append(`
      <div class="genre">
        <input type="radio" name="genre" class="genre" value="${genreList[i].replace(/ /g, "")}">
        <label class="lineOfGenre" for="${genreList[i]}">${genreList[i]}</label>
      </div>`
    );
  }
};

var addFiltering = function () {
  $("#filterButton").click(function() {
    var filteredArtist = $("#artistList :selected").val();
    var filteredAlbum = $("#albumList :selected").val();
    var filteredGenre = $("#genreDiv :checked").val();

    var songs = $(".showAll");

    songs.children().addClass('hidden');

    songs.each(function () {
      if(($(this).hasClass(`${filteredArtist}`) || ($(this).hasClass(`${filteredAlbum}`)) || ($(this).hasClass(`${filteredGenre}`)))){
        $(this).children().removeClass('hidden');
      }
    });
  });
};
module.exports = {populateArtist, populateAlbum, populateGenre, addFiltering};

