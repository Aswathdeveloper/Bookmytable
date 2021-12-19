const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.sold)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const typeofseatSelect = document.getElementById("typeofseat");



populateUI();

let ticketPrice = +typeofseatSelect.value;


function setMovieData(seatIndex, seatPrice) {
  localStorage.setItem("selectedseatIndex", seatIndex);
  localStorage.setItem("selectedseatPrice", seatPrice);
}


function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

  setMovieData(typeofseatSelect.selectedIndex, typeofseatSelect.value);
}



function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedseatIndex = localStorage.getItem("selectedseatIndex");

  if (selectedseatIndex !== null) {
    typeofseatSelect.selectedIndex = selectedseatIndex;
  }
}


typeofseatSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('sold')
  ) {
    e.target.classList.toggle('selected');
    
    
    updateSelectedCount();
  }
});



function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");}


updateSelectedCount();
