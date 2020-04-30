class Player {
    constructor (name, balance) {
        this.name = name;
        this.balance = balance;
        this.betMade = 0;
        this.colorPressed = 'no color pressed';   

    }
    onColorClick(color) {
        let blue = "#2e86de";
        let red = "#ff6b6b";
        let black = "#222f3e";
        let gold = "#ff9f43";
        let betStatus = document.querySelector(".bet")
        this.colorPressed = color;
        if (color == "#2e86de"){
            betStatus.innerHTML = `Your bet is BLUE`;
        } else if (color == "#ff6b6b"){
            betStatus.innerHTML = `Your bet is RED`;
        } else if (color == "#222f3e"){
            betStatus.innerHTML = `Your bet is BLACK`;
        } else if (color == "#ff9f43"){
            betStatus.innerHTML = `Your bet is GOLD`;
        }
    } 
}
