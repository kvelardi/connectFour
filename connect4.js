/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let y =0; y < HEIGHT; y++){
    board.push(Array.from ({length: WIDTH}));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector("#board");

  // TODO: add comment for this code
  // creating the top row to be clickable 
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  //create the blank main game board to be played on
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);//sets cell ID with y/x values
      row.append(cell); //adds cell to the row
    }
    htmlBoard.append(row); //updates the board in that row
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y= HEIGHT -1; y >= 0; y--){
    if (!board [y][x]){
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement('div');
  piece.classList.add ("piece"); //adding game piece to the gameboard
  piece.classList.add (`p${currPlayer}`);
  const dot = document.getElementById (`${y}-${x}`); //create the dot
  dot.append (piece); //add the "dot" to the board
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert (msg); //can this be changed to an arrow fx?//
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board [y][x]= currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(row => row.every(cell =>cell))){
    return endGame ("No one wins! It's a tie!!")
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      //checking to see if there are any possible connect fours
      
      let horiz = [ //horizontal Left and Right)//
        [y, x], 
        [y, x + 1], 
        [y, x + 2], 
        [y, x + 3]
      ];

      let vert = [ //vertical (up and down)//
        [y, x],
        [y + 1, x], 
        [y + 2, x], 
        [y + 3, x]
      ];
      let diagDR = [ //diagonalRight//
        [y, x], 
        [y + 1, x + 1], 
        [y + 2, x + 2], 
        [y + 3, x + 3]
      ];
      let diagDL = [  //diagonalLeft//
        [y, x], 
        [y + 1, x - 1], 
        [y + 2, x - 2], 
        [y + 3, x - 3]
      ];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;  //if (horiz OR vert OR diagDR OR diagDL) become true, then return _win(cells) is true//
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
