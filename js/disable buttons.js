function disableColorButtons(){
    let colorBtns = document.querySelectorAll("#colorBtn");
    for (i = 0; i < colorBtns.length; i++) {
        colorBtns[i].disabled = true;
    }
}

function enableColorButtons(){
    let colorBtns = document.querySelectorAll("#colorBtn");
    for (i = 0; i < colorBtns.length; i++) {
        colorBtns[i].disabled = false;
    }
}

function disablePlayButton(){
    let playBtn = document.querySelector("#play-btn");
    playBtn.disabled = true;
}

function enablePlayButton(){
    let playBtn = document.querySelector("#play-btn");
    playBtn.disabled = false;
}

function disableBetButton(){
    let betBtn = document.querySelector("#bet-btn");
    betBtn.disabled = true;
}

function enableBetButton(){
    let betBtn = document.querySelector("#bet-btn");
    betBtn.disabled = false;
}