
//beginning array of heroes
var heroes = ["Spider-man", "Batman", "Superman", "Iron Man", "Wonder Woman", "Aquaman", "Black Widow", "Captain America", "Thor", "Scarlet Witch", "Catwoman", "Hulk", "Deadpool", "Black Canary", "Gamora", "Groot"];

//function to add a hero
function showHero() {

    
    var hero = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=owjTQC0BsgQZpHL22pZDVTyHLvfVcrGS&limit=10&offset=0"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

    console.log(response);

    for (var k = 0; k < 10; k++) {
        var tenGIFs = response.data[k].images.original.url;
        var tenRatings = response.data[k].rating;
        var title = response.data[k].title;

        $("#gif-view").prepend("<img src=" + tenGIFs + ">").prepend("<p id='ratingDiv'> Rating: " + tenRatings + "</p>").prepend("<p id='titleDiv'> Title: " + title + "</p>");
    }

    
    });

};

function makeButtons() {

    //delete old buttons
    $("#buttons").empty();

    // For loop for hero array
    for (var i = 0; i < heroes.length; i++) {

      var a = $("<button>");
      // Adding a class of hero-btn to our button
      a.addClass("hero-btn");
      // Adding a data-attribute
      a.attr("data-name", heroes[i]);
      // Providing the initial button text
      a.text(heroes[i]);
      // Adding the button to the buttons-view div
      $("#buttons").append(a);

    }
}

$("#add-hero").on("click", function(event) {
event.preventDefault();

var hero = $("#hero-input").val();

// Adding movie from the textbox to our array
heroes.push(hero);

// Calling makeButtons which handles the processing of the hero array
makeButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".hero-btn", showHero);

// Calling the makeButtons function to display the intial buttons
makeButtons();

