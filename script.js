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

// how to consolidate? maybe I just let ONE_CLASS mark and then if the AI or player
// or do it even earlier and link it with playerTurn? 

function boxmarked(e) {
    const index = origBoard.indexOf(e.target)
    if(playerOneTurn) {
        origBoard[index].classList.add(ONE_CLASS)
        e.target.innerHTML = ONE_CLASS
        parallelBoard.splice(index, 1, ONE_CLASS)
      } else {
        origBoard[index].classList.add(TWO_CLASS)
        e.target.innerHTML = TWO_CLASS
        parallelBoard.splice(index, 1, TWO_CLASS)
      }
      console.log("Newcheck: " + newCheckWin())
      if (playerhasWon(origBoard)) {
        declareWinner()
        return
      } 
      if (isThereATie(origBoard) == true) {
        declareTie()
        return
      }
    swapTurns()
    if(playerTwoIdentity === "Dumb AI") {dumbAIPlay()} 
    if(playerTwoIdentity === "Smart AI") {smartAIPlay()}
};

function smartAIPlay() {
  bestAIMove();
    if (playerhasWon(origBoard)) {
    declareWinner()
    return
    } 
    if (isThereATie(origBoard) == true) {
    declareTie()
    return
    }
    swapTurns()
};


function dumbAIPlay() {
  var DumbAIArray = listEmptySpaces(origBoard)
  // setTimeout(() => {
    let dumbAIpicked = DumbAIArray[Math.floor(DumbAIArray.length * (Math.random()))]
    origBoard[dumbAIpicked].classList.add(TWO_CLASS)
    origBoard[dumbAIpicked].innerHTML = TWO_CLASS
    parallelBoard.splice(dumbAIpicked, 1, TWO_CLASS)
    console.log(parallelBoard)
    console.log(playerhasWon(origBoard))
    console.log(newCheckWin(parallelBoard))
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

function newCheckWin() {
  var indexOfParallel = parallelBoard.reduce((indexOfParallel, obj, idx) => {
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

  for (var i = 0; i < parallelChoices.length; i++) {
    var parallelPick = parallelChoices[i];
    console.log("choices: " + parallelChoices);
    parallelBoard.splice(parallelPick, 1, TWO_CLASS);
    console.log ("NEW test: " + parallelPick)
    console.log (parallelBoard)
    console.log ("winner? " + newCheckWin(parallelBoard))
// newCheckWin is not working
    var score = minimax(parallelBoard)
    console.log("score is " + score)
    parallelBoard.splice(parallelPick, 1, parallelPick);
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

function minimax() {
  if (newCheckWin() &&  playerOneTurn) {
    console.log(parallelBoard)
    return -10;
  } else if (newCheckWin() && !playerOneTurn) {
    console.log(parallelBoard)
    return 10;
  } else if (isThereATieParallel() === true) {
    console.log(parallelBoard)
    return 0;
  }
  swapTurns()

  if (!playerOneTurn) {
    let bestScore = 10000; 
    const smartAIArray = listEmptySpaces(newBoard);
    for (var i = 0; i < smartAIArray.length; i++) {
      let smartAIpicked = smartAIArray[i];
      newBoard[smartAIpicked].classList.add(TWO_CLASS);
      newBoard[smartAIpicked].innerHTML = TWO_CLASS;
      let score = minimax(newBoard)
      console.log ("P2 choice " + smartAIpicked + " P2 score " + score)
      newBoard[smartAIpicked].classList.remove(ONE_CLASS);
      newBoard[smartAIpicked].innerHTML = "";
      if (score < bestScore) {
        bestScore = score}
      }
      return bestScore
    }

   else {
    let bestScore = -100000; 
    var parallelChoices = listParallelSpaces(parallelBoard);
    for (var i = 0; i < parallelChoices.length; i++) {
      var parallelPick = parallelChoices[i];
      console.log("choices: " + parallelChoices);
      parallelBoard.splice(parallelPick, 1, TWO_CLASS);
      console.log ("NEW test: " + parallelPick)
      console.log (parallelBoard)
      console.log ("winner? " + newCheckWin(parallelBoard))
      var score = minimax(parallelBoard)
      console.log("score is " + score)
      parallelBoard.splice(parallelPick, 1, parallelPick);
      if (score > bestScore) {
        bestScore = score}
      console.log("best score is " + bestScore)
      }
      return bestScore
    }
  } 

//     // score is -10, I don't want it
//     // P1 best case -10, 0, 10 ; best is 1000; score < best score
//     // P2 best case 10, 0 -10 ; best is -1000; score > best score