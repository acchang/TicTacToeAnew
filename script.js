// 1) pre-empt the opponent's last move -- by making playerdesignation inactive (works but ugly and not explain)
  // I would try to make the boxmarked function behave different based on what checkwin() returns.
  // break it up

  // think about it, what should checkWin() do? Maybe even think of a better name, I might even call it something like userHasWon(), and 
  // think of how nice it will be to read if(userHasWon()) you can tell right away what is happening.
  // add condition to boxmarked if not won and AI


  // 2) find a way to slow the response

  // 3) identify winning trio to add class and change background color
  // if (isWinningCombo) {
  //   winner = true;
  //   winningCombo.forEach((index) => {
  //     positions[index].className += ' winner';}
  //   }

  // 4) need to denote a tie, I guess when all spaces are filled, place after checkwin
  
  // then smart AI



var ONE_CLASS
var TWO_CLASS
var endGame 

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
  if (ONE_CLASS == undefined || playerTwoIdentity == undefined) {return alert ("Make sure players are defined")}
  console.log("player 1 = " + ONE_CLASS + ", player 2 = " + playerTwoIdentity)
  drawBoard();
  playerTurn = true
  endGame = false
}

const arrayfromBoxes = Array.from(document.getElementsByClassName('box'));
const stylingOfBoxes = document.querySelectorAll('.box');

function drawBoard() {
  console.log(stylingOfBoxes)
  for (let i = 0; i < stylingOfBoxes.length; i++) {
  stylingOfBoxes[i].addEventListener('click', boxmarked, {once: true});}

    stylingOfBoxes.forEach(gridBox => {
    gridBox.classList.remove(ONE_CLASS)
    gridBox.classList.remove(TWO_CLASS)
    gridBox.innerHTML = ""

    })
    }

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

    if(playerTwoIdentity === "Dumb AI" && endGame === false) {
      var dumbAIArray = arrayfromBoxes.reduce((dumbAIArray, box, idx) => {
        if (box.innerHTML === "") {
          dumbAIArray.push(idx);
          }
          return dumbAIArray;
        }, []);
        console.log(endGame + " player 2 picks from " + dumbAIArray);
        let dumbAIpicked = dumbAIArray[Math.floor(dumbAIArray.length * (Math.random()))]
        console.log("player 2 picks " + dumbAIpicked);
        arrayfromBoxes[dumbAIpicked].classList.add(TWO_CLASS)
        arrayfromBoxes[dumbAIpicked].innerHTML = TWO_CLASS

// why does Timeoutfunction prevent "O wins"? this is 100% responsible
// setTimeout(function(){arrayfromBoxes[dumbAIpicked].classList.add(TWO_CLASS)}, 500);
// setTimeout(function(){arrayfromBoxes[dumbAIpicked].innerHTML = TWO_CLASS}, 500);
// I could break off opponent move and mayb slow it?
    
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

    if (winner === true) {
      endGame = true
      declareWinner()};
    // I could add a 'let' here so checkwin would return something but boxmarked would still go
    console.log("all spaces by player " + checkClass() + " is " + indexOfSelected);
}

function declareWinner() {
  alert (checkClass() + " WINS");
  for (let i=0; i < stylingOfBoxes.length; i++) {
    stylingOfBoxes[i].removeEventListener('click', boxmarked, {once: true});}
}
