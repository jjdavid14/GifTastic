// Initial array of animals
var topics = ["dog", "cat", "rabbit", "bird", "lion", "ferret", "hamster", "turtle", "chinchilla", "hermit crab", "chicken", "frog"];

// displayAnimalInfo function re-renders the HTML to display the appropriate content
function displayAnimalInfo() {

  var APIKey = "1wUbiGRUlnQhtwvI5hy4FjwE8zg5Hks9";
  var animal = $(this).attr("data-name");
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal +"&api_key=" + APIKey + "&limit=10";

  // Creating an AJAX call for the specific animal button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {

    // Get the array that holds the images returned by the response
    var responseArr = response.data;

    // Create a div that will hold all the images
    var mainDiv = $("<div>").addClass("mt-4 text-center");

    // Loop through all the images returned by the response
    for(var i = 0; i < responseArr.length; i++) {
    // Creating a div to hold the animal
    var animalDiv = $("<div class='animal mx-3 my-2 p-3'>");

    // Storing the rating data
    var rating = responseArr[i].rating;

    // Creating an element to have the rating displayed
    var pOne = $("<p>").text("Rating: " + rating);

    // Displaying the rating
    animalDiv.append(pOne);

    // Retrieving the URL for the image
    var imgURL = responseArr[i].images['downsized_still'].url;
    var gifURL = responseArr[i].images['downsized'].url;

    // Creating an element to hold the image
    var image = $("<img>").attr("src", imgURL);
    image.addClass("animal-image");
    // When image is clicked it will toggle the animation on or off
    image.attr("onclick", "toggleGif(this)");
    // This will hold the url for the still image
    image.attr("data-still", imgURL);
    // This will hold the url for the animated gif
    image.attr("data-gif", gifURL);
    // Holds the state of the image
    image.attr("data-attribute", "stopped");

    // Appending the image
    animalDiv.append(image);

    // Putting the entire animal gif inside its own div
    mainDiv.append(animalDiv);
    }

    // Replace the html with the div containing all the animal gifs
    $("#animals-view").html(mainDiv);
  });

}

// Toggles the animation of the image
function toggleGif(res) {
  // Get the current state of the image
  var status = $(res).attr("data-attribute");

  // If it is not playing
  if(status === "stopped") {
    $(res).attr("data-attribute", "playing");
    var gifURL = $(res).attr("data-gif");
    $(res).attr("src", gifURL);
  }
  // If it is playing 
  else {
    $(res).attr("data-attribute", "stopped");
    var imgURL = $(res).attr("data-still");
    $(res).attr("src", imgURL);
  }
}

// Function for displaying animal data
function renderButtons() {

  // Deleting the animals prior to adding new animals
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of animals
  for (var i = 0; i < topics.length; i++) {

    // Then dynamicaly generating buttons for each animal in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>").addClass("btn btn-info mx-2 mb-2");
    // Adding a class of animal to our button
    a.addClass("animal-btn");
    // Adding a data-attribute
    a.attr("data-name", topics[i]);
    // Providing the initial button text
    a.text(topics[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where an animal button is clicked
$("#add-animal").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var animal = $("#animal-input").val().trim();

  // Adding animal from the textbox to our array
  topics.push(animal);

  // Calling renderButtons which handles the processing of our topics array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "animal-btn"
$(document).on("click", ".animal-btn", displayAnimalInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();