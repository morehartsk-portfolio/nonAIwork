import {Game} from "./Game.js";
export class PageController{
  constructor(){
    this.gameType = 4;
    this.game = new Game(this.gameType);
    document.getElementById("ttt_button").onclick = (event) => {
      this.newGame(1);
	  };//well come back to this
    document.getElementById("llo_button").onclick = (event) => {
    	this.newGame(2);
	  };//well come back to this
    document.getElementById("con_button").onclick = (event) => {
    	this.newGame(3);
	  };//well come back to this
    document.getElementById("cho_button").onclick = (event) => {
    	this.newGame(4);
	  };
    document.getElementById("newGame").onclick = (event) => {
    	this.newGame(this.gameType);
	  };
    document.getElementById("help").onclick = (event) => {
    	this.helpDisplay();
	  };
	  this.update();
  }
  
  newGame(gt){
    this.gameType = gt;
    this.game = new Game(this.gameType);
    this.update();
  }
  
  helpDisplay(){
    switch(this.gameType){
        case 1:
          alert("Tic tac toe is a game where two players (X and O) claim spaces on a board, marking them with either an X or an O."+
          "\nThe goal of the game is to get three Xs or three Os in a row (diagonal, horizontal, or vertical).");
          break;
        case 2:
          alert("Linear Lights Out is a game where a player flips a switch to affect neighboring switches."+
          "\nThe goal of the game is to turn all of the switches off.")
          break;
        case 3:
          alert("Concentration is a game where a player finds pairs of matching cards."+
          "\nThe goal of the game is to find all of the matches.")
          break;
        case 4:
          alert("Chō-Han is a game where two dice are rolled and the player bets on if the sum of the dice are even or odd."+
          "\nThe goal of the game is to correctly guess if the sum of the dice are even or odd.")
          break;
        default:
          console.log("Not an octopus");
      }
  }
  
  update(){
    const gameTitles = document.getElementsByClassName("game-title");
    for(const gameTitle of gameTitles){
      switch(this.gameType){
        case 1:
          gameTitle.innerHTML = "Tic Tac Toe";
          break;
        case 2:
          gameTitle.innerHTML = "Linear Lights Out";
          break;
        case 3:
          gameTitle.innerHTML = "Concentration";
          break;
        case 4:
          gameTitle.innerHTML = "Chō-Han";
          break;
        default:
          console.log("Not an octopus");
      }
    
    }
  }
  
}