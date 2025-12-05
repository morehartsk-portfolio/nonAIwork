export class Concentration{
  static Card = {
    A: "A",
    B: "B",
    C: "C",
    D: "D",
    E: "E",
    F: "F"
  }
  static CardStatus = {
    HIDDEN: 0,
    REVEALED: 1,
    MATCHED: 2
  }
  static State = {
		ACTIVE: " ",
		WIN: "You found all the matches!"
	}
  constructor(){
    this.state = Concentration.State.ACTIVE;
		this.board = [];
		this.playerTimeStart = performance.now();
		this.playerTime = 0;
		this.cardStatuses = [];//revealed or not
		this.c1 = -1;
		this.c2 = -1; //card 1 and 2 to match
const para = document.getElementById("gameBoard");
const conb = document.createElement("div");
conb.setAttribute("id", "concentrationBoard");
const playerS = document.createElement("h3");
playerS.setAttribute("id", "timeDisplay");
playerS.innerHTML = " ";
this.initialSetup();
		for (let k = 0; k < 24; k++) {
			this.cardStatuses.push(Concentration.CardStatus.HIDDEN);
const node = document.createElement("div");
node.setAttribute("data-tile-index", k);
node.setAttribute("class", "card-tile");
conb.appendChild(node);
		}
		para.appendChild(conb);
		para.appendChild(playerS);
		
		const tiles = document.querySelectorAll(".card-tile");
		for (const tile of tiles) {
			tile.onclick = (event) => {
				const tileIndex = parseInt(tile.dataset.tileIndex);
				this.pressedButtonAtIndex(tileIndex);
			};
		}
		this.populateBoard();
  }
  initialSetup(){
    let cardNames = [Concentration.Card.A,Concentration.Card.B,Concentration.Card.C,
    Concentration.Card.D,Concentration.Card.E,Concentration.Card.F];
    for(let i = 0; i < 6; i++){
      //assigning cards one at a time
      for(let j = 0; j < 4; j++){//choose 4 random spots
      let index = Math.floor(Math.random() * 24);
      while(this.board[index] != undefined){
      index = Math.floor(Math.random() * 24);
      }
      this.board[index] = cardNames[i];
      }
    }
  }
  pressedButtonAtIndex(index){
          // console.log("hi from" + this.toMatchCard);
          if(this.state == Concentration.State.WIN){
            console.log("You win!");
            return;
          }
    switch(this.cardStatuses[index]){
      case 0:
        this.cardStatuses[index] = Concentration.CardStatus.REVEALED;
        if(this.c1 == -1){
          this.c1 = index;
        }else{
          this.c2 = index;
          // setTimeout(this.checkForMatch.bind(this), 100);
          let isMatch = this.checkForMatch();
          if(isMatch){
            setTimeout(()=>{
            this.cardStatuses[this.c1] = Concentration.CardStatus.MATCHED;
            this.cardStatuses[this.c2] = Concentration.CardStatus.MATCHED;
            this.c1 = -1;
            this.c2 = -1;
            this.checkForWin();
		        this.populateBoard();
          }, 200);
          }else{
          // setTimeout(()=>{console.log("hi");}, 100);
          setTimeout(()=>{
            this.cardStatuses[this.c1] = Concentration.CardStatus.HIDDEN;
            this.cardStatuses[this.c2] = Concentration.CardStatus.HIDDEN;
            this.c1 = -1;
            this.c2 = -1;
		        this.populateBoard();
          }, 200);
          }

        }
        break;
      default:
        break;
    }
		this.populateBoard();
    
  }
  checkForWin(){
          this.state = Concentration.State.WIN;
          
		      const endTime = performance.now();
		      this.playerTime = (endTime - this.playerTimeStart)/1000;
    for(let i = 0; i < this.cardStatuses.length; i++){
      if(this.cardStatuses[i] != Concentration.CardStatus.MATCHED){
        this.state = Concentration.State.ACTIVE;
      }
    }
  }
  
  checkForMatch(){
    return this.board[this.c1] == this.board[this.c2];

  }
  
    populateBoard(){
    document.getElementById("gameStatusDisplay").innerHTML = this.state;
    if(this.state == Concentration.State.WIN){
      document.getElementById("timeDisplay").innerHTML = "You beat the game in " + Math.ceil(this.playerTime) + " seconds.";
    }
    const tiles = document.querySelectorAll(".card-tile");
		tiles.forEach((tile, index) => {
		  if(this.cardStatuses[index] == Concentration.CardStatus.REVEALED){
		  tile.innerHTML = this.board[index];
		  tile.style.backgroundColor = '#F5C100';
		  }else if(this.cardStatuses[index] == Concentration.CardStatus.HIDDEN){
		  tile.style.backgroundColor = '#3B4075';
		  tile.innerHTML = " ";
		  }else{
		  tile.style.backgroundColor = '#F5C100';
		  tile.innerHTML = " ";
		  }
		});
		
  }
}