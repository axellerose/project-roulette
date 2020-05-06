// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let start = document.querySelector("#start-btn");

// When the user clicks the button, open the modal 

function showModule () {
    modal.style.display = "block";
    document.querySelector(".main").style.display = "none";
}

// When the user clicks on <span> (x), close the modal
start.onclick = function() {
  modal.style.display = "none";
  document.querySelector(".main").style.display = "flex";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "block";
  }
};

function changeName() {
    player.name = document.querySelector("#player-name-input").value;
    let name = document.querySelector(".playerName");
    name.innerHTML = player.name;
}
function changeBalance() {
    player.balance = document.querySelector("#player-balance-input").value;
    let money = document.querySelector(".playerbalance");
    playerBalance.innerHTML = player.balance;
}