// 1) identify winning trio to add class and change background color
//   if (isWinningCombo) {
//     winner = true;
//     winningCombo.forEach((index) => {
//       positions[index].className += ' winner';}
//     }

// 2) find a way to slow the response, why do breaking it out reawaken?
  
// 3) then smart AI with minimax

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

let playerOneTurn 
    
function swapTurns() {
  playerOneTurn = !playerOneTurn
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
  playerOneTurn = true;
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
    const index = arrayfromBoxes.indexOf(e.target)
// to consolidate maybe I just let ONE_CLASS mark and then if the AI or player
// or do it even earlier and link it with playerTurn? 
    if(playerOneTurn) {
        arrayfromBoxes[index].classList.add(ONE_CLASS)
        e.target.innerHTML = ONE_CLASS
      } else {
        arrayfromBoxes[index].classList.add(TWO_CLASS)
        e.target.innerHTML = TWO_CLASS
      }

      if (playerhasWon()) {
        declareWinner()
        return
      } 
      
      if (emptySpaceRemains() == false) {
        declareTie()
        return
      }

    swapTurns()

    // eliminate repetition - 
    if(playerTwoIdentity === "Dumb AI") {
      var dumbAIArray = arrayfromBoxes.reduce((dumbAIArray, box, idx) => {
        if (box.innerHTML === "") {
          dumbAIArray.push(idx);
          }
          return dumbAIArray;
        }, []);
        let dumbAIpicked = dumbAIArray[Math.floor(dumbAIArray.length * (Math.random()))]
        arrayfromBoxes[dumbAIpicked].classList.add(TWO_CLASS)
        arrayfromBoxes[dumbAIpicked].innerHTML = TWO_CLASS

// why does Timeoutfunction prevent "O wins"? this is 100% responsible
// setTimeout(function(){arrayfromBoxes[dumbAIpicked].classList.add(TWO_CLASS)}, 500);
// setTimeout(function(){arrayfromBoxes[dumbAIpicked].innerHTML = TWO_CLASS}, 500);
// I could break off opponent move and maybe slow it?
    
if (playerhasWon()) {
  declareWinner()
  return
} 

if (emptySpaceRemains() == false) {
  declareTie()
  return
}

    swapTurns()
    } else { console.log("Human")
    }
}

function hasGameEnded() {
      // fix declareWinner() appears before the added classes bc alert happens quicker than redraw
      // I also cannot pull these out because then the opponent move shows
      if (playerhasWon()) {
        declareWinner()
        return
      } 
      
      if (emptySpaceRemains() == false) {
        declareTie()
        return
      }
}


function checkClass() {
  if(playerOneTurn) {
  return ONE_CLASS
} else {
  return TWO_CLASS
};}

function emptySpaceRemains() {
  var innerHTMLempty = (insidebox) => insidebox.innerHTML===""
  console.log(arrayfromBoxes.some(innerHTMLempty))
  return (arrayfromBoxes.some(innerHTMLempty))
}

function declareTie() {
  setTimeout(alert ("TIE GAME"), 1000)}

function playerhasWon() {
    var indexOfSelected = arrayfromBoxes.reduce((indexOfSelected, box, idx) => {
        if (box.classList[1] === checkClass()) {
            indexOfSelected.push(idx);
        }
        return indexOfSelected;
    }, []);

   var isThereAWinner = winningTrios.some(trio => {
       return trio.every(i => indexOfSelected.includes(i))});
   return isThereAWinner
      }
  // TIP: console.log({isThereAWinner})

function declareWinner() {
  setTimeout(alert (checkClass() + " WINS"), 1000);
  for (let i=0; i < stylingOfBoxes.length; i++) {
    stylingOfBoxes[i].removeEventListener('click', boxmarked, {once: true});}
}
