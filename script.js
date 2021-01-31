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

const arrayfromBoxes = Array.from(document.getElementsByClassName('box'));

var board = arrayfromBoxes

function establishBoard() {
  console.log(arrayfromBoxes)
  for (let i = 0; i < arrayfromBoxes.length; i++) {
    arrayfromBoxes[i].addEventListener('click', boxmarked, {once: true});}
    arrayfromBoxes.forEach(gridBox => {
    gridBox.classList.remove(ONE_CLASS)
    gridBox.classList.remove(TWO_CLASS)
    gridBox.classList.remove('winner')
    gridBox.innerHTML = ""
    })
    }

function boxmarked(e) {
    const index = arrayfromBoxes.indexOf(e.target)
// how to consolidate? maybe I just let ONE_CLASS mark and then if the AI or player
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

        if(playerTwoIdentity === "Dumb AI") {
        
        var AIArray = listEmptySpaces()
        console.log(AIArray)
  // setTimeout(() => {
        let dumbAIpicked = AIArray[Math.floor(AIArray.length * (Math.random()))]
        arrayfromBoxes[dumbAIpicked].classList.add(TWO_CLASS)
        arrayfromBoxes[dumbAIpicked].innerHTML = TWO_CLASS

        if (playerhasWon()) {
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

    else if(playerTwoIdentity === "Smart AI"){alert("Smart AI not working yet")}
// call minimax on the board minimax()


else { console.log("Human")
      }
}

function listEmptySpaces() {
 var acc = arrayfromBoxes.reduce((acc, box, idx) => {
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

function emptySpaceRemains() {
  var innerHTMLempty = (insidebox) => insidebox.innerHTML===""
  console.log("is there empty space?" + arrayfromBoxes.some(innerHTMLempty))
  // returns true or false
  return (arrayfromBoxes.some(innerHTMLempty))
}

function declareTie() {
  setTimeout(alert ("TIE GAME"), 1000)}

/// arrayfromBoxes needs to be its own gameboard that can be evaluated
function playerhasWon() {
    var indexOfSelected = arrayfromBoxes.reduce((indexOfSelected, box, idx) => {
        if (box.classList[1] === checkClass()) {
            indexOfSelected.push(idx);
        }
        return indexOfSelected;
    }, []);
/// 

  const winningThreeIndexes = winningTrios
  .map(trio => trio.filter(i => indexOfSelected.includes(i)))
  .filter(i => i.length === 3);

  console.log("win index" + winningThreeIndexes)
  console.log("win index length" + winningThreeIndexes.length)

  if (winningThreeIndexes.length === 1) {winningThreeIndexes[0].map((index) => {arrayfromBoxes[index].className += ' winner'})}
 
   var isThereAWinner = 
    winningTrios.some(trio => {return trio.every(i => indexOfSelected.includes(i))});
       console.log[{indexOfSelected}]
       console.log({isThereAWinner});
   return isThereAWinner
      }

function declareWinner() {
  setTimeout(alert (checkClass() + " WINS"), 1000);
  for (let i=0; i < arrayfromBoxes.length; i++) {
    arrayfromBoxes[i].removeEventListener('click', boxmarked, {once: true});}
}

////////// BEGIN MINIMAX HERE //////////

function minimax(newBoard, player) {
  /// I may need an old board/new board
  /// his checkwin function takes as an input any board so that either can be put into it
  /// for him, origBoard = Array.from(Array(9).keys());
  /// arrayfromBoxes is my origBoard that can go into the playerhaswon function

  var availSpots = listEmptySpaces();

	if (playerhasWon() &&  playerOneTurn) {
		return {score: -10};
	} else if (playerhasWon() && !playerOneTurn) {
		return {score: 10};
	} else if (emptySpaceRemains() == false) {
		return {score: 0};
	}

   var moves = [];
  for (var i = 0; i < availSpots.length; i++) {
    var move = {};
  // move {index:7} is from availSpots[0] of newBoard, which is 7.
    move.index = newBoard[availSpots[i]];
  // availSpots that tells you what's available on the new board, spots added to move obj
  // newBoard keeps getting redrawn each time?
    newBoard[availSpots[i]] = player;
  // put an "X" in availSpots of newboard, place[0]

  //// recursively run minimax(the whole program, on new board, which player)
  //// get a result from the board
  //// score the result from the if
  //// that's called a move.score
		if (player == aiPlayer) {
			var result = minimax(newBoard, huPlayer);
      move.score = result.score;
    // in the object "move", there is a quality, "score," that gets result.score
		} else {
			var result = minimax(newBoard, aiPlayer);
			move.score = result.score;
		}
    newBoard[availSpots[i]] = move.index;
  // ?????? I'm stuck here, it's the opposite of earlier in the for loop move.index = newBoard[availSpots[i]];
//  newBoard[availSpots[i]] --> move.index; player --> newBoard[availSpots[i]]; move.index --> newBoard[availSpots[i]]
// this is in preparaton for the next i in the for loop, the marker goes away and the index returns?

    moves.push(move);
	}

///// this is a checking mechanism
//// if the score from moves at any one point is better than the existing best score
//// make it the best score
//// bestMove is i, best Move is the index of where the best score is in the array
//// this implies the scores are put into moves array according to their space in the grid
	var bestMove;
	if(player === aiPlayer) {
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
/// bestspot takes the board and player
function bestSpot() {
  return minimax(origBoard, aiPlayer).index;
  /// this is just the index of bestMove 
}

