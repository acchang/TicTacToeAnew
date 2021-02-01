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
        swapTurns()
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
function playerhasWon(board) {
    var indexOfSelected = board.reduce((indexOfSelected, box, idx) => {
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
    winningThreeIndexes[0].map((index) => {board[index].className += ' winner'});
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
  // initiate for loop here of smartAIArray[i]
  for (var i = 0; i < smartAIArray.length; i++) {
    let smartAIpicked = smartAIArray[i];
    origBoard[smartAIpicked].classList.add(TWO_CLASS);
    origBoard[smartAIpicked].innerHTML = TWO_CLASS;
       let score = minimax(origBoard)
  // score adds depth isMaximizing; false bc minimizing for O
      origBoard[smartAIpicked].classList.remove(TWO_CLASS);
      origBoard[smartAIpicked].innerHTML = "";
  if (score > bestScore) {
    bestScore = score
    move = smartAIpicked
  }
}
origBoard[move].classList.add(TWO_CLASS);
origBoard[move].innerHTML = TWO_CLASS;
}

// let scores = {
//   'X':1,
//   'O':-1,
//   'tie':0
// }

function minimax(board) {
  return 1;
}
  
  
  // , depth, isMaximizing) {
//   let result = playerhasWon()
//   if (result !== null) {
//     let score = scores[result];
//     return score
//   }

//   if (isMaximizing) {
//     let bestScore = -100000; 
//     var smartAIArray = listEmptySpaces();
//     let smartAIpicked = smartAIArray[0];
//     origBoard[smartAIpicked].classList.add(TWO_CLASS);
//     origBoard[smartAIpicked].innerHTML = TWO_CLASS;
//     let score = minimax(origBoard, depth + 1, false);
//     origBoard[smartAIpicked].classList.remove(TWO_CLASS);
//     origBoard[smartAIpicked].innerHTML = "";
//     if (score > bestScore){
//       bestScore = score}
//     return bestScore
//     }
//   }

// }















// function minimax(newBoard) {

//   var availSpots = listEmptySpaces();
//   // availSpots are the emptyspaces to run minmax on, it works on origboard and creates an array

// 	if (playerhasWon(newBoard) &&  playerOneTurn) {
// 		return {score: -10};
// 	} else if (playerhasWon(newBoard) && !playerOneTurn) {
// 		return {score: 10};
// 	} else if (emptySpaceRemains() == false) {
//     // I may need to update emptySpaceRemains() to evaluate on class based of ClassList vs innerHTML
// 		return {score: 0};
// 	}

//   var moves = [];

//   for (var i = 0; i < availSpots.length; i++) {
//     var move = {};
//     move.index = availSpots[i];
//     let minimaxClass = checkClass(); 
//     newBoard[availSpots[i]].classList.add(minimaxClass);
  
// 		if (checkClass() == TWO_CLASS) {
//     // if TWO_CLASS, score is 10
//       var result = minimax(newBoard);
//       console.log(result.score)
//       move.score = result.score;
// 		} else {
//     // if TWO_CLASS, score is -10
//       swapTurns()
//       var result = minimax(newBoard);
//       console.log(result.score)
//       move.score = result.score;
//       console.log(move.score)
//     }

//     // undo the updated gameboard for playerhasWon
//     newBoard[availSpots[i]].classList.remove(minimaxClass);
//     moves.push(move)
//     console.log(moves);
//   }
//   // I don't need to proceed to bestMove until I get an array that works

//   // Glossary: availSpots[i] = 8
//   // move.index = 8
//   // newBoard = [div.box.X etc]


// 	// var bestMove;
// 	// if(checkClass() === ONE_CLASS) {
// 	// 	var bestScore = -10000;
// 	// 	for(var i = 0; i < moves.length; i++) {
// 	// 		if (moves[i].score > bestScore) {
// 	// 			bestScore = moves[i].score;
// 	// 			bestMove = i;
// 	// 		}
// 	// 	}
// 	// } else {
// 	// 	var bestScore = 10000;
// 	// 	for(var i = 0; i < moves.length; i++) {
// 	// 		if (moves[i].score < bestScore) {
// 	// 			bestScore = moves[i].score;
// 	// 			bestMove = i;
// 	// 		}
// 	// 	}
// 	// }

//   // console.log(moves[bestMove]);
//   // return moves[bestMove];
// // bestMove is an array of objects, best move is the best one in the array
// }
// /// minimax generates a moves[bestmove] for bestspot.


