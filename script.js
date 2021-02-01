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
  console.log(origBoard)
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
        
        var AIArray = listEmptySpaces()
        console.log(AIArray)
  // setTimeout(() => {
        let dumbAIpicked = AIArray[Math.floor(AIArray.length * (Math.random()))]
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

    else if(playerTwoIdentity === "Smart AI"){
      // alert("Smart AI not working yet")}

    // call minimax on the board minimax()
// function turnClick(square) {
// 	if (typeof origBoard[square.target.id] == 'number') {
// 		turn(square.target.id, huPlayer)
// 		if (!checkWin(origBoard, huPlayer) && !checkTie()) turn(bestSpot(), aiPlayer);
//   }

// var smartAIpicked = bestSpot();

//         origBoard[smartAIpicked].classList.add(TWO_CLASS)
//         origBoard[smartAIpicked].innerHTML = TWO_CLASS

//         if (playerhasWon(origBoard)) {
//         declareWinner()
//         return
//         } 
//         if (emptySpaceRemains() == false) {
//         declareTie()
//         return
//         }
//         swapTurns()
    }

else { console.log("Human")
      }
}

function bestSpot() {
	return minimax(origBoard, aiPlayer).index;
}
  /// this is just the index of bestMove 


function listEmptySpaces() {
 var acc = origBoard.reduce((acc, box, idx) => {
  if (box.innerHTML === "") {
    acc.push(idx);
    }
    return acc;
  }, []);
  console.log(acc)
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
  console.log("is there empty space?" + origBoard.some(innerHTMLempty))
  // returns true or false
  return (origBoard.some(innerHTMLempty))
}

// function playerhasWon() evaluates board
function playerhasWon(board) {
    console.log (board)
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

  console.log("win index " + winningThreeIndexes)
  console.log("win index length" + winningThreeIndexes.length)

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

function minimax(newBoard, player) {

  var availSpots = listEmptySpaces();
  // availSpots are the emptyspaces to run minmax on, it works on origboard and creates an array

	if (playerhasWon() &&  playerOneTurn) {
		return {score: -10};
	} else if (playerhasWon() && !playerOneTurn) {
		return {score: 10};
	} else if (emptySpaceRemains() == false) {
    // I may need to update emptySpaceRemains() to evaluate on class based of ClassList vs innerHTML
		return {score: 0};
	}

   var moves = [];
  for (var i = 0; i < availSpots.length; i++) {
    var move = {};
    move.index = newBoard[availSpots[i]];
  // newboard is an empty array, with the first i corresponding to the first # in avail spots [7,8,9]
    newBoard[availSpots[i]].classList[1] = checkClass();
  // put marker in the classList of availSpots of newboard matchings playing class [X,8,9]
  // *** how are the markers from origboard retained?

////////// PROCEED TO HERE -- use  if (box.classList[1] === checkClass()) and this, which is true/false
// function swapTurns() {
//   playerOneTurn = !playerOneTurn
// };

// was: 		if (player == aiPlayer)
		if (checkClass() == TWO_CLASS) {
			var result = minimax(newBoard);
      move.score = result.score;
    // in the object "move", there is a quality, "score," that gets result.score
		} else {
      swapTurns()
			var result = minimax(newBoard);
			move.score = result.score;
		}
    newBoard[availSpots[i]] = move.index;
    moves.push(move);
	}

	var bestMove;
	if(checkClass() === ONE_CLASS) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

  return moves[bestMove];
//// bestMove is an array of objects, best move is the best one in the array
}
/// minimax generates a moves[bestmove] for bestspot.


