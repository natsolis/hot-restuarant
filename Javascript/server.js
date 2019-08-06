// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3075;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var tablelist=[

]

var waitlist=[

]

  //url routes

  // Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../index.html"));
  });
  
app.get("/reservation.html", function(req, res) {
    res.sendFile(path.join(__dirname, "../reservation.html"));

    $(".submit").on("click", function(event) {
      event.preventDefault();
      // Here we grab the form elements
      var newReservation = {
        customerName: $("#reserve-name").val().trim(),
        phoneNumber: $("#reserve-phone").val().trim(),
        customerEmail: $("#reserve-email").val().trim(),
        customerID: $("#reserve-unique-id").val().trim()
      };

      $.post("/api/tablelist", newReservation,
     function(data) {
       // If a table is available... tell user they are booked.
       if (data) {
         alert("Yay! You are officially booked!");
       }
       // If a table is not available... tell user they on the waiting list.
       else {
         alert("Sorry you are on the wait list");
       }
       // Clear the form when submitting
       $("#reserve-name").val("");
       $("#reserve-phone").val("");
       $("#reserve-email").val("");
       $("#reserve-unique-id").val("");
     });

    });

  });

app.get("/table.html", function(req, res) {
    res.sendFile(path.join(__dirname, "../table.html"));

    function runWaitListQuery() {

      // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
      $.ajax({ url: "/api/waitlist", method: "GET" })
        .then(function(waitData) {
  
          // Here we then log the waitlistData to console, where it will show up as an object.
          console.log(waitData);
          console.log("------------------------------------");
  
          // Loop through and display each of the customers
          for (var i = 0; i < waitData.length; i++) {
  
            // Get a reference to the waitList element and populate it with tables
            var waitList = $("#waitList");
  
            // Then display the fields in the HTML (Section Name, Date, URL)
            var listItem = $("<li class='list-group-item mt-4'>");
  
            listItem.append(
              $("<h2>").text("Table #" + (i + 1)),
              $("<hr>"),
              $("<h2>").text("ID: " + waitData[i].customerID),
              $("<h2>").text("Name: " + waitData[i].customerName),
              $("<h2>").text("Email: " + waitData[i].customerEmail),
              $("<h2>").text("Phone: " + waitData[i].phoneNumber)
            );
  
            waitList.append(listItem);
          }
        });
    }


  });
  

  app.post("/api/tablelink", function(req, res) {
    return res.json(tablelist);
  });
  
 
  app.post("/api/tablelist", function(req, res) {
    return res.json(tablelist);
  });

  app.post("/api/waitlist", function(req, res) {
    return res.json(waitlist);
  });

  app.delete("/api/clearlist", function(req, res) {

    tablelist=[];
    waitlist=[];
    
  });
  

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });