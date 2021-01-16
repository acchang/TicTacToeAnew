// To do:
// allow symbol pick then do dumb ai
// 2) SMART AI
// 3) animate winning combination

// if picked then playerOneSymbol = X (use ternary)
// instead of ECKS and OH CLASS, use playerOneClass and playerTwoClass

var ONE_CLASS
var TWO_CLASS 

const btn = document.querySelector('#PlayerOneSymbol');
btn.onclick = function () {
    const XOs = document.querySelectorAll('input[name="choice"]');
    for (const XO of XOs) {
        if (XO.checked) {
          ONE_CLASS = XO.value
          TWO_CLASS = XO.value == 'X' ? 'O' : 'X'
          break;
        }
    }
    alert(ONE_CLASS);
    };

let playerTurn
    
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
  console.log(ONE_CLASS, TWO_CLASS)
    stylingOfBoxes.forEach(gridBox => {
        gridBox.classList.remove(ONE_CLASS)
        gridBox.classList.remove(TWO_CLASS)
        gridBox.innerHTML = ""
        for (const gridBox of stylingOfBoxes) {
            gridBox.addEventListener('click', boxmarked,  {once: true})
        }
    })
  swapTurns()
}

const arrayfromBoxes = Array.from(document.getElementsByClassName('box'));
const stylingOfBoxes = document.querySelectorAll('.box');

function boxmarked(e) {
    const index = arrayfromBoxes.indexOf(e.target)
    if(playerTurn) {
        arrayfromBoxes[index].classList.add(ONE_CLASS)
        e.target.innerHTML = ONE_CLASS
      } else {
        arrayfromBoxes[index].classList.add(TWO_CLASS)
        e.target.innerHTML = TWO_CLASS
      }

    console.log(e.target.classList[1], index, arrayfromBoxes)
    // why does the alert in checkWin() appear before the added classes that change the box?
    checkWin()
    swapTurns()

    // if radial checked, shut off receiver then play dumbAI
    // make an array of where e.target.innerHTML = ""
    // then pick one of the spaces
    // arrayfromBoxes[dumbpick].classList.add(ECKS_CLASS)
    // e.target.innerHTML = "X"
    // checkWin()
}

function checkClass() {
  if(playerTurn) {
  return ONE_CLASS
} else {
  return TWO_CLASS
};}

function checkWin() {
    var indexSelected = arrayfromBoxes.reduce((indexSelected, box, idx) => {
        if (box.classList[1] === checkClass()) {
            indexSelected.push(idx);
        }
        return indexSelected;
    }, []);
    console.log(indexSelected);

   var winner = winningTrios.some(trio => {
       return trio.every(i => indexSelected.includes(i))});

    if (winner === true) {alert ("game won")}
}

