// Write a program to demonstrate the concept of Query.
// ¡. Create three buttons with labels red, green, blue, when the mouse is moved over it, the background color has to be changed respectively.
// il. Create a HTML page holding a list of items and an [Extract Text] button.
// Implement the extractText function which will be called when the button's onClick event is fired.
// ill, Create a HTML page that holds a list of towns, a search box and a [Search] button.
// Implement the search function to bold the items from the list which include the text from the search box.
// iv. Disable/enable the form submit button.Disable the submit button until the visitor has clicked a check box.
// v. Distinguish between left and right mouse click.
// vi. Remove style added with .css() function.

// make a promsed Alert
function Alert(message) {
  return new Promise((resolve) => {
    alert(message);
    resolve();
  });
}

function preventDefault(e) {
  e.preventDefault();
}

$(document).ready(function () {
  // Background Color Change on Hover
  $("button.red").hover(function () {
    $("body").css("background-color", "red");
  });
  $("button.green").hover(function () {
    $("body").css("background-color", "green");
  });
  $("button.blue").hover(function () {
    $("body").css("background-color", "blue");
  });

  // Extract Text from List
  $("#extract").click(function () {
    var items = [];
    $("#list li").each(function () {
      items.push($(this).text());
    });
    Alert(items.join(", "));
  });

  // Search in List
  $("#search-btn").click(function () {
    var search = $("#search").val().toLocaleLowerCase().trim();
    console.log(`whyyy  ${search}`);
    $("#towns li").each(function () {
      if ($(this).text().toLocaleLowerCase().trim().indexOf(search) != -1) {
        $(this).css("font-weight", "bold");
        console.log(`found`);
      } else {
        $(this).css("font-weight", "normal");
      }
    });
  });

  // Disable Submit Button
  $("#submit").attr("disabled", "disabled");
  $("#check").click(function () {
    if ($(this).is(":checked")) {
      $("#submit").removeAttr("disabled");
    } else {
      $("#submit").attr("disabled", "disabled");
    }
  });

  // Left and Right Click
  $("body").click(function (e) {
    if ($("#mouse-click-disable").is(":checked")) {
      if (e.which == 1) {
        Alert("Left Click");
      } else if (e.which == 3) {
        Alert("Right Click");
      }
    }
  });

  // Remove Style
  $("#remove-css-btn").click(function () {
    $("*").removeClass();
    $("p").css("color", "");
    $("body").css("background-color", "white");
  });

  // Add Style
  $("#add").click(function () {
    $("p").css("color", "red");
  });

  // Toggle Style
  $("#toggle").click(function () {
    $("p").css("color", function (index, value) {
      if (value == "red") {
        return "";
      } else {
        return "red";
      }
    });
  });
});
