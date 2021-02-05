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

const tipDetail = {
  undefined: " can choose any",
  0: " should pick top left",
  1: " should pick top middle",
  2: " should pick top right",
  3: " should pick middle left",
  4: " should pick dead center",
  5: " should pick middle right",
  6: " should pick bottom left",
  7: " should pick bottom center",
  8: " should pick bottom right"
}

var ONE_CLASS
var TWO_CLASS
var suggestion
var parallelBoard = [0,1,2,3,4,5,6,7,8]
var playerTwoIdentity
var playerOneTurn 

const btn = document.querySelector('#PlayerOneSymbol');
const proceedButton = document.getElementById('proceedButton');
const roundEndedElement = document.getElementById('roundEnded');
const roundEndedText = document.querySelector('[roundEndedtext]');
const origBoard = Array.from(document.getElementsByClassName('box'));

proceedButton.addEventListener('click', proceed)
restartBtn.addEventListener('click', startGame);
hintBtn.addEventListener('click', hintButtonHit);


// document.getElementById("AIhelp").innerHTML = suggestion.toString()
// document.getElementById("AIhelp").innerHTML = tipDetail[suggestion];

btn.onclick = function () {
    const XOs = document.querySelectorAll('input[name="choice"]');
    for (const XO of XOs) {
        if (XO.checked) {
          ONE_CLASS = XO.value
          TWO_CLASS = XO.value == 'X' ? 'O' : 'X'
          alert("First Move Belongs to " + ONE_CLASS);
          break;
        }
    }
    };
  
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


function proceed() {
  roundEnded.classList.remove('show')
  establishBoard()
}

function swapTurns() {
  playerOneTurn = !playerOneTurn
};

function hintButtonHit() {
  if (ONE_CLASS == undefined || playerTwoIdentity == undefined) {
    alert ("Make sure both players are defined");
  } else {
  alert("Player " + ONE_CLASS + tipDetail[suggestion])}
}

function startGame() {
  if (ONE_CLASS == undefined || playerTwoIdentity == undefined) {
    alert ("Make sure both players are defined");
  }
  console.log("player 1 = " + ONE_CLASS + ", player 2 = " + playerTwoIdentity)
  establishBoard()
  playerOneTurn = true;
}

function establishBoard() {
  if (ONE_CLASS !== undefined || playerTwoIdentity !== undefined) {
    for (let i = 0; i < origBoard.length; i++) {
    origBoard[i].addEventListener('click', boxmarked, {once: true});};

    origBoard.forEach(gridBox => {
    gridBox.classList.remove(ONE_CLASS)
    gridBox.classList.remove(TWO_CLASS)
    gridBox.classList.remove('winner')
    gridBox.innerHTML = ""
    })
      };
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
        suggestedAIMove()
        swapTurns()
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
  if(parallelBoard.includes(TWO_CLASS) == false) {
    let smartAIstart
    var smartAIchoices = listEmptySpaces().filter(i => i%2 == 0) 
      if (smartAIchoices.includes(4) == true) {smartAIstart = 4}
        else {smartAIstart = smartAIchoices[Math.floor(smartAIchoices.length * (Math.random()))]}
      console.log(listEmptySpaces())
      console.log(smartAIchoices)
    origBoard[smartAIstart].classList.add(TWO_CLASS)
    origBoard[smartAIstart].innerHTML = TWO_CLASS
    parallelBoard.splice(smartAIstart, 1, TWO_CLASS)
    suggestedAIMove()
    console.log("smart AI play" + checkClass())
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
    suggestedAIMove()
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

  if (winningThreeIndexes.length === 1 || winningThreeIndexes.length === 2) {
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
  roundEndedText.innerText = 'Draw!';
  roundEnded.classList.add('show');
}

function declareWinner() {
  roundEndedText.innerText = checkClass() + " WINS";
  roundEnded.classList.add('show');
  // setTimeout(alert (checkClass() + " WINS"), 1000);
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


function suggestedAIMove() {
  let bestScore = 10000
  var yourParallelChoices = listParallelSpaces()

  if(yourParallelChoices.length > 6){
    var suggestedAIchoices = listEmptySpaces().filter(i => i%2 == 0) 
      if (suggestedAIchoices.includes(4) == true) {suggestion = 4}
        else {suggestion = suggestedAIchoices[Math.floor(suggestedAIchoices.length * (Math.random()))]}
        console.log("suggestion is " + suggestion);
        swapTurns();
        return
      }
  
  for (var i = 0; i < yourParallelChoices.length; i++) {
    playerOneTurn = true;
    var yourParallelPick = yourParallelChoices[i];
    console.log("YOUR ROUND " + (1 + yourParallelChoices.indexOf(yourParallelPick)));
    console.log("player: " +  checkClass() + ", choices: " + yourParallelChoices)
    parallelBoard.splice(yourParallelPick, 1, ONE_CLASS);
    console.log ("You " +  checkClass() + " picks "  + yourParallelPick)
    console.log ("winner? " + newCheckWin())
    var score = minimax()
    console.log ("score " + score)
    parallelBoard.splice(yourParallelPick, 1, yourParallelPick);
    if (score < bestScore) {
    bestScore = score;
    suggestion = yourParallelPick;
    console.log("YOUR BEST for " + checkClass() + " " + suggestion + " is " + bestScore);
  } 
}
playerOneTurn = true;
console.log("SUGGESTION is " + suggestion)
}

function bestAIMove() {
  let bestScore = -10000
  var move;
  var parallelChoices = listParallelSpaces();

  for (var i = 0; i < parallelChoices.length; i++) {
    playerOneTurn = false;
    var parallelPick = parallelChoices[i];
    console.log("THIS IS MAIN ROUND " + (1 + parallelChoices.indexOf(parallelPick)));
    console.log("player: " +  checkClass() + ", choices: " + parallelChoices)
    parallelBoard.splice(parallelPick, 1, TWO_CLASS);
    console.log ("AI " +  checkClass() + " picks "  + parallelPick)
    console.log ("winner? " + newCheckWin())
    var score = minimax()
    playerOneTurn = false;
    console.log("AI " +  checkClass() + " picks " + parallelPick + ", gets " + score)
    parallelBoard.splice(parallelPick, 1, parallelPick);
    if (score > bestScore) {
    bestScore = score;
    move = parallelPick;
    console.log("MAIN BEST for " + move + " is " + bestScore);
  } 
}
playerOneTurn = false;
parallelBoard.splice(move, 1, TWO_CLASS);
origBoard[move].classList.add(TWO_CLASS);
origBoard[move].innerHTML = TWO_CLASS;
console.log("Board changed with " + checkClass() + " in " + move)
suggestedAIMove()
console.log("best AI " + checkClass())
}

function minimax() {
  if (newCheckWin() &&  playerOneTurn) {
    return -10;
  } else if (newCheckWin() && !playerOneTurn) {
    return 10;
  } else if (isThereATieParallel() === true) {
    return 2;
  }
  swapTurns()

  if (!playerOneTurn) {
    let bestScore = -10000; 
    var player2Choices = listParallelSpaces();
    for (var i = 0; i < player2Choices.length; i++) {
      playerOneTurn = false
      var player2Pick = player2Choices[i];
      console.log("Minimizer " + checkClass() + " picks " + player2Pick + " from " + player2Choices);
      parallelBoard.splice(player2Pick, 1,TWO_CLASS);
      var score = minimax(parallelBoard)
      console.log("Minimizer " +  checkClass() +  " picked " + player2Pick + ", scores " + score)
      parallelBoard.splice(player2Pick, 1, player2Pick);
      if (score > bestScore) {
        bestScore = score
        console.log("Minimizer BEST for " + player2Pick + " is " + bestScore);}
      }
      return bestScore
    }

   else {
    let bestScore = 100000; 
    var player1Choices = listParallelSpaces();

    for (var i = 0; i < player1Choices.length; i++) {
      playerOneTurn = true
      var player1Pick = player1Choices[i];
      console.log("Maximizer " + checkClass() + " picks " + player1Pick + " from " + player1Choices);
      parallelBoard.splice(player1Pick, 1,ONE_CLASS);
      var score = minimax(parallelBoard)
      console.log("Maximizer " +  checkClass() +  " picked " + player1Pick + ", scores " + score)
      parallelBoard.splice(player1Pick, 1, player1Pick);
      if (score < bestScore) {
        bestScore = score
        bestScore = score
        console.log("Maximizer BEST for " + player1Pick + " is " + bestScore);}
      }
      return bestScore
    }
  } 
