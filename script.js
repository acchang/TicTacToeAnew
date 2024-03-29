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
const statusDiv = document.querySelector('.isPlaying');

proceedButton.addEventListener('click', proceed)
restartBtn.addEventListener('click', startGame);
hintBtn.addEventListener('click', hintButtonHit);


// document.getElementById("isPlaying").innerHTML = checkClass()

// document.getElementById("AIhelp").innerHTML = suggestion.toString()
// document.getElementById("AIhelp").innerHTML = tipDetail[suggestion];

// below, "input[name]" is for player marker and type of game
// the code is a litle confusing.

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


// this removes the win boxes highlighted in yellow and starts anew.
function proceed() {
  roundEnded.classList.remove('show')
  establishBoard()
}

// swaps and then updates the const statusDiv which shows on board
function swapTurns() {
  playerOneTurn = !playerOneTurn;
  statusDiv.innerHTML = checkClass();
;};

// this is the one that only hints for player one
// tipDetail is basically a lookup table using an array.

function hintButtonHit() {
  if (parallelBoard.includes("X", "O") === false ) {
    alert ("Not enough info to suggest.")
  } else {
  alert("Player " + ONE_CLASS + tipDetail[suggestion]+ ". No hint for Player " + TWO_CLASS + ".")}
}

function startGame() {
  if (ONE_CLASS == undefined || playerTwoIdentity == undefined) {
    alert ("Make sure both players are defined");
  }
  console.log("player 1 = " + ONE_CLASS + ", player 2 = " + playerTwoIdentity)
  establishBoard()
  playerOneTurn = true;
  statusDiv.innerHTML = ONE_CLASS 
}

// this builds the board and establishes event listeners after the classes are selected
// there is no 'else' because I've alerted the lack of them
// rebuilds the parallel board too
// function boxmarked has nothing passed in bc it's passed into addEventListener.

function establishBoard() {
  if (ONE_CLASS !== undefined || playerTwoIdentity !== undefined) {
    for (let i = 0; i < origBoard.length; i++) {
    origBoard[i].addEventListener('click', boxmarked, {once: true});};
// adds eventlistener to origboard, which length is determined by the divs in index.html
// activates boxmarked with click

    origBoard.forEach(gridBox => {
    gridBox.classList.remove(ONE_CLASS)
    gridBox.classList.remove(TWO_CLASS)
    gridBox.classList.remove('winner')
    gridBox.innerHTML = ""
    })
      };
    parallelBoard= [0,1,2,3,4,5,6,7,8]
    statusDiv.innerHTML = ""
  };

// The target event property returns the element that triggered the event.
// indexOf() method returns the first index at which a given element can be found in the array
// boxmarked takes works on array of origBoard
// origBoard is an array of HTML elements with class=box

function boxmarked(e) {
    const index = origBoard.indexOf(e.target)
    // need to id index so can transpose it to parallel board
    // or else can just add classlist to e.target
    if(playerOneTurn) {
        origBoard[index].classList.add(ONE_CLASS)
        e.target.innerHTML = ONE_CLASS
        parallelBoard.splice(index, 1, ONE_CLASS)
      } else {
        origBoard[index].classList.add(TWO_CLASS)
        e.target.innerHTML = TWO_CLASS;
        parallelBoard.splice(index, 1, TWO_CLASS)
        suggestedAIMove()
        swapTurns()
      }

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


//this is easy, just plays randomly.
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

// this is the smart initial move: take center, then corners. 
// Then it is called and uses bestAIMove() to decide where to go from now on.

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
    console.log("smart AI play " + checkClass())
    console.log(origBoard)
    return
  }
    bestAIMove()
  playerOneTurn = true
};

// this is just to mark who is playing
// it operates out of swapTurns() and the variable PlayerOneTurn

function checkClass() {
  if(playerOneTurn) {
  return ONE_CLASS
  } else {
  return TWO_CLASS
  }
};

// these are easy, just for the interface
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


// Check win functions are tricky  -- All these work on arrow functions

// function isThereATie runs another function `allFilled` which takes insidebox as an argument
// if the innerHTML of insidebox is not empty 
// It returns the result of the `every` test of `allFilled` the array origBoard
// insidebox is never defined, it could be "fizzbuzz", it just serves to mark objects in the array
// isThereATie is a function declaration, we use allFilled as a function expression 
// because `every` needs to call it. 

// Could `allFilled` be used as a function declaration? 
// If so, would it have to be declared separately as a new top-level function?

function isThereATie() {
  var allFilled = (insidebox) => insidebox.innerHTML !==""
  return (origBoard.every(allFilled))
}

// we check parallelBoard to see if every window has a string bc of minimax
// minimax check works by ???? (I will know when I get to checking mechanisms OF PARALLEL BOARD) <-- RESTART HERE

function isThereATieParallel() {
  var allStrings = (obj) => typeof obj === "string"
  return (parallelBoard.every(allStrings))
}

// this is used to check if the current player has won (true or false)
// origBoard is the array from the boxes. 
// take that array and reduce, using previousValue, currentValue, currentIndex
// this uses reduce not as numbers. 
// it goes through each piece of the array (board) and results in an array called `indexOfSelected`
// if the box is the same as the current class, push the index into `indexOfSelected` array
// so then you get an array of the played spaces like [4,5]
// the syntax is `array.reduce(final value)` AND
// const array = [?, ?, ?];
// const 'final value' = (previousValue, currentValue, index) => previousValue operation currentValue;
// to get the variable 'iOS' which is an array, 
// move over the origBoard and put in `iOS` the index of the box if the box matches current player
// reduce is a callback function, calls it once for each element, in ascending order.
// index of selected returns all the indexes of the boxes that have been selected by the current player

function playerhasWon() {
  console.log(indexOfSelected);
    var indexOfSelected = origBoard.reduce((indexOfSelected, box, idx) => {
        if (box.classList[1] === checkClass()) {
            indexOfSelected.push(idx);
        }
        return indexOfSelected;
    }, []);

// filter function works by big group first, then 'filter' then the rest
// so each object is a trio, in 'winningTrios' and the matches to indexOfSelected are filtered out.
// each object in the trio array is tested to see if it's in indexOfSelected
// some trios will have two digits in indexOfSelected, some one, we want the one that has three
// map tests each trio in 'winningTrios'
// the second filter on length operates on a different i, it only wants the trios with 3 

  const winningThreeIndexes = winningTrios
  .map(trio => trio.filter(i => indexOfSelected.includes(i)))
  .filter(i => i.length === 3);

// if `winningThreeIndexes` is made of 1 or 2 arrays --
// then take the first array add the class winner
// why does this limit to 1 or 2. Why not 3? Why does it need to exist at all? WHY WHY WHY
// take the first set of 3 in 'WTI', use map for each one of the digits inside to index origBoard
// and add winner class

  if (winningThreeIndexes.length === 1 || winningThreeIndexes.length === 2) {
    winningThreeIndexes[0].map((index) => {origBoard[index].classList += ' winner'});
    return true
  }  
    else {
      return false;
    }
};

// this checks on minimax, works the same way but does not highlight winning spaces.
// also it's only a win if there is ONE winningThreeIndex

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

// these are is needed for AI 
// `listEmptySpaces` gives the algo and idea of what to choose from


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


// suggestedAIMove() works the same as bestAIMove() basically 
// but the first if section is to eliminate >6 available spaces
// otherwise, it runs minimax in a forloop to decide the best choice
// here, what is `move` for bestAIMove() is outputted as a suggestion

function suggestedAIMove() {
  let bestScore = 10000
  var yourParallelChoices = listParallelSpaces()

  if(yourParallelChoices.length > 6){
    var suggestedAIchoices = listEmptySpaces().filter(i => i%2 == 0) 
      if (suggestedAIchoices.includes(4) == true) {suggestion = 4}
      else if (typeof parallelBoard[2] == "string" || typeof parallelBoard[6] == "string")
         {suggestion = Math.random() < 0.5 ? 0 : 8}
      else if (typeof parallelBoard[0] == "string" || typeof parallelBoard[8] == "string")
      { suggestion = Math.random() < 0.5 ? 2 : 6}
      else {suggestion = suggestedAIchoices[Math.floor(suggestedAIchoices.length * (Math.random()))]}
        swapTurns();
        return}
  
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

// bestAIMove() is called whenever the player places a token if he selected SmartAI().
// listParallelSpaced() creates an array of the available spaces.
// we call a forloop that goes through each available space.
// the AI player is spliced into the array, checked for a win, and then minimax() runs
// you will get a best score for each object in the array. 
// Each time score > bestScore, that choice will be assigned to move until the forloop ends.

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
if (playerhasWon()) {
  declareWinner();
  return
  } 
if (isThereATie() == true) {
declareTie()
return
}
suggestedAIMove()
console.log("best AI " + checkClass())
}

// minimax() fires when it is called by bestAIMove()
// (1) if neither checkwin() nor tie() is true, then swapTurns(), then ...
// (2) listParallelSpaces(), forloop over that array.
// (3) splice a marker into parallelboard, use minimax (on itself)
// this again goes to step 1, checking and swapping sides until there is a win. 
// if there is a score, `parallelBoard.splice(player2Pick, 1, player2Pick)` steps it back
// there is no swap, the board is tested again
// if there is no win, then again swapTurns() until there is a win
// and then again, step back, no swap, test again
// this goes until the `forloop` is done, and you get a score for one choice at bestAIMove()
// then bestAIMove() goes through its own forloop
// There is only one "score" and it is "best" depending on who is the player

// so bestAIMove() starts with one choice and tests all possible combinations
// the `parallelPick` that gets the best score is turned into the `move`
// because the bestAIMove() does a forloop
// the `move` will always be the last relevant one in the array.
// there is a possibility that a move blocking a projected win is not the optimal move
// if the opponent does not do the optimal move. But because the board is so small, 
// if the opponent's move is sub-optimal, the AI will take the first win it sees.
// the AI is only effective if it takes a win over a tie or a loss and assumes you do too.
// `bestScore` is interesting because there is only one best score. 
// It keeps updating to -10, 10 or 2 depending on who the current player is.

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
      console.log("Maximizer " + checkClass() + " picks " + player2Pick + " from " + player2Choices);
      parallelBoard.splice(player2Pick, 1,TWO_CLASS);
      var score = minimax(parallelBoard)
      console.log("Maximizer " +  checkClass() +  " picked " + player2Pick + ", scores " + score)
      parallelBoard.splice(player2Pick, 1, player2Pick);
      if (score > bestScore) {
        bestScore = score
        console.log("Maximizer BEST for " + player2Pick + " is " + bestScore);}
      }
      return bestScore
    }

   else {
    let bestScore = 100000; 
    var player1Choices = listParallelSpaces();

    for (var i = 0; i < player1Choices.length; i++) {
      playerOneTurn = true
      var player1Pick = player1Choices[i];
      console.log("Minimizer " + checkClass() + " picks " + player1Pick + " from " + player1Choices);
      parallelBoard.splice(player1Pick, 1,ONE_CLASS);
      var score = minimax(parallelBoard)
      console.log("Minimizer " +  checkClass() +  " picked " + player1Pick + ", scores " + score)
      parallelBoard.splice(player1Pick, 1, player1Pick);
      if (score < bestScore) {
        bestScore = score
        console.log("Minimizer BEST for " + player1Pick + " is " + bestScore);}
      }
      return bestScore
    }
  } 
