
//beginning array of heroes
var heroes = ["Spider-man", "Batman", "Superman", "Iron Man", "Wonder Woman", "Aquaman", "Black Widow", "Captain America", "Thor", "Scarlet Witch", "Catwoman", "Hulk", "Deadpool", "Black Canary", "Gamora", "Groot"];

//function to add a hero
function showHero() {

    
    var hero = $(this).attr("data-name");

    //add the api key and the search criteria to the queryURL
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=owjTQC0BsgQZpHL22pZDVTyHLvfVcrGS&limit=10&offset=0"

    //the API call using ajax
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

    console.log(response);

    //for loop to go through the data and pull the images, rating and title (bonus)
    for (var k = 0; k < 10; k++) {
        var tenGIFs = response.data[k].images.original.url;
        var tenGIFsPaused = response.data[k].images.original_still.url;
        var tenRatings = response.data[k].rating;
        var title = response.data[k].title;

        //writing all the info above to the gif view div. Prepend so the giphys show up on top of the old ones.
        $("#gif-view").prepend("<img src=" + tenGIFsPaused + " class='gif' data-still=" + tenGIFsPaused + " data-animate=" + tenGIFs + " data-state='still'>").prepend("<p id='ratingDiv'> Rating: " + tenRatings + "</p>").prepend("<p id='titleDiv'> Title: " + title + "</p>");
        
    }
    //click event for the GIF to animate/pause
    $(".gif").on("click", function(event) {
        event.preventDefault();
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });
    });

};

//function to make the array into buttons, as well as new buttons
function makeButtons() {

    //delete old buttons
    $("#buttons").empty();

    // For loop for hero array
    for (var i = 0; i < heroes.length; i++) {

      //variable for the button
      var a = $("<button>");
      // Adding a class of hero-btn
      a.addClass("hero-btn");
      //Adding a data-attribute, setting it to be the name of the hero
      a.attr("data-name", heroes[i]);
      //Button text (using array name)
      a.text(heroes[i]);
      //Adding the button to the div
      $("#buttons").append(a);

    }
}

//on click event to add new hero
$("#add-hero").on("click", function(event) {
event.preventDefault();

var hero = $("#hero-input").val();

//Adding the hero to the array
heroes.push(hero);

//Calling the function
makeButtons();
});

//Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".hero-btn", showHero);

// Calling the makeButtons function to display the intial buttons
makeButtons();

