/* Roulette colors:
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

let player = new Player("alex", 10000);

var startAngle = 0;
var arc = Math.PI / 18;

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
    //Draw arrow
    ctx.fillStyle = "#c8d6e5";
    ctx.beginPath();
    ctx.moveTo(250 - 7, 250 - (outsideRadius + 8));
    ctx.lineTo(250 + 7, 250 - (outsideRadius + 8));
    ctx.lineTo(250 + 7, 250 - (outsideRadius - 8));
    ctx.lineTo(250 + 12, 250 - (outsideRadius - 8));
    ctx.lineTo(250 + 0, 250 - (outsideRadius - 20));
    ctx.lineTo(250 - 12, 250 - (outsideRadius - 8));
    ctx.lineTo(250 - 7, 250 - (outsideRadius - 8));
    ctx.lineTo(250 - 7, 250 - (outsideRadius + 8));
    ctx.fill();
}

function spin() {
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3 + 4 * 1000;
    rotateWheel();
    console.log(player.colorPressed)
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
    } else if (colors[index] == "gold") {
        result.innerHTML = "Winner sector is: GOLD";
    }
}

//Check if two colors are the same
function checkWinner(index){
    if (colors[index] == player.colorPressed){
        alert("You win!");
        return true;
    } else {
        alert("You loose!");
        return false;
    }
}


window.addEventListener("load", event => {
    drawRouletteWheel();
});
