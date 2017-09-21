$(document).ready(function(){
  console.log("ready!")

  var myAnimals = ["cat", "dog", "monkey", "starfish", "bunny", "wolve", "snake", "hamster", "bear", "duck"];
// display animal gif
  function displayGIF() {

    $("#animals").empty();

    var animal = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response){
        console.log("ready again!")
        console.log(response)

        var results = response.data

          for(var i = 0; i < results.length; i++){

            var animalGif = $("<div class='gifme'>");

            var rating = results[i].rating
              var pRating = $("<p>").text("Rating: " + rating);
                animalGif.append(pRating)

            // images
            var image = $("<img>");

            image.attr("data-still", results[i].images.fixed_height_still.url)
            image.attr("data-animate", results[i].images.fixed_height.url)
            image.attr("data-state", "still")
            image.addClass("gifff")
            image.attr("src", results[i].images.fixed_height_still.url)

            animalGif.append(image)
            $("#animals").prepend(animalGif);

            }
        });
    };

  // animation click
  $(document).on("click", ".gifff", function(){
    var state = $(this).attr("data-state")

    var newState = (state === "still")? "animate" : "still"

    var animateImg = $(this).attr("data-" + newState)

    $(this).attr("src", animateImg)
    $(this).attr("data-state", newState)
  });

// function to display animal data input
  function renderButtons(){
    $("#animal-slots").empty();

    for (var i = 0; i < myAnimals.length; i++){
      var a = $("<button>");
      a.addClass("each-animal");
      a.attr("data-name", myAnimals[i]);
      a.text(myAnimals[i]);
      $("#animal-slots").append(a);
    };
  };
// add new animal buttons after submit click
  $("#add-animal").on("click", function(event){
    event.preventDefault();

    var animal = $("#animal-input").val().trim();

    myAnimals.push(animal);

    renderButtons();
    $("#animal-input").val("")
  })

  $(document).on("click", ".each-animal", displayGIF);

  renderButtons();

});
