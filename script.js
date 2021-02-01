// solve the alert issue with a hidden div that shows when won

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
    alert("First Move Belongs to " + ONE_CLASS);
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
    alert("Your Opponent is "  + playerTwoIdentity)
    };

var playerOneTurn 
    
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
  if (ONE_CLASS == undefined || playerTwoIdentity == undefined) 
  {alert ("Make sure players are defined")}
  console.log("player 1 = " + ONE_CLASS + ", player 2 = " + playerTwoIdentity)
  establishBoard();
  playerOneTurn = true;
}

const origBoard = Array.from(document.getElementsByClassName('box'));

function establishBoard() {
  for (let i = 0; i < origBoard.length; i++) {
    origBoard[i].addEventListener('click', boxmarked, {once: true});}
    origBoard.forEach(gridBox => {
    gridBox.classList.remove(ONE_CLASS)
    gridBox.classList.remove(TWO_CLASS)
    gridBox.classList.remove('winner')
    gridBox.innerHTML = ""
    })
    }

function boxmarked(e) {
    const index = origBoard.indexOf(e.target)
// how to consolidate? maybe I just let ONE_CLASS mark and then if the AI or player
// or do it even earlier and link it with playerTurn? 
    if(playerOneTurn) {
        origBoard[index].classList.add(ONE_CLASS)
        e.target.innerHTML = ONE_CLASS
      } else {
        origBoard[index].classList.add(TWO_CLASS)
        e.target.innerHTML = TWO_CLASS
      }

      if (playerhasWon(origBoard)) {
        declareWinner()
        return
      } 
      
      if (emptySpaceRemains() == false) {
        declareTie()
        return
      }
    swapTurns()

    if(playerTwoIdentity === "Dumb AI") {
        
        var DumbAIArray = listEmptySpaces()
  // setTimeout(() => {
        let dumbAIpicked = DumbAIArray[Math.floor(AIArray.length * (Math.random()))]
        origBoard[dumbAIpicked].classList.add(TWO_CLASS)
        origBoard[dumbAIpicked].innerHTML = TWO_CLASS

        if (playerhasWon(origBoard)) {
        declareWinner()
        return
        } 
        if (emptySpaceRemains() == false) {
        declareTie()
        return
        }
        swapTurns()
// ``}, 1000);
    } 

    if(playerTwoIdentity === "Smart AI") {
      // alert("Smart AI not working yet")

    // call minimax on the board minimax()
// function turnClick(square) {
// 	if (typeof origBoard[square.target.id] == 'number') {
// 		turn(square.target.id, huPlayer)
// 		if (!checkWin(origBoard, huPlayer) && !checkTie()) turn(bestSpot(), aiPlayer);
//   }

// var smartAIpicked = bestSpot();
//         origBoard[smartAIpicked].classList.add(TWO_CLASS)
//         origBoard[smartAIpicked].innerHTML = TWO_CLASS

        bestAIMove()
        if (playerhasWon(origBoard)) {
        declareWinner()
        return
        } 
        if (emptySpaceRemains() == false) {
        declareTie()
        return
        }
  }

else { console.log("Human")
      }
}

function bestSpot() {
	return minimax(origBoard);
}
  /// this is just the index of bestMove 


function listEmptySpaces() {
 var acc = origBoard.reduce((acc, box, idx) => {
  if (box.innerHTML === "") {
    acc.push(idx);
    }
    return acc;
  }, []);
  return acc;
}

function checkClass() {
  if(playerOneTurn) {
  return ONE_CLASS
} else {
  return TWO_CLASS
};}

// function emptySpaceRemains() evaluates board
function emptySpaceRemains() {
  var innerHTMLempty = (insidebox) => insidebox.innerHTML===""
  // returns true or false
  return (origBoard.some(innerHTMLempty))
}

// function playerhasWon() evaluates board
function playerhasWon() {
    var indexOfSelected = origBoard.reduce((indexOfSelected, box, idx) => {
        if (box.classList[1] === checkClass()) {
            indexOfSelected.push(idx);
        }
        return indexOfSelected;
    }, []);
// first you get the index of everything selected by the current player

  const winningThreeIndexes = winningTrios
  .map(trio => trio.filter(i => indexOfSelected.includes(i)))
  .filter(i => i.length === 3);
// get the const by mapping each trio and run filter, does indexOfSelected include trio?
// then filter such that the only one returned is the trio with 3 digits.

  if (winningThreeIndexes.length === 1) {
    winningThreeIndexes[0].map((index) => {origBoard[index].className += ' winner'});
    return true
  }  
      }


function declareTie() {
  setTimeout(alert ("TIE GAME"), 1000)}

function declareWinner() {
  setTimeout(alert (checkClass() + " WINS"), 1000);
  for (let i=0; i < origBoard.length; i++) {
    origBoard[i].removeEventListener('click', boxmarked, {once: true});}
}

////////// BEGIN MINIMAX HERE //////////
// do I need a player constant? playerhasWon works by if box.classList[1] === checkClass()
// I can play dumbAI and switch at last minute to Smart



function bestAIMove() {
  var smartAIArray = listEmptySpaces();
  let bestScore = -100000
  var move;
  for (var i = 0; i < smartAIArray.length; i++) {
    let smartAIpicked = smartAIArray[i];
    origBoard[smartAIpicked].classList.add(TWO_CLASS);
    origBoard[smartAIpicked].innerHTML = TWO_CLASS;
      let score = minimax(origBoard)
      origBoard[smartAIpicked].classList.remove(TWO_CLASS);
      origBoard[smartAIpicked].innerHTML = "";
  if (score > bestScore) {
    bestScore = score;
    move = smartAIpicked;
    console.log(move)
  } 
}
origBoard[move].classList.add(TWO_CLASS);
origBoard[move].innerHTML = TWO_CLASS;
}

function minimax() {
// minimax's role is to loop through and find the score
  if (playerhasWon() &&  playerOneTurn) {
    return -10;
  } else if (playerhasWon() && !playerOneTurn) {
    return 10;
  } else if (emptySpaceRemains() == false) {
    return 0;
  }
  swapTurns()

// this recursive part is the problem
// I don't know how to look steps ahead; might need to combine it with others' techniques

  if (!playerOneTurn) {
    let bestScore = -100000; 
    var smartAIArray = listEmptySpaces();
    for (var i = 0; i < smartAIArray.length; i++) {
      let smartAIpicked = smartAIArray[i];
      origBoard[smartAIpicked].classList.add(TWO_CLASS);
      origBoard[smartAIpicked].innerHTML = TWO_CLASS;
        let score = minimax(origBoard)
// Schiffman uses isMax T/F, does the clearing not happen until a terminal state?
// what about all the other ones tried?
        origBoard[smartAIpicked].classList.remove(TWO_CLASS);
        origBoard[smartAIpicked].innerHTML = "";
        if (score > bestScore) {
          bestScore = score}
      }
    return bestScore;
    }
   else {
    let bestScore = 100000; 
    var smartAIArray = listEmptySpaces();
    for (var i = 0; i < smartAIArray.length; i++) {
      let smartAIpicked = smartAIArray[i];
      origBoard[smartAIpicked].classList.add(ONE_CLASS);
      origBoard[smartAIpicked].innerHTML = ONE_CLASS;
        let score = minimax(origBoard)
      origBoard[smartAIpicked].classList.remove(ONE_CLASS);
      origBoard[smartAIpicked].innerHTML = "";
      if (score < bestScore) {
        bestScore = score}
      }
    return bestScore;
  }
}





