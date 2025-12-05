export class LinearLightsOut {

	static State = {
		ACTIVE: " ",
		WIN: "You win!"
	}
  constructor(){
    this.state = LinearLightsOut.State.ACTIVE;
		this.board = [];
		this.moves = 0;
		this.generateInitialSetup();
		let isInstantWin = this.checkBoardStatus();
		while(isInstantWin){
		  // console.log("Not an octopus");
		  this.board = [];
		  this.generateInitialSetup();
		  isInstantWin = this.checkBoardStatus();
		}
		const para = document.getElementById("gameBoard");
const llob = document.createElement("div");
const playerS = document.createElement("h3");
playerS.setAttribute("id", "movesDisplay");
playerS.innerHTML = "Moves: " + this.moves;
llob.setAttribute("id", "lightsOutBoard");
		for (let k = 0; k < 5; k++) {
const node = document.createElement("div");
node.setAttribute("data-tile-index", k);
node.setAttribute("class", "switch-tile");
llob.appendChild(node);
		}
		para.appendChild(llob);
		para.appendChild(playerS);
	  const tiles = document.querySelectorAll(".switch-tile");
		for (const tile of tiles) {
			tile.onclick = (event) => {
				const tileIndex = parseInt(tile.dataset.tileIndex);
				this.pressedButtonAtIndex(tileIndex);
			};
		}
		this.populateBoard();
  }
  
  generateInitialSetup(){
		for (let k = 0; k < 5; k++) {
			this.board.push(Math.floor(Math.random() * 10) > 5);
		}
  }
  pressedButtonAtIndex(index){//time to implement the fun part where other indices change. maybe also time to add and remove a few attributes to the containers with classes
    if(this.state == LinearLightsOut.State.WIN){
      console.log("The game ended.");
      return;
    }
    this.board[index] = !this.board[index];
    this.moves++;
    switch(index){
      case 0:
        this.board[index + 1] = !this.board[index + 1];
        break;
      case 4:
        this.board[index - 1] = !this.board[index - 1];
        break;
      default:
        this.board[index - 1] = !this.board[index - 1];
        this.board[index + 1] = !this.board[index + 1];
        break;
    }
    this.checkForGameOver();
    this.populateBoard();
  }
  
    populateBoard(){
    document.getElementById("gameStatusDisplay").innerHTML = this.state;
    document.getElementById("movesDisplay").innerHTML = "Moves: " + this.moves;
    const tiles = document.querySelectorAll(".switch-tile");
		tiles.forEach((tile, index) => {
		  if(!this.board[index]){
		  tile.style.backgroundColor = '#3B4075'
		  }else{
		  tile.style.backgroundColor = '#F5C100'
		  }

		});
  }
  
  checkForGameOver(){
		  let isWin = this.checkBoardStatus();
		    if(!isWin){
		      this.state = LinearLightsOut.State.ACTIVE;
		    }else{
		  this.state = LinearLightsOut.State.WIN;
		    }
		  
  }
  
  checkBoardStatus(){//this will also be used to populate the initial board so you dont auto-win.
		  return !this.board.includes(true);
  }
}