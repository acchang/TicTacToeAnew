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
    if (playerTwoIdentity === "Smart AI")(smartAIwarning())
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


function smartAIwarning() { alert 
  ("Smart AI is not unbeatable. First move is random because making 8! or 40,320 tests is taxing! Sometimes we can be slow.")}

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
      if (playerhasWon()) {
        declareWinner()
        return
      } 
      if (isThereATie() == true) {
        declareTie()
        return
      }
    swapTurns()

    if(playerTwoIdentity === "Dumb AI") {dumbAIPlay()} 
    if(playerTwoIdentity === "Smart AI") {smartAIPlay()}
};

function smartAIPlay() {
  if(parallelBoard.includes("O") == false) {
    var DumbAIArray = listEmptySpaces()
    let dumbAIpicked = DumbAIArray[Math.floor(DumbAIArray.length * (Math.random()))]
    origBoard[dumbAIpicked].classList.add(TWO_CLASS)
    origBoard[dumbAIpicked].innerHTML = TWO_CLASS
    parallelBoard.splice(dumbAIpicked, 1, TWO_CLASS)
    swapTurns();
    return
  }
  bestAIMove();
    if (playerhasWon()) {
    declareWinner()
    return
    } 
    if (isThereATie() == true) {
    declareTie()
    return
    }
  playerOneTurn = true
};


function dumbAIPlay() {
  var DumbAIArray = listEmptySpaces()
  // setTimeout(() => {
    let dumbAIpicked = DumbAIArray[Math.floor(DumbAIArray.length * (Math.random()))]
    origBoard[dumbAIpicked].classList.add(TWO_CLASS)
    origBoard[dumbAIpicked].innerHTML = TWO_CLASS
    parallelBoard.splice(dumbAIpicked, 1, TWO_CLASS)
    if (playerhasWon()) {
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

function playerhasWon() {
    var indexOfSelected = origBoard.reduce((indexOfSelected, box, idx) => {
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
    winningThreeIndexes[0].map((index) => {origBoard[index].classList += ' winner'});
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

function listEmptySpaces() {
  var acc = origBoard.reduce((acc, box, idx) => {
   if (box.innerHTML === "") {
     acc.push(idx);
     }
     return acc;
   }, []);
   return acc;
 }

function listParallelSpaces() {
var acc = parallelBoard.reduce((acc, obj, idx) => {
  if (typeof obj !== "string") {
    acc.push(idx);
    }
    return acc;
  }, [])
  return acc;
}

////////// BEGIN MINIMAX HERE //////////
// It sort of works but I need to refine the recursion
// It goes in order, switching until it finds an end state
// but it does not branch out
// it takes the best of the curent terminal states
// recursion is shallow, X is not optimizing for itself
// also it's not declaring when O winds


function bestAIMove() {
  let bestScore = -10000
  var move;
  var parallelChoices = listParallelSpaces();

  for (var i = 0; i < parallelChoices.length; i++) {
    playerOneTurn = false;
    var parallelPick = parallelChoices[i];
    console.log("THIS IS ROUND " + (1 + parallelChoices.indexOf(parallelPick)));
    console.log("player: " +  checkClass())
    console.log("choices: " + parallelChoices);
    parallelBoard.splice(parallelPick, 1, TWO_CLASS);
    console.log ("NEW test: " + parallelPick)
    console.log (parallelBoard)
    console.log ("winner? " + newCheckWin())
    var score = minimax()
    console.log("KEY: " + parallelPick + " Score: " + score)
    parallelBoard.splice(parallelPick, 1, parallelPick);
    if (score > bestScore) {
    bestScore = score;
    move = parallelPick;
    console.log("BEST: " + bestScore + "move " + move);
  } 
}
parallelBoard.splice(move, 1, TWO_CLASS);
origBoard[move].classList.add(TWO_CLASS);
origBoard[move].innerHTML = TWO_CLASS;
console.log("player: " +  checkClass())
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
    return 2;
  }
  swapTurns()

  if (!playerOneTurn) {
    let bestScore = -10000; 
    var player2Choices = listParallelSpaces();
    for (var i = 0; i < player2Choices.length; i++) {
      playerOneTurn = false
      var player2Pick = player2Choices[i];
      console.log("p2 choices: " + player2Choices);
      console.log("player: " +  checkClass())
      parallelBoard.splice(player2Pick, 1,TWO_CLASS);
      console.log ("p2 test: " + player2Pick)
      console.log (parallelBoard)
      console.log ("p2 winner? " + newCheckWin())
      var score = minimax(parallelBoard)
      console.log("p2scoremax: " + score + " p2best score: " + bestScore)
      parallelBoard.splice(player2Pick, 1, player2Pick);
      if (score > bestScore) {
        bestScore = score
        console.log("player: " + checkClass() + " bestscore: " + bestScore);}
      }
      return bestScore
    }

   else {
    let bestScore = 100000; 
    var player1Choices = listParallelSpaces();

    for (var i = 0; i < player1Choices.length; i++) {
      playerOneTurn = true
      var player1Pick = player1Choices[i];
      console.log("p1 choices: " + player1Choices);
      console.log("player: " +  checkClass())
      parallelBoard.splice(player1Pick, 1,ONE_CLASS);
      console.log ("p1 test: " + player1Pick)
      console.log (parallelBoard)
      console.log ("p1 winner? " + newCheckWin())
      var score = minimax(parallelBoard)
      console.log("p1scoremin: " + score + " p1best score: " + bestScore)
      parallelBoard.splice(player1Pick, 1, player1Pick);
      if (score < bestScore) {
        bestScore = score
        console.log("player: " + checkClass() + " bestscore: " + bestScore);}
      }
      return bestScore
      // I want this to return -10 to top level bc I want him to avoid it
      // a tie at 0 would be better
    }
  } 

//     // score is -10, I don't want it
//     // P1 best case -10, 0, 10 ; best is 1000; score < best score
//     // P2 best case 10, 0 -10 ; best is -1000; score > best score


// A wins is -10 A > -10000
// B wins is +10 B < 10000