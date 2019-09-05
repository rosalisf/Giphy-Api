$("#searchgifs").on("click", function() {
  let input = $(".form-control").val();
  console.log(input);

  let newButton = $("<button>");
  newButton.prepend(input);
  newButton.attr("class", "btn btn-outline-primary");
  newButton.attr("data-person", input);
  newButton.attr("data-state", "animate");

  $("#oldbuttons").append(newButton);

  newButton.on("click", buttonPress);
});
$("button").on("click", buttonPress);

function buttonPress() {
  $("#gif-section").empty();
  const person = $(this).attr("data-person");
  const queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    person +
    "&api_key=E1zsyf6xVP2cq9m4VOOms0qR9GRNd9qH";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    const results = response.data;

    for (let i = 0; i < results.length; i++) {
      let gifDiv = $("<div>");

      const rating = results[i].rating;

      const p = $("<p>").text("Rating: " + rating);

      let personImage = $("<img>");
      personImage.attr("src", results[i].images.fixed_height.url);
      personImage.attr(
        "data-state",
        "data-still",
        results[i].images.fixed_height_still.url
      );
      personImage.attr(
        "data-state",
        "data-animate",
        results[i].images.fixed_height.url
      );
      personImage.attr("class", "gif");

      gifDiv.prepend(p);
      gifDiv.prepend(personImage);

      $("#gif-section").prepend(gifDiv);
    }
  });
}

$(".gif").click(function() {
  let state = $(this).attr("data-state");
  console.log(state);

  if (state === "animate") {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  }
});
