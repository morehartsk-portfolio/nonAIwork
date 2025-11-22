/**
references:
 * https://www.w3schools.com/js/js_htmldom_nodes.asp
 * https://developer.mozilla.org/en-US/docs/Web/HTML/How_to/Use_data_attributes
 * https://github.com/csse280/CodeFromVideos/blob/master/Follow%20Alongs/TicTacToe/public/scripts/main.js
 * https://medium.com/@canankorkut1/how-to-create-a-tic-tac-toe-with-html-css-and-javascript-10a25fddd356
 * https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
 * https://github.com/csse280/CSSE280-Fall2019/blob/master/Labs/LinearLightsOut/public/index.html
*/

var arc = arc || {}; //arc is short for arcade, since you can now switch between games.

arc.isTicTacToe = true; //a way to keep track of what game is being played.

arc.Game = class{
  constructor(){
		document.getElementById("gameBoard").replaceChildren();
    if(!arc.isTicTacToe){
      this.currGame = new arc.LinearLightsOut();
    }else{
      this.currGame = new arc.TicTacToe();
    }
  }
}

arc.TicTacToe = class{
  static Mark = {
		X: "X",
		O: "O",
		NONE: " "
	}

	static State = {
		X_TURN: "X's Turn",
		O_TURN: "O's Turn",
		X_WIN: "X Wins!",
		O_WIN: "O Wins!",
		TIE: "It's a Tie!"
	}
  constructor(){
    this.state = arc.TicTacToe.State.X_TURN;
		this.board = [];
		const para = document.getElementById("gameBoard");
const tttb = document.createElement("div");
tttb.setAttribute("id", "ticTacToeBoard");
		for (let k = 0; k < 9; k++) {
			this.board.push(arc.TicTacToe.Mark.NONE);
const node = document.createElement("div");
node.setAttribute("data-tile-index", k);
node.setAttribute("class", "board-tile");
tttb.appendChild(node);
		}
		para.appendChild(tttb);
		
		//this might be a bad idea but hear me out
	  const tiles = document.querySelectorAll(".board-tile");
		for (const tile of tiles) {
			tile.onclick = (event) => {
				const tileIndex = parseInt(tile.dataset.tileIndex);
				this.pressedButtonAtIndex(tileIndex);
			};
		}
		this.populateBoard();
  }
  
  pressedButtonAtIndex(index){
    if(this.board[index] != arc.TicTacToe.Mark.NONE){
      console.log("Sorry, this spot's filled!");
      return;
    }
    if(this.state == arc.TicTacToe.State.X_WIN || this.state == arc.TicTacToe.State.O_WIN || this.state == arc.TicTacToe.State.TIE){
      console.log("The game ended.");
      return;
    }
    if(this.state == arc.TicTacToe.State.X_TURN){
      this.board[index] = arc.TicTacToe.Mark.X;
		  this.state = arc.TicTacToe.State.O_TURN;
    }else if(this.state == arc.TicTacToe.State.O_TURN){
      this.board[index] = arc.TicTacToe.Mark.O;
		  this.state = arc.TicTacToe.State.X_TURN;
    }
    this.checkForGameOver();
    this.populateBoard();
  }
  
  getMarkAtIndex(index){
    return this.board[index];
  }
  populateBoard(){
    document.getElementById("gameStatusDisplay").innerHTML = this.state;
    const tiles = document.querySelectorAll(".board-tile");
		tiles.forEach((tile, index) => {
			tile.innerHTML = this.getMarkAtIndex(index);
		});
  }
  checkForGameOver(){
    if (!this.board.includes(arc.TicTacToe.Mark.NONE)) {
			this.state = arc.TicTacToe.State.TIE;
		}
		const winningCombos = [
		  [0,1,2],
		  [3,4,5],
		  [6,7,8],
		  [0,3,6],
		  [1,4,7],
		  [2,5,8],
		  [0,4,8],
		  [2,4,6]
		  ];
		  
		  for(let i = 0; i < winningCombos.length; i++){
		    if(this.board[winningCombos[i][0]] == arc.TicTacToe.Mark.X && this.board[winningCombos[i][1]] == arc.TicTacToe.Mark.X && this.board[winningCombos[i][2]] == arc.TicTacToe.Mark.X){
		      this.state = arc.TicTacToe.State.X_WIN;
		    }
		    
		    if(this.board[winningCombos[i][0]] == arc.TicTacToe.Mark.O && this.board[winningCombos[i][1]] == arc.TicTacToe.Mark.O && this.board[winningCombos[i][2]] == arc.TicTacToe.Mark.O){
		      this.state = arc.TicTacToe.State.O_WIN;
		    }
		  }
  }
}

arc.LinearLightsOut = class{

	static State = {
		ACTIVE: " ",
		WIN: "You win!"
	}
  constructor(){
    this.state = arc.LinearLightsOut.State.ACTIVE;
		this.board = [];
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
llob.setAttribute("id", "lightsOutBoard");
		for (let k = 0; k < 5; k++) {
const node = document.createElement("div");
node.setAttribute("data-tile-index", k);
node.setAttribute("class", "switch-tile");
llob.appendChild(node);
		}
		para.appendChild(llob);
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
    if(this.state == arc.LinearLightsOut.State.WIN){
      console.log("The game ended.");
      return;
    }
    this.board[index] = !this.board[index];
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
		      this.state = arc.LinearLightsOut.State.ACTIVE;
		    }else{
		  this.state = arc.LinearLightsOut.State.WIN;
		    }
		  
  }
  
  checkBoardStatus(){//this will also be used to populate the initial board so you dont auto-win.
		  return !this.board.includes(true);
  }
}


arc.PageController = class{
  constructor(){
    this.game = new arc.Game();
    document.getElementById("switchGame").onclick = (event) => {
    	arc.isTicTacToe = !arc.isTicTacToe;
    	this.game = new arc.Game();
  		this.update(); 
	  };//well come back to this
    document.getElementById("newGame").onclick = (event) => {
    	this.game = new arc.Game();
  		this.update();
	  };
	  this.update();
  }
  
  
  update(){
    const gameTitles = document.getElementsByClassName("game-title");
    for(const gameTitle of gameTitles){
    if(arc.isTicTacToe){
      gameTitle.innerHTML = "Tic Tac Toe";
    }else{
      gameTitle.innerHTML = "Linear Lights Out";
    }
    }
    if(arc.isTicTacToe){
      document.getElementById("switchGame").innerHTML = "Linear Lights Out";
    }else{
      document.getElementById("switchGame").innerHTML = "Tic Tac Toe";
    }
  }
  
}

arc.main = function(){
  new arc.PageController();
}

arc.main();