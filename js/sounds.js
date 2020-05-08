let pauseBtn = document.getElementById("pause-music");
let playBtn = document.getElementById("play-music");
let music = document.getElementById("bg-music");
music.volume = 0.1;

function playMusic() {
    music.play();
    playBtn.style.display = "none";
    pauseBtn.style.display = "block";
}

function pauseMusic() {
    music.pause();
    pauseBtn.style.display = "none";
    playBtn.style.display = "block";    
}

var btnSound = document.getElementById("btn-sound");
var btnSpined = document.getElementById("btn-spin");
btnSound.volume = 0.3;
btnSpined.volume = 0.05;

function btnPressed() {
    btnSound.play();
}

function btnSpin() {
    btnSpined.play();
}