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
const stylingOfBoxes = document.querySelectorAll('.box');

function drawBoard() {
  console.log(stylingOfBoxes)
  for (let i = 0; i < stylingOfBoxes.length; i++) {
  stylingOfBoxes[i].addEventListener('click', boxmarked, {once: true});}
    stylingOfBoxes.forEach(gridBox => {
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

      var dumbAIArray = arrayfromBoxes.reduce((dumbAIArray, box, idx) => {
        if (box.innerHTML === "") {
          dumbAIArray.push(idx);
          }
          return dumbAIArray;
        }, []);

  setTimeout(() => {
        let dumbAIpicked = dumbAIArray[Math.floor(dumbAIArray.length * (Math.random()))]
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
``}, 1000);
    } 
else { console.log("Human")
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

  const winningThreeIndexes = winningTrios
  .map(trio => trio.filter(i => indexOfSelected.includes(i)))
  .filter(i => i.length === 3);

  console.log(winningThreeIndexes)
  console.log(winningThreeIndexes.length)

  if (winningThreeIndexes.length === 1) {winningThreeIndexes[0].map((index) => {arrayfromBoxes[index].className += ' winner'})}
 
   var isThereAWinner = 
    winningTrios.some(trio => {return trio.every(i => indexOfSelected.includes(i))});
       console.log({isThereAWinner});
   return isThereAWinner
      }

function declareWinner() {
  setTimeout(alert (checkClass() + " WINS"), 1000);
  for (let i=0; i < stylingOfBoxes.length; i++) {
    stylingOfBoxes[i].removeEventListener('click', boxmarked, {once: true});}
}


//////////////////

function minimax(newBoard, player) {
	var availSpots = emptySquares();

	if (checkWin(newBoard, huPlayer)) {
		return {score: -10};
	} else if (checkWin(newBoard, aiPlayer)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}

  //// this is the key code:
  var moves = [];
  for (var i = 0; i < availSpots.length; i++) {

    var move = {};

    // take the availble spots on the new board
		move.index = newBoard[availSpots[i]];
    
    newBoard[availSpots[i]] = player;

  //// this scores the move
		if (player == aiPlayer) {
			var result = minimax(newBoard, huPlayer);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, aiPlayer);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

  /////
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
}
