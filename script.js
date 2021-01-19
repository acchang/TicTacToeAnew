// need to manipulate win order and end game bc right now it is:
// click box, alert, paste icon, past opponent icon
// add a condition if started without player or opponent, if ONE_CLASS or TWO_CLASS undefined
// ask to pick
// THEN: SMART AI
// animate winning combination

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
    alert("First Move Belongs to " + ONE_CLASS + ". Select Player Two.");
    };

var playerTwoIdentity
  
const btn2 = document.querySelector('#PlayerTwoChoice');
btn2.onclick = function () {
    const Opponents = document.querySelectorAll('input[name="choice2"]');
    for (const Opponent of Opponents) {
        if (Opponent.checked) {
          playerTwoIdentity = Opponent.value
          break;
        }
    }
    alert("Your Opponent is "  + playerTwoIdentity + ". Start New Game.")
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
  // let playerTurn = true
  console.log("player 1 = " + ONE_CLASS + ", player 2 = " + playerTwoIdentity)
    stylingOfBoxes.forEach(gridBox => {
        gridBox.classList.remove(ONE_CLASS)
        gridBox.classList.remove(TWO_CLASS)
        gridBox.innerHTML = ""
        for (const gridBox of stylingOfBoxes) {
            gridBox.addEventListener('click', boxmarked,  {once: true})
        }
    })
  playerTurn = true
}

const arrayfromBoxes = Array.from(document.getElementsByClassName('box'));
const stylingOfBoxes = document.querySelectorAll('.box');

function boxmarked(e) {
  console.log("playerTurn = " + playerTurn)
    const index = arrayfromBoxes.indexOf(e.target)
// maybe I jut let ONE_CLASS mark and then if the AI or player; or do it even earlier
    if(playerTurn) {
        arrayfromBoxes[index].classList.add(ONE_CLASS)
        e.target.innerHTML = ONE_CLASS
      } else {
        arrayfromBoxes[index].classList.add(TWO_CLASS)
        e.target.innerHTML = TWO_CLASS
      }

    // why does the alert in checkWin() appear before the added classes that change the box?
    checkWin()
    swapTurns()

    if(playerTwoIdentity === "Dumb AI") {
      var dumbAIArray = arrayfromBoxes.reduce((dumbAIArray, box, idx) => {
        if (box.innerHTML === "") {
          dumbAIArray.push(idx);
          }
          return dumbAIArray;
        }, []);
        console.log("player 2 picks from " + dumbAIArray);
        let dumbAIpicked = dumbAIArray[Math.floor(dumbAIArray.length * (Math.random()))]
        console.log("player 2 picks " + dumbAIpicked);
        arrayfromBoxes[dumbAIpicked].classList.add(TWO_CLASS)
        arrayfromBoxes[dumbAIpicked].innerHTML = TWO_CLASS

    checkWin()
    swapTurns()
    } else { console.log("Human")
    }

}

function checkClass() {
  if(playerTurn) {
  return ONE_CLASS
} else {
  return TWO_CLASS
};}

function checkWin() {
    var indexOfSelected = arrayfromBoxes.reduce((indexOfSelected, box, idx) => {
        if (box.classList[1] === checkClass()) {
            indexOfSelected.push(idx);
        }
        return indexOfSelected;
    }, []);

   var winner = winningTrios.some(trio => {
       return trio.every(i => indexOfSelected.includes(i))});

    if (winner === true) {declareWinner()};
    console.log("all spaces by player" + checkClass() + " is " + indexOfSelected);
}

function declareWinner() {
  alert (checkClass() + " WINS")
}
