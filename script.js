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
  if (ONE_CLASS == undefined || playerTwoIdentity == undefined) 
  {alert ("Make sure players are defined")}
  console.log("player 1 = " + ONE_CLASS + ", player 2 = " + playerTwoIdentity)
  drawBoard();
  playerOneTurn = true;
}

const arrayfromBoxes = Array.from(document.getElementsByClassName('box'));

function drawBoard() {
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


// var AIArray = arrayfromBoxes.reduce((AIArray, box, idx) => {
//   if (box.innerHTML === "") {
//     AIArray.push(idx);
//     }
//     return AIArray;
//   }, []);

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

function playerhasWon() {
    var indexOfSelected = arrayfromBoxes.reduce((indexOfSelected, box, idx) => {
        if (box.classList[1] === checkClass()) {
            indexOfSelected.push(idx);
        }
        return indexOfSelected;
    }, []);

  const winningThreeIndexes = winningTrios
  .map(trio => trio.filter(i => indexOfSelected.includes(i)))
  .filter(i => i.length === 3);

  console.log(winningThreeIndexes)
  console.log(winningThreeIndexes.length)

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

    /// need a function to get availspots
  var availSpots = listEmptySpaces();

	if (playerhasWon() &&  playerOneTurn) {
		return {score: -10};
	} else if (playerhasWon() && !playerOneTurn) {
		return {score: 10};
	} else if (emptySpaceRemains() == false) {
		return {score: 0};
	}

  //// this is the key code, what is var move = {}? START HERE
  var moves = [];
  for (var i = 0; i < availSpots.length; i++) {
    var move = {};

    // take the availble spots on the new board, what are these?
		move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;


  //// recursively run minimax(the whole program, on new board, which player)
  //// get a result from the board
  //// score the result from the if
  //// that's called a move.score
		if (player == aiPlayer) {
			var result = minimax(newBoard, huPlayer);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, aiPlayer);
			move.score = result.score;
		}
  //// I think I understand this above

  //// what is this?
		newBoard[availSpots[i]] = move.index;
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
//// I understand above


  return moves[bestMove];
//// bestMove is an index, so minimax yields or returns one of the moves, but moves is an array of scores
// what is a representation of what is generated here?
}

/// I have some of the mechanics down, but how deep in does it analyze (it has to be more than 9)?
/// where in the code is it switching to the other player?


/// minimax generates a moves[bestmove] for bestspot.
/// bestspot takes the board and player
function bestSpot() {
  return minimax(origBoard, aiPlayer).index;
  /// index of moves[bestMove] goes into turnClick
}

/// bestspot gets put into turnclick to be played
function turnClick(square) {
	if (typeof origBoard[square.target.id] == 'number') {
		turn(square.target.id, huPlayer)
		if (!checkWin(origBoard, huPlayer) && !checkTie()) turn(bestSpot(), aiPlayer);}}