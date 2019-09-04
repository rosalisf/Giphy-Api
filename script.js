function getData() {
  let input = $(".form-control").val();
}

$("button").on("click", function() {
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

      gifDiv.prepend(p);
      gifDiv.prepend(personImage);

      $("#gif-section").prepend(gifDiv);
    }
  });
});
