/*
blue - #2e86de;
red - #ff6b6b;
black - #222f3e;
gold - #ff9f43
*/
const canvas = document.getElementById("roulette");
//Array of objects ???
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
// Set up new player
let player = new Player("Player One", 1500);
let playerName = document.querySelector(".playerName");
playerName.innerHTML = player.name; //show name
let playerBalance = document.querySelector(".balance span");
playerBalance.innerHTML = player.balance; //show balance

//Set userInput limits
let userInput = document.getElementById('userInput')
userInput.setAttribute("max",player.balance);


let startAngle = 0;
let arc = Math.PI / 18;
let logoImg = document.querySelector("#logo");

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
    //Calculate sectorIndex of a sector
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
    if (colors[index] == "#222f3e") {
        result.innerHTML = "Winner sector is: BLACK";
    } else if (colors[index] == "#ff6b6b") {
        result.innerHTML = "Winner sector is: RED";
    } else if (colors[index] == "#2e86de") {
        result.innerHTML = "Winner sector is: BLUE";
    } else if (colors[index] == "#ff9f43") {
        result.innerHTML = "Winner sector is: GOLD";
    }
    document.querySelector(".bet").innerHTML = "Make a new bet and press PLAY"; //Reset bet status
}

//Check if two colors are the same
function checkWinner(index){
    if (colors[index] == player.colorPressed){
        //Add points
        if (player.colorPressed == "#222f3e" || player.colorPressed == "#ff6b6b") {
             player.balance += player.betMade * 2;
             playerBalance.innerHTML = player.balance;
        } else if (player.colorPressed == "#2e86de") {
            player.balance += player.betMade * 5;
            playerBalance.innerHTML = player.balance;
        } else if (player.colorPressed == "#ff9f43") {
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
}

function showImgWin(){
    let image = document.getElementById("win");
    let main = document.querySelector(".main");
    let bottom = document.querySelector(".bottom");
    bottom.style.display = "none";
    main.style.display = "none";
    image.style.display = "flex";
    setTimeout("hideWin()", 5000);
}

// Refactor showImg(img1, img2)
function hideWin(){
    let image = document.getElementById("win");
    let main = document.querySelector(".main");
    let bottom = document.querySelector(".bottom");
    main.style.display = "flex";
    bottom.style.display = "flex";
    image.style.display = "none";
}

function showImgLose(){
    let image = document.getElementById("lose");
    let main = document.querySelector(".main");
    let bottom = document.querySelector(".bottom");
    bottom.style.display = "none";
    main.style.display = "none";
    image.style.display = "flex";
    setTimeout("hideLose()", 5000);
}
function hideLose(){
    let image = document.getElementById("lose");
    let main = document.querySelector(".main");
    let bottom = document.querySelector(".bottom");
    main.style.display = "flex";
    bottom.style.display = "flex";
    image.style.display = "none";
}

document.getElementById('bet-btn').addEventListener('click', userInput, false);
window.addEventListener("load", event => {
    drawRouletteWheel();
    disableColorButtons();
    disablePlayButton();
    enableBetButton();
});
