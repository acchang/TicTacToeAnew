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
var parallelBoard = [0,1,2,3,4,5,6,7,8];

function establishBoard() {
  for (let i = 0; i < origBoard.length; i++) {
    origBoard[i].addEventListener('click', boxmarked, {once: true});};

    origBoard.forEach(gridBox => {
    gridBox.classList.remove(ONE_CLASS)
    gridBox.classList.remove(TWO_CLASS)
    gridBox.classList.remove('winner')
    gridBox.innerHTML = ""
    });
    parallelBoard= [0,1,2,3,4,5,6,7,8]
  }

function boxmarked(e) {
  var parallelChoices = listParallelSpaces(parallelBoard);

    const index = origBoard.indexOf(e.target)
// how to consolidate? maybe I just let ONE_CLASS mark and then if the AI or player
// or do it even earlier and link it with playerTurn? 
    if(playerOneTurn) {
        origBoard[index].classList.add(ONE_CLASS)
        e.target.innerHTML = ONE_CLASS
        parallelBoard.splice(index, 1, ONE_CLASS)
      } else {
        origBoard[index].classList.add(TWO_CLASS)
        e.target.innerHTML = TWO_CLASS
        parallelBoard.splice(index, 1, TWO_CLASS)
      }

      if (playerhasWon(origBoard)) {
        declareWinner()
        return
      } 
      if (isThereATie(origBoard) == true) {
        declareTie()
        return
      }
    swapTurns()

    if(playerTwoIdentity === "Dumb AI") {
        var DumbAIArray = listEmptySpaces(origBoard)
  // setTimeout(() => {
        let dumbAIpicked = DumbAIArray[Math.floor(DumbAIArray.length * (Math.random()))]
        origBoard[dumbAIpicked].classList.add(TWO_CLASS)
        origBoard[dumbAIpicked].innerHTML = TWO_CLASS
        parallelBoard.splice(dumbAIpicked, 1, TWO_CLASS)
        if (playerhasWon(origBoard)) {
        declareWinner()
        return
        } 
        if (isThereATie(origBoard) == true) {
          declareTie()
          return
        }
        swapTurns()
// ``}, 1000);
    } 
    if(playerTwoIdentity === "Smart AI") {
      // var DumbAIArray = listEmptySpaces(origBoard)
      // // setTimeout(() => {
      //       let dumbAIpicked = DumbAIArray[Math.floor(DumbAIArray.length * (Math.random()))]
      //       origBoard[dumbAIpicked].classList.add(TWO_CLASS)
      //       origBoard[dumbAIpicked].innerHTML = TWO_CLASS
      //       parallelBoard.splice(dumbAIpicked, 1, TWO_CLASS)
      //       if (playerhasWon(origBoard)) {
      //       declareWinner()
      //       return
      //       } 
      //       if (isThereATie(origBoard) == true) {
      //         declareTie()
      //         return
      //       }
      //       swapTurns()

      bestAIMove();
        if (playerhasWon(origBoard)) {
        declareWinner()
        return
        } 
        if (isThereATie(origBoard) == true) {
          declareTie()
          return
        }
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

function isThereATie() {
  var allFilled = (insidebox) => insidebox.innerHTML !==""
  return (origBoard.every(allFilled))
}

function isThereATieParallel() {
  var allStrings = (obj) => typeof obj === "string"
  return (parallelBoard.every(allStrings))
}

function playerhasWon(board) {
    var indexOfSelected = board.reduce((indexOfSelected, box, idx) => {
        if (box.classList[1] === checkClass()) {
            indexOfSelected.push(idx);
        }
        return indexOfSelected;
    }, []);

  const winningThreeIndexes = winningTrios
  .map(trio => trio.filter(i => indexOfSelected.includes(i)))
  .filter(i => i.length === 3);
// map each trio and run filter, does indexOfSelected include trio?
// then filter such that the only one returned is the trio with 3 digits.

  if (winningThreeIndexes.length === 1) {
    winningThreeIndexes[0].map((index) => {board[index].classList += ' winner'});
    return true
  }  
    else {
      return false;
    }
}

function newCheckWin(board) {
  var indexOfParallel = board.reduce((indexOfParallel, obj, idx) => {
    if (obj === checkClass()) {
        indexOfParallel.push(idx);
    }
    return indexOfParallel;
  }, []);
    
  const winningThreeIndexes = winningTrios
  .map(trio => trio.filter(i => indexOfParallel.includes(i)))
  .filter(i => i.length === 3);

  if (winningThreeIndexes.length === 1) {
     return true
  }  
    else {
      return false;
    }

}

function declareTie() {
  setTimeout(alert ("TIE GAME"), 1000)}

function declareWinner() {
  setTimeout(alert (checkClass() + " WINS"), 1000);
  for (let i=0; i < origBoard.length; i++) {
    origBoard[i].removeEventListener('click', boxmarked, {once: true});}
}

function listEmptySpaces(board) {
  var acc = board.reduce((acc, box, idx) => {
   if (box.innerHTML === "") {
     acc.push(idx);
     }
     return acc;
   }, []);
   return acc;
 }

function listParallelSpaces(board) {
var acc = board.reduce((acc, obj, idx) => {
  if (typeof obj !== "string") {
    acc.push(idx);
    }
    return acc;
  }, [])
  return acc;
}

////////// BEGIN MINIMAX HERE //////////
function bestAIMove() {
  let bestScore = -1000
  var move;
  var parallelChoices = listParallelSpaces(parallelBoard);
  console.log("choices: " + parallelChoices)
  
  for (var i = 0; i < parallelChoices.length; i++) {
    var parallelPick = parallelChoices[i];
    parallelBoard.splice(parallelPick, 1, TWO_CLASS);
    console.log ("NEW test: " + parallelPick)
    console.log (parallelBoard)
    console.log ("winner? " + newCheckWin(parallelBoard))
    var score = minimax(parallelBoard)
    console.log("score is " + score)
    parallelBoard.splice(parallelPick, 1, parallelPick);
    console.log("Parallel board " + (parallelBoard))
    if (score > bestScore) {
    bestScore = score;
    move = parallelPick;
    console.log("move: " + move + " score: " + score);
  } 
}
origBoard[parallelPick].classList.add(TWO_CLASS);
origBoard[parallelPick].innerHTML = TWO_CLASS;
console.log (checkClass());
}

function minimax(board) {
  if (newCheckWin(board) &&  playerOneTurn) {
    console.log(board)
    return -10;
  } else if (newCheckWin(board) && !playerOneTurn) {
    console.log(board)
    return 10;
  } else if (isThereATieParallel(board) === true) {
    console.log(board)
    return 0;
  }
  swapTurns()

}

//   if (!playerOneTurn) {
//     let bestScore = 10000; 
//     const smartAIArray = listEmptySpaces(newBoard);
//     for (var i = 0; i < smartAIArray.length; i++) {
//       let smartAIpicked = smartAIArray[i];
//       newBoard[smartAIpicked].classList.add(TWO_CLASS);
//       newBoard[smartAIpicked].innerHTML = TWO_CLASS;
//         let score = minimax(newBoard)
//         console.log ("P2 choice " + smartAIpicked + " P2 score " + score)
//         newBoard[smartAIpicked].classList.remove(ONE_CLASS);
//         newBoard[smartAIpicked].innerHTML = "";
//         if (score < bestScore) {
//           bestScore = score}
//       }
//     return bestScore;
//     }
//    else {
//     let bestScore = -100000; 
//     console.log(board)
//     let playerOneArray = listEmptySpaces(board);
//     // newBoard has changed, which is why array doesn't work
//     // bc newboard not passed by reference 
//     console.log(playerOneArray);
//     // this still retains the bestAIMove pick
//     for (var i = 0; i < playerOneArray.length; i++) {
//       let playerOnePicked = playerOneArray[i];
//       board[playerOnePicked].classList.add(ONE_CLASS);
//       board[playerOnePicked].innerHTML = ONE_CLASS;
//       console.log ("P1 choice " + playerOnePicked)
//       console.log ("winner? " + playerhasWon(board))
//       let score = minimax(board)
//       console.log ("equal?  " + (board === newBoard))
//       console.log ("P1 score " + score);
//       board[playerOnePicked].classList.remove(ONE_CLASS);
//       board[playerOnePicked].innerHTML = "";
//       // this is pass by value inside the minimax function
//       // I need to pass by reference
//       console.log(playerOneArray)
//       console.log(board)
//       if (score > bestScore) {
//         bestScore = score}
//       console.log("best score is " + bestScore)
//       return bestScore
//       }

//   }
// }

//     // score is -10, I don't want it
//     // P1 best case -10, 0, 10 ; best is 1000; score < best score
//     // P2 best case 10, 0 -10 ; best is -1000; score > best score