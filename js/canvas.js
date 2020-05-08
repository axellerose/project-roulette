const canvas = document.getElementById("roulette");

var colors = [
    "#ff6b6b", "#222f3e", "#2e86de",
    "#ff6b6b", "#222f3e", "#2e86de",
    "#ff6b6b", "#222f3e", "#2e86de",
    "#ff6b6b", "#222f3e", "#2e86de",
    "#ff6b6b", "#222f3e", "#2e86de",
    "#ff6b6b", "#222f3e", "#2e86de",
    "#ff6b6b", "#222f3e", "#ff9f43",
    "#ff6b6b", "#222f3e", "#2e86de",
    "#ff6b6b", "#222f3e", "#2e86de",
    "#ff6b6b", "#222f3e", "#2e86de",
    "#ff6b6b", "#222f3e", "#2e86de",
    "#ff6b6b", "#222f3e", "#2e86de",
];

let player = new Player("Daniel Ocean", 1000);

let playerName = document.querySelector(".playerName");
playerName.innerHTML = player.name; //show name
let playerBalance = document.querySelector(".balance span");
playerBalance.innerHTML = player.balance; //show balance

let userInput = document.getElementById('userInput'); //set user input limits
userInput.setAttribute("max",player.balance);

let startAngle = 0;
let arc = Math.PI / 18;

function drawRouletteWheel() {
    const ctx = canvas.getContext("2d");
    let outsideRadius = 200;
    let insideRadius = 0;
    ctx.clearRect(0,0,500,500);
    ctx.strokeStyle = "#222f3e";
    ctx.lineWidth = 2;
    
    
    for (let i = 0; i < 36; i++){
        let angle = startAngle + i * arc;
        ctx.fillStyle = colors[i];

        ctx.beginPath();
        ctx.arc(250, 250, outsideRadius, angle, angle + arc);
        ctx.arc(250, 250, insideRadius, angle, angle + arc);   
        ctx.stroke();
        ctx.fill();
    }
    let logoImg = document.querySelector("#logo");
    ctx.drawImage(logoImg, 250 - 100, 250 - 100, 200, 200);
    //Draw Triangle
    ctx.fillStyle = "#c8d6e5";
    ctx.beginPath();
    ctx.moveTo(250 - 25, 250 - (outsideRadius + 25));
    ctx.lineTo(250 + 25, 250 - (outsideRadius + 25));
    ctx.lineTo(250 + 0, 250 - (outsideRadius - 25));
    ctx.lineTo(250 - 25, 250 - (outsideRadius + 25));
    ctx.fill();
}

function onPlayClick() {
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3 + 4 * 1000;
    rotateWheel();
    disablePlayButton();
    enableBetButton();
}

function rotateWheel(){
    spinTime += 30;
    if(spinTime >= spinTimeTotal) {
      stopRotateWheel();
      return;
    }
    var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawRouletteWheel();
    spinTimeout = setTimeout('rotateWheel()', 30);
}

function stopRotateWheel() {
    clearTimeout(spinTimeout);
    //Calculate sectorIndex
    var degrees = startAngle * 180 / Math.PI + 90;
    var arcd = arc * 180 / Math.PI;
    var sectorIndex = Math.floor((360 - degrees % 360) / arcd);
    console.log(sectorIndex);
    showResult(sectorIndex);
    checkWinner(sectorIndex);
}
 
function easeOut(t, b, c, d) {
    var ts = (t/=d)*t;
    var tc = ts*t;
    return b+c*(tc + -3*ts + 3*t);
}
//How to not hardcode here? Use switch
function showResult(index){
    let result = document.querySelector(".result");
    switch (colors[index]) {
        case "#222f3e":
            result.innerHTML = "Winner sector is: BLACK";
            break;
        case "#ff6b6b":
            result.innerHTML = "Winner sector is: RED";
            break;
        case "#2e86de":
            result.innerHTML = "Winner sector is: BLUE";
            break;
        case "#ff9f43":
            result.innerHTML = "Winner sector is: GOLD";
            break;
        default:
            document.querySelector(".bet").innerHTML = "Make a new bet and press PLAY";
        }

    }

//Check if two colors are the same
function checkWinner(index){
    if (colors[index] == player.colorChosen){
        //Add points
        if (player.colorChosen == "#222f3e" || player.colorChosen == "#ff6b6b") {
             player.balance += player.betMade * 2;
             playerBalance.innerHTML = player.balance;
        } else if (player.colorChosen == "#2e86de") {
            player.balance += player.betMade * 5;
            playerBalance.innerHTML = player.balance;
        } else if (player.colorChosen == "#ff9f43") {
            player.balance += player.betMade * 50;
            playerBalance.innerHTML = player.balance; 
        }
        showImgWin();
    } else {

        if (player.balance <= 0){
            let playButton = document.querySelector("#play-btn");
            playButton.remove();
        }
        showImgLose();
    }
    userInput.setAttribute("max",player.balance); //Reset bet status
}

let imgWin = document.getElementById("win");
let main = document.querySelector(".main");
let bottom = document.querySelector(".bottom");
let imgLose = document.getElementById("lose");

function showImgWin(){
    bottom.style.display = "none";
    main.style.display = "none";
    imgWin.style.display = "flex";
    setTimeout("hideWin()", 5000);
}

function hideWin(){
    main.style.display = "flex";
    bottom.style.display = "flex";
    imgWin.style.display = "none";
}

function showImgLose(){
    bottom.style.display = "none";
    main.style.display = "none";
    imgLose.style.display = "flex";
    setTimeout("hideLose()", 5000);
}
function hideLose(){
    main.style.display = "flex";
    bottom.style.display = "flex";
    imgLose.style.display = "none";
}

document.getElementById('bet-btn').addEventListener('click', userInput, false);
  //add event listener to prevent keyboard entry
  const mouseOnlyNumberInputField = document.querySelector(".mouse-only-number-input");
  mouseOnlyNumberInputField.addEventListener("keypress", (event) => {
    event.preventDefault();
  });

window.addEventListener("load", event => {
    drawRouletteWheel();
    disableColorButtons();
    disablePlayButton();
    enableBetButton();
    pauseMusic();
    showModule();
});
