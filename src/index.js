import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

import BikeService from './service';

// Function to display stolen bike details
function displayStolen(i, response) {
  const bikesCount = response.bikes.length;
  console.log(response);
  if (bikesCount === 0) {
    // Handle the case when there are no stolen bikes
    document.querySelector("img#bikeImage").src = 'placeholder-image.jpg';
    document.querySelector("span#dateStolen").innerText = 'No stolen bikes found.';
    return;
  }
  // Calculate the index considering the loop
  i = i % bikesCount;

  // Set bike image
  if(response.bikes[i].large_img === null) {
    document.querySelector("img#bikeImage").src = "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
  } else {
    document.querySelector("img#bikeImage").src = response.bikes[i].large_img;
  }

  // Set stolen date
  const timestamp = response.bikes[i].date_stolen;
  const date = new Date(timestamp * 1000);
  const formattedDate = date.toLocaleString();
  document.querySelector("span#dateStolen").innerText = formattedDate;
}

function printStolenBike(response) {
  let i = 0;
  displayStolen(i, response);

  // "Next" button displays next stolen bike
  document.querySelector("button#nextStolen").addEventListener("click", (e) => {
    e.preventDefault();
    i++; // Increment index
    displayStolen(i, response);
  });
}

// Function to print bike statistics
function printBikeStats(response) {
  const bikeStats = document.querySelector("div#bikeStats");
  bikeStats.innerHTML = '';

  bikeStats.innerHTML += "Name: " + response.bike.title + "<br>";
  bikeStats.innerHTML += "Description: " + response.bike.description + "<br>";
  bikeStats.innerHTML += "Serial #: " + response.bike.serial + "<br>";
  bikeStats.innerHTML += "Stolen: " + response.bike.stolen + "<br>";
  bikeStats.innerHTML += "Ownership: " + response.bike.status + "<br>";
}
async function getBikeDetails(id) {
  // Call the BikeService to get bike details
  const response = await BikeService.getBikeDetails(id);

  if (!response) {
    window.alert("Error");
  } else {
    printBikeStats(response);
  }
}

async function getStolenBike(location) {
  // Call the BikeService to get stolen bike details
  const response = await BikeService.getStolenBike(location);

  if (!response) {
    window.alert("Error");
  } else {
    printStolenBike(response);
  }
}

// Event handler for Bike Search form
function handleBikeSearch(e) {
  e.preventDefault();
  let id = document.querySelector("input#bikeID").value;
  getBikeDetails(id);
}

// Event handler for Stolen Bike form
function handleStolenBike(e) {
  e.preventDefault();
  let location = document.querySelector("input#stolenArea").value;
  getStolenBike(location);
}

window.addEventListener("load", () => {
  // Select forms for bike and stolen bike searches
  const formBikeStats = document.querySelector("form#bikeSearch");
  const formStolenBikes = document.querySelector("form#stolenSearch");

  // Add event listeners for form submissions
  formBikeStats.addEventListener("submit", handleBikeSearch);
  formStolenBikes.addEventListener("submit", handleStolenBike);
});