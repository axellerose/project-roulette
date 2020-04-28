const canvas = document.getElementById("roulette");
//Array of objects ???
var colors = [
    "red", "black", "blue",
    "red", "black", "blue",
    "red", "black", "blue",
    "red", "black", "blue",
    "red", "black", "blue",
    "red", "black", "blue",
    "red", "black", "gold",
    "red", "black", "blue",
    "red", "black", "blue",
    "red", "black", "blue",
    "red", "black", "blue",
    "red", "black", "blue",
];

var startAngle = 0;
var arc = Math.PI / 18;

function drawRouletteWheel() {
    const ctx = canvas.getContext("2d");
    let outsideRadius = 200;
    let insideRadius = 0;
    ctx.clearRect(0,0,500,500);
    ctx.strokeStyle = "black";
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
    ctx.fillStyle = "green";
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
}
 
function easeOut(t, b, c, d) {
    var ts = (t/=d)*t;
    var tc = ts*t;
    return b+c*(tc + -3*ts + 3*t);
}
//How to not hardcode here? Use switch
function showResult(index){
    let result = document.querySelector(".result");
    if (colors[index] == "black") {
        result.innerHTML = "Winner sector is: BLACK"
    } else if (colors[index] == "red") {
        result.innerHTML = "Winner sector is: RED";
    } else if (colors[index] == "blue") {
        result.innerHTML = "Winner sector is: BLUE";
    } else if (colors[index] == "gold") {
        result.innerHTML = "Winner sector is: GOLD";
    }
}

window.addEventListener("load", event => {
    drawRouletteWheel();
});
