
class Player {
    constructor (name, balance) {
        this.name = name;
        this.balance = balance;
        this.betMade = 0;
        this.colorChosen= 'no color pressed';   
    }

    onColorClick(color) {
        let betStatus = document.querySelector(".bet");
        this.colorChosen = color;
        switch (color) {
            case "#2e86de": //blue
                betStatus.innerHTML = `Your bet is ${this.betMade} for BLUE`;
                break;
            case  "#ff6b6b": //red
                betStatus.innerHTML = `Your bet is ${this.betMade} for RED`;
                break;
            case "#222f3e": //black
                betStatus.innerHTML = `Your bet is ${this.betMade} for BLACK`;
                break;
            case "#ff9f43": //gold
            betStatus.innerHTML = `Your bet is ${this.betMade} for GOLD`;
        }
        disableColorButtons();
        enablePlayButton();
    } 

    onBetClick() {
        let userInput = document.getElementById('userInput').value;
        this.betMade = userInput;
        this.balance -= this.betMade;
        playerBalance.innerHTML = this.balance;
        this.setUserInput(50);
        disableBetButton();
        enableColorButtons();
    }
    
    setUserInput(number) {
        document.getElementById('userInput').value = number;
    }
}
