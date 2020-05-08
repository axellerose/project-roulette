let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let start = document.querySelector("#start-btn");

function showModule () {
    modal.style.display = "block";
    document.querySelector(".main").style.display = "none";
}

start.onclick = function() {
  modal.style.display = "none";
  document.querySelector(".main").style.display = "flex";
};

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