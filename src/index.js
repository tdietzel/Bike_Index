import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BikeService from './service';

async function getStolenBike(id) {
  const response = await BikeService.getStolenBike(id);
  let bikeTitle = document.querySelector("p#bikeTitle");
  if(!response) {
    window.alert("Error");
  } else {
    bikeTitle.innerHTML = response.bike.title;
    console.log(response);
  }
}

function handleBikeSearch(e) {
  e.preventDefault();
  let id = document.querySelector("input#bikeID").value;
  getStolenBike(id);

//   BikeService.getStolenBike(id);
// .then((response) => {
//   displayBikeInfo(response);
// })
// .catch((error) => {
//   console.error(error);
// });
}

window.addEventListener("load", () => {
  const form = document.querySelector("form#bikeSearch");
  form.addEventListener("submit", handleBikeSearch);
});