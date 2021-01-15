
let playerTurn

const ECKS_CLASS = 'X'
const OH_CLASS = 'O'
const currentClass = playerTurn ? ECKS_CLASS : OH_CLASS

// const currentClass = if(playerTurn) {ECKS_CLASS} else {OH_CLASS};

function swapTurns() {
  playerTurn = !playerTurn
};

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

restartBtn.addEventListener('click', startGame);

function startGame() {
    // document.getElementsByClassName('box').innerHTML = ""
    // why isn't this clearing the innerhtml?
    stylingOfBoxes.forEach(gridBox => {
        gridBox.classList.remove(ECKS_CLASS)
        gridBox.classList.remove(OH_CLASS)
        for (const gridBox of stylingOfBoxes) {
            gridBox.addEventListener('click', boxmarked,  {once: true})
        }
    })
}

const arrayfromBoxes = Array.from(document.getElementsByClassName('box'));
const stylingOfBoxes = document.querySelectorAll('.box');

function boxmarked(e) {
    const index = arrayfromBoxes.indexOf(e.target)
    
    if(playerTurn) {
        arrayfromBoxes[index].classList.add(OH_CLASS)
        e.target.innerHTML = "O"
      } else {
        arrayfromBoxes[index].classList.add(ECKS_CLASS)
        e.target.innerHTML = "X"
      }

    console.log(currentClass, e.target.classList[1], index, arrayfromBoxes)
    swapTurns()
    
    checkWin()
}

function checkWin() {
    var indexSelected = arrayfromBoxes.reduce((indexSelected, box, idx) => {
        if (box.classList[1] === "X") {
            indexSelected.push(idx);
        }
        return indexSelected;
    }, []);
    console.log(indexSelected);

   var winner = winningTrios.some(trio => {
       return trio.every(i => indexSelected.includes(i))});

    if (winner === true) {alert ("game won")}
    // then remove all eventlisteners
}

