// Wait for the DOM to be ready
$(document).ready(function () {
  // Attach "change" event listener to "select A" element
  $("#select-a").change(function () {
    // Get the selected option value
    var selectedOption = $(this).val();

    // Make an AJAX request to retrieve data based on selected option
    $.ajax({
      url: "getData.php", // Replace with your server-side script to retrieve data
      type: "GET",
      data: { category: selectedOption }, // Pass the selected option value as a parameter
      dataType: "json", // Replace with the data type of the response
      success: function (response) {
        // Clear the "list box"
        $("#list-box").empty();

        // Populate the "list box" with the retrieved data
        $.each(response, function (index, item) {
          $("#list-box").append("<li>" + item + "</li>");
        });
      },
      error: function (xhr, status, error) {
        // Handle any errors that occur during the AJAX request
        console.log("Error:", error);
      },
    });
  });
  $("#select-b").change(function () {
    // Get the selected option value
    var selectedOption = $(this).val();

    // Make an AJAX request to retrieve data based on selected option
    $.ajax({
      url: "getData.php", // Replace with your server-side script to retrieve data
      type: "GET",
      data: { category: selectedOption }, // Pass the selected option value as a parameter
      dataType: "json", // Replace with the data type of the response
      success: function (response) {
        // Clear the "list box"
        $("#list-box").empty();

        // Populate the "list box" with the retrieved data
        $.each(response, function (index, item) {
          $("#list-box").append("<li>" + item + "</li>");
        });
      },
      error: function (xhr, status, error) {
        // Handle any errors that occur during the AJAX request
        console.log("Error:", error);

        $("#list").append("<li>" + `error:` + error + "</li>");
      },
    });
  });
});
