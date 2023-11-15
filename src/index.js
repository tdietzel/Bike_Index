import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BikeService from './service';

function displayStolen(i, response) {
  // sets bike image
  document.querySelector("img#bikeImage").src = response.bikes[i].large_img;

  // sets stolen date
  const timestamp = response.bikes[i].date_stolen;
  const date = new Date(timestamp * 1000);
  const formattedDate = date.toLocaleString();
  document.querySelector("span#dateStolen").innerText = formattedDate;
}

function printStolenBike(response) {
  let i = 0;
  displayStolen(i, response);

  // increments through stolen bikes from next button
  document.querySelector("button#nextStolen").addEventListener("click", (e) => {
    e.preventDefault();
    i++;
    displayStolen(i, response);
  });
}

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
  const response = await BikeService.getBikeDetails(id);
  if(!response) {
    window.alert("Error");
  } else {
    printBikeStats(response);
  }
}
async function getStolenBike(location) {
  const response = await BikeService.getStolenBike(location);
  if(!response) {
    window.alert("Error");
  } else {
    printStolenBike(response);
  }
}

function handleBikeSearch(e) {
  e.preventDefault();
  let id = document.querySelector("input#bikeID").value;
  getBikeDetails(id);
}

function handleStolenBike(e) {
  e.preventDefault();
  let location = document.querySelector("input#stolenArea").value;
  getStolenBike(location);
}

window.addEventListener("load", () => {
  const formBikeStats = document.querySelector("form#bikeSearch");
  const formStolenBikes = document.querySelector("form#stolenSearch");
  formBikeStats.addEventListener("submit", handleBikeSearch);
  formStolenBikes.addEventListener("submit", handleStolenBike);
});
//   BikeService.getStolenBike(id);
// .then((response) => {
//   displayBikeInfo(response);
// })
// .catch((error) => {
//   console.error(error);
// });