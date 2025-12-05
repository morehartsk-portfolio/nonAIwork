export class ChoHan{
  static State = {
		WAITING: " ",
		ROLLING: "...",
		WIN: "You guessed correctly!",
		LOSE: "Better luck next time!",
		BROKE: "You don't have any more money!"
  }
  
  static Bet = {
    EVEN: 0,
    ODD: 1,
    UNDECIDED: 2
  }
  
  constructor(){
    this.state = ChoHan.State.WAITING;
    this.playerBet = ChoHan.Bet.UNDECIDED;
    this.winnings = 50;
    this.isDouble = false;
    this.dice = [];
const spacerTextNode = document.createTextNode(" ");
const para = document.getElementById("gameBoard");
// const para = document.getElementById("gameStatusDisplay");
const playerS = document.createElement("h3");
playerS.setAttribute("id", "playerWinningsDisplay");
playerS.innerHTML = "Your winnings are: $" + this.winnings;
const conb = document.createElement("div");
conb.setAttribute("id", "chohanBoard");
		for (let k = 0; k < 2; k++) {
const node = document.createElement("div");
node.setAttribute("data-tile-index", k);
node.setAttribute("class", "dice-tile");
node.appendChild(spacerTextNode);
conb.appendChild(node);
		}
		para.appendChild(conb);
		para.appendChild(playerS);
		
		const betDivNode = document.createElement("div");
betDivNode.setAttribute("id", "bettingOptions");
const betNodeE = document.createElement("button");
betNodeE.setAttribute("type", "button");
betNodeE.setAttribute("id", "betEven");
const eTextNode = document.createTextNode("Bet on even");
betNodeE.appendChild(eTextNode);
betNodeE.setAttribute("class", "btn-bet");

const betNodeO = document.createElement("button");
betNodeO.setAttribute("type", "button");
betNodeO.setAttribute("id", "betOdd");
const oTextNode = document.createTextNode("Bet on odd");
betNodeO.appendChild(oTextNode);
betNodeO.setAttribute("class", "btn-bet");

betDivNode.appendChild(betNodeE);
betDivNode.appendChild(spacerTextNode);
betDivNode.appendChild(betNodeO);
para.appendChild(betDivNode);

const betEven = document.getElementById("betEven");
const betOdd = document.getElementById("betOdd");
  betEven.onclick = (event) => {
    if(this.state != ChoHan.State.ROLLING && this.state != ChoHan.State.BROKE){
				this.playerBet = ChoHan.Bet.EVEN;
	this.rollDice();		
    }
			};
  betOdd.onclick = (event) => {
    if(this.state != ChoHan.State.ROLLING && this.state != ChoHan.State.BROKE){
				this.playerBet = ChoHan.Bet.ODD;
	this.rollDice();		
  }
			};
			this.populateBoard();
  }
  rollDice(){
    this.winnings -= 5;
    this.state = ChoHan.State.ROLLING;
    this.populateBoard();
    let diceSum = 0;
    for(let i = 0; i < 2; i++){
      this.dice[i] = Math.floor(Math.random() * 6) + 1;
      diceSum += this.dice[i];
    }
    if(this.dice[0] == this.dice[1]){
      this.isDouble = true;
    }
      setTimeout(()=>{
		this.checkForWin(diceSum);
		this.populateBoard();
          }, 500);
  }

checkForWin(toCheck){
  if((toCheck % 2 == 0 && this.playerBet == ChoHan.Bet.EVEN) || (toCheck % 2 != 0 && this.playerBet == ChoHan.Bet.ODD)){
    this.state = ChoHan.State.WIN;
    if(this.isDouble){
    this.winnings += 20;
    }else{
      this.winnings += 10;
    }
  }else{
    this.state = ChoHan.State.LOSE;
    this.winnings -= 10;
    if(this.winnings <= 0){
      this.state = ChoHan.State.BROKE;
    }
  }
}
  populateBoard(){
        document.getElementById("gameStatusDisplay").innerHTML = this.state;
document.getElementById("playerWinningsDisplay").innerHTML = "Your winnings are: $" + this.winnings;
        const tiles = document.querySelectorAll(".dice-tile");
		tiles.forEach((tile, index) => {
		  if(this.dice[index] != undefined){
		  tile.innerHTML = this.dice[index];
		  }else{
		    tile.innerHTML = " ";
		  }
		});
  }
  
}