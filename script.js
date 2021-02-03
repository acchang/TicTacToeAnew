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
const paralleBoard = [];

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
      
      if (emptySpaceRemains(origBoard) == false) {
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
        console.log(playerhasWon(origBoard))
        if (playerhasWon(origBoard)) {
        declareWinner()
        return
        } 
        if (emptySpaceRemains(origBoard) == false) {
        declareTie()
        return
        }
        swapTurns()
// ``}, 1000);
    } 
    if(playerTwoIdentity === "Smart AI") {
        bestAIMove(newBoard);
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


function checkClass() {
  if(playerOneTurn) {
  return ONE_CLASS
} else {
  return TWO_CLASS
};}

function emptySpaceRemains() {
  var innerHTMLempty = (insidebox) => insidebox.innerHTML===""
  return (origBoard.some(innerHTMLempty))
}

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
    // winningThreeIndexes[0].map((index) => {board[index].classList += ' winner'});
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

////////// BEGIN MINIMAX HERE //////////
// copy the html objects, you already have a function for generating
// So that might be helpful for manually copying them. 

const simpleBoard = origBoard.map(box => box.population < 3000000)



const newBoard = [...origBoard]
// try simple board to make minimax faster?

function bestAIMove(board) {
  console.log(board)
  let bestScore = -1000
  var move;
  let smartAIArray = listEmptySpaces(board);
  
  for (var i = 0; i < smartAIArray.length; i++) {
    var smartAIpicked = smartAIArray[i];
    console.log(smartAIArray)
    console.log(board)
    board[smartAIpicked].classList.add(TWO_CLASS);
    board[smartAIpicked].innerHTML = TWO_CLASS;
    // newBoard here is passby Value to minimax so it has i added
    console.log ("NEW test: " + smartAIpicked)
    console.log ("winner? " + playerhasWon(board))
    var score = minimax(board)
    // pass by ref so I GET the newBoard operated on by minimax
    console.log("score is " + score)
    console.log ("equal?  " + (board === newBoard))
      board[smartAIpicked].classList.remove(TWO_CLASS);
      board[smartAIpicked].innerHTML = "";
    console.log(smartAIArray)
  if (score > bestScore) {
    bestScore = score;
    move = smartAIpicked;
    console.log("move: " + move + " score: " + score);
  } 
}
origBoard[smartAIpicked].classList.add(TWO_CLASS);
origBoard[smartAIpicked].innerHTML = TWO_CLASS;
console.log (checkClass());
}

function minimax(board) {
  if (playerhasWon(board) &&  playerOneTurn) {
    console.log(board)
    return -10;
  } else if (playerhasWon(board) && !playerOneTurn) {
    console.log(board)
    return 10;
  } else if (emptySpaceRemains(board) === false) {
    console.log(board)
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
    return bestScore;
    }
   else {
    let bestScore = -100000; 
    console.log(board)
    let playerOneArray = listEmptySpaces(board);
    // newBoard has changed, which is why array doesn't work
    // bc newboard not passed by reference 
    console.log(playerOneArray);
    // this still retains the bestAIMove pick
    for (var i = 0; i < playerOneArray.length; i++) {
      let playerOnePicked = playerOneArray[i];
      board[playerOnePicked].classList.add(ONE_CLASS);
      board[playerOnePicked].innerHTML = ONE_CLASS;
      console.log ("P1 choice " + playerOnePicked)
      console.log ("winner? " + playerhasWon(board))
      let score = minimax(board)
      console.log ("equal?  " + (board === newBoard))
      console.log ("P1 score " + score);
      board[playerOnePicked].classList.remove(ONE_CLASS);
      board[playerOnePicked].innerHTML = "";
      // this is pass by value inside the minimax function
      // I need to pass by reference
      console.log(playerOneArray)
      console.log(board)
      if (score > bestScore) {
        bestScore = score}
      console.log("best score is " + bestScore)
      return bestScore
      }

  }
}



    // score is -10, I don't want it
    // P1 best case -10, 0, 10 ; best is 1000; score < best score
    // P2 best case 10, 0 -10 ; best is -1000; score > best score