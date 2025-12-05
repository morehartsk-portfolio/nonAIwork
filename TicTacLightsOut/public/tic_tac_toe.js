export class TicTacToe {
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
    this.state = TicTacToe.State.X_TURN;
		this.board = [];
		const para = document.getElementById("gameBoard");
const tttb = document.createElement("div");
tttb.setAttribute("id", "ticTacToeBoard");
		for (let k = 0; k < 9; k++) {
			this.board.push(TicTacToe.Mark.NONE);
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
    if(this.board[index] != TicTacToe.Mark.NONE){
      console.log("Sorry, this spot's filled!");
      return;
    }
    if(this.state == TicTacToe.State.X_WIN || this.state == TicTacToe.State.O_WIN || this.state == TicTacToe.State.TIE){
      console.log("The game ended.");
      return;
    }
    if(this.state == TicTacToe.State.X_TURN){
      this.board[index] = TicTacToe.Mark.X;
		  this.state = TicTacToe.State.O_TURN;
    }else if(this.state == TicTacToe.State.O_TURN){
      this.board[index] = TicTacToe.Mark.O;
		  this.state = TicTacToe.State.X_TURN;
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
    if (!this.board.includes(TicTacToe.Mark.NONE)) {
			this.state = TicTacToe.State.TIE;
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
		    if(this.board[winningCombos[i][0]] == TicTacToe.Mark.X && this.board[winningCombos[i][1]] == TicTacToe.Mark.X && this.board[winningCombos[i][2]] == TicTacToe.Mark.X){
		      this.state = TicTacToe.State.X_WIN;
		    }
		    
		    if(this.board[winningCombos[i][0]] == TicTacToe.Mark.O && this.board[winningCombos[i][1]] == TicTacToe.Mark.O && this.board[winningCombos[i][2]] == TicTacToe.Mark.O){
		      this.state = TicTacToe.State.O_WIN;
		    }
		  }
  }
}