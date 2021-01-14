const boxes = Array.from(document.getElementsByClassName('box'));

let currentPlayer = "playerOne"
let board = []

const winningTrios = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

const gridOfBoxes = document.querySelectorAll('.box');
for (const gridBox of gridOfBoxes) {
    gridBox.addEventListener('click', boxmarked,  {once: true})
}

function boxmarked(e) {
    e.target.innerHTML = "icon goes here";
    const gridArray = Array.from(gridOfBoxes)
    const index = gridArray.indexOf(e.target)

    // need to work on indeterminate players; current player is 'one' or 'two'
    if(currentPlayer === 'playerOne') {
        gridArray[index].classList.add('X')
        currentPlayer = 'playerTwo'
      } else {
        gridArray[index].classList.add('O')
        currentPlayer = 'playerOne'
      }

    console.log(e.target.classList[1], index, gridArray)
    
    checkWin()

    // *** FCC does it by passing in board and player. I need the board for the minimax and I need the current player
    // he .reduces the board to get an array of the occupied places
    // then he also employs an .every and for loop (25:00 in video)
    // NEXT STEPS: CLEAN THIS UP SO BOTH SIDES CAN PLAY AND PLAYERS CAN BE PICKED
    // ALSO: MAYBE REFACTOR TO CONSOLIDATED, NO NEED TO GENERATE INDEXSELECTED
}

function checkWin() {
    var indexSelected = boxes.reduce((indexSelected, box, idx) => {
        if (box.classList[1] === 'X') {
            indexSelected.push(idx);
        }
        return indexSelected;
    }, []);
    console.log(indexSelected);

   var winner = winningTrios.some(trio => {
       return trio.every(i => indexSelected.includes(i))});
    if (winner === true) {alert ("game won")}
   }

// try refactoring to do as below.
// function checkWin(currentClass) {
//     return WINNING_COMBINATIONS.some(combination => {
//       return combination.every(index => {
//         return cellElements[index].classList.contains(currentClass)
//       })