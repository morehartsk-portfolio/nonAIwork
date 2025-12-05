import { TicTacToe } from "./tic_tac_toe.js";
import { LinearLightsOut } from "./linear_lights_out.js";
import { Concentration } from "./concentration.js";
import { ChoHan } from "./chohan.js";
export class Game{
  static GameType = {
    TIC_TAC_TOE: 1,
    LINEAR_LIGHTS_OUT: 2,
    CONCENTRATION: 3,
    CHO_HAN: 4
  }
  constructor(gameType){
		document.getElementById("gameBoard").replaceChildren();
    
    switch(gameType){
      case Game.GameType.TIC_TAC_TOE:
        this.currGame = new TicTacToe();
        break;
      case Game.GameType.LINEAR_LIGHTS_OUT:
        this.currGame = new LinearLightsOut();
        break;
      case Game.GameType.CONCENTRATION:
        this.currGame = new Concentration();
        break;
      case Game.GameType.CHO_HAN:
        this.currGame = new ChoHan();
        break;
      default:
        console.log("Not an octopus");
        break;
    }
  }
}