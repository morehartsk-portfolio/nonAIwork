/**
references:
 * https://www.w3schools.com/js/js_htmldom_nodes.asp
 * https://developer.mozilla.org/en-US/docs/Web/HTML/How_to/Use_data_attributes
 * https://github.com/csse280/CodeFromVideos/blob/master/Follow%20Alongs/TicTacToe/public/scripts/main.js
 * https://medium.com/@canankorkut1/how-to-create-a-tic-tac-toe-with-html-css-and-javascript-10a25fddd356
 * https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
 * https://github.com/csse280/CSSE280-Fall2019/blob/master/Labs/LinearLightsOut/public/index.html
*/
import { PageController } from "./PageController.js";

var arc = arc || {}; //arc is short for arcade, since you can now switch between games.

arc.main = function(){
  new PageController();
}

arc.main();