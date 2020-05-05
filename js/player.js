
class Player {
    constructor (name, balance) {
        this.name = name;
        this.balance = balance;
        this.betMade = 0;
        this.colorPressed = 'no color pressed';   

    }
    onColorClick(color) {
        //Check DRY, change name color Pressed (chosen color)
        let betStatus = document.querySelector(".bet");
        this.colorPressed = color;
        if (color == "#2e86de"){
            betStatus.innerHTML = `Your bet is ${this.betMade} for BLUE`;
        } else if (color == "#ff6b6b"){
            betStatus.innerHTML = `Your bet is ${this.betMade} for RED`;
        } else if (color == "#222f3e"){
            betStatus.innerHTML = `Your bet is ${this.betMade} for BLACK`;
        } else if (color == "#ff9f43"){
            betStatus.innerHTML = `Your bet is ${this.betMade} for GOLD`;
        }
        disableColorButtons();
        enablePlayButton();
    } 

    onBetClick() {
        let userInput = document.getElementById('userInput').value;
        console.log(userInput);
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
