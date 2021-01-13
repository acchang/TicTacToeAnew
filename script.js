const boxes = Array.from(document.getElementsByClassName('box'));

let currentPlayer = "playerOne"
let board = []

const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

// puts even listeners on all squares -- and also prevents another
// for loop puts eventlistener on
// could also use forEach method which is how webdev/kubow does it "cellElements.forEach(cell => {cell.addEventListener...)"
const gridBoxes = document.querySelectorAll('.box');
for (const gridBox of gridBoxes) {
    gridBox.addEventListener('click', boxmarked,  {once: true})
}

// draw a mark in inner html that's the same as same the player
// kubow targets
// Kim sets player and if true add classList (35:16)
// need some way of updating the index so I can measure it against winning combos
// kubow does const squareArray = Array.from(squares)
// const index = squareArray.indexOf(e.target)
// if not classList.add then .setAttribute("id"
// yeah and marked should be the same as current player
// then check if there is a winner
function boxmarked(e) {
    e.target.innerHTML = "icon goes here";
    const gridArray = Array.from(gridBoxes)
    const index = gridArray.indexOf(e.target)

    // need to work on indeterminate players; current player is 'one' or 'two'

    if(currentPlayer === 'playerOne') {
        gridArray[index].classList.add('X')
        currentPlayer = 'playerTwo'
      } else {
        gridArray[index].classList.add('O')
        currentPlayer = 'playerOne'
      }

    console.log(e.target.classList[1], index, gridArray)
    checkWin()
    // Kim and Quick use brute force, so no
    // -- Foster does it by checking the board (array) after each play with a .foreach
    // for the big array WC, take each array in WC, use the smaller array components to see if on board
    // *** WebDev uses board and player and .some with .every -- array, method, function
    // combination.every(index => {return cellElements[index].classList.contains(currentClass)} means:
    // which of the smaller arrays "combination" has every the index of the board becomes the index?
    // this is passed up to WINNING_COMBINATIONS.some(combination => {
    // which of the larger array has the "combination" -- can't this be .every too?-- but this only results in true/false
    // use a .filter
    // *** FCC does it by passing in board and player. I need the board for the minimax and I need the current player
    // he .reduces the board to get an array of the occupied places
    // then he also employs an .every and for loop (25:00 in video)
}

// need a function that acknowledges whose turn it is
// use current player and other player and allow them to choose marks
// foster does it by determining turn first, and then using boxmarked function
// use css so a new class invokes a new image
// quick sets current player with target ***

// My grid has eventlisteners
// when clicked it adds a class to the box
// then I need to check if there is a winner
// I make a var "plays" that reduces the board to the indexes of one player and see if plays contains any of the wincombos

// start with an empty board and each click matches index with marker 


const evalBoard = [];

function checkWin() {

const evalBoard = [];

boxes.forEach(function (box) {
    evalBoard.push(box.classList[1]);
});

// var rebels = pilots.filter(function (pilot) {
//     return pilot.faction === "Rebels";
//   });

// I can't do it this way bc .notation is a quality, so assign quality

var final = evalBoard.filter(function (eval) {
    return eval.findIndex === "X";
  });

console.log(evalBoard);
console.log(final)

    // https://stackoverflow.com/questions/20798477/how-to-find-index-of-all-occurrences-of-element-in-array

    // boxes is the array and I need to reduce it to an array that has the indexes of one symbol
    // map then filter? if (num.classList[1]="X") {return num.IndexOf} does not work
    // element.classList.contains(class);

    // boxes.map(box => evalBoard.push(box.classList[1]));
    // console.log(evalBoard)

    // boxes.map(box => evalBoard.push(box.classList[1]));

    // console.log(evalBoard)

    // function getAllIndexes(arr, val) {
    //     var indexes = [], i = -1;
    //     while ((i = arr.indexOf(val, i+1)) != -1){
    //         indexes.push(i);
    //     }
    //     return indexes;
    // }
    
    // var indexes = getAllIndexes(evalBoard, "X");
    // console.log(indexes)

    // const test = boxes.reduce(function(a, e, i) {
    //     if (e === 'X')
    //         a.push(i);
    //     return a;
    // }, []);  

    // console.log(test)
    

// array1.forEach(element => console.log(element));

//     if (box.classList.contains('X')) {evalBoard.push.box}
    
    // let plays = boxes.map(function(num) {return num.classList[1]});
    // let result = plays.filter(word => word.classList.contains(X));
    // console.log(result)

// const result = words.filter(word => word.length > 6);


    // const map1 = array1.map(x => x * 2);
    
    // filter(function (e) {
    //     return e.indexOf = X
    // });
    // console.log(plays);
    // const array1 = ['a', 'b', 'c'];
    // array1.forEach(element => console.log(element));

//     // let plays = gridArray.reduce((a, e, i) =>
//     // (e === player) ? a.concat(i) : a, []);

// //  consider filter too
//     var indices = [];
//     var element = 'X';
// // foreach in boxes get 
//     var idx = boxes ( X.index())
//     while (idx != -1) {
//         indices.push(idx);
//         idx = array.indexOf(element, idx + 1);}
//     console.log(indices);

 	// let plays = gridArray.reduce((a, e, i) =>
    //     (e === player) ? a.concat(i) : a, []);
    // console.log(plays) 
    // console.log(boxes)
    // let gameWon = null;
    // // if every element matches one of the win arrays then game is won
	// for (let [index, win] of winCombos.entries()) {
	// 	if (win.every(elem => plays.indexOf(elem) > -1)) {
    // // if every element in win is in plays
	// 		gameWon = {index: index, player: player};
	// 		break;
	// 	}
	// }
	// return gameWon;
}

// function checkWin(board, player) {
//     // reduce the board to an array of the indexes occupied by the player
// 	let plays = board.reduce((a, e, i) =>
// 		(e === player) ? a.concat(i) : a, []);
//     let gameWon = null;
//     // if every element matches one of the win arrays then game is won
// 	for (let [index, win] of winCombos.entries()) {
// 		if (win.every(elem => plays.indexOf(elem) > -1)) {
//     // if every element in win is in plays
// 			gameWon = {index: index, player: player};
// 			break;
// 		}
// 	}
// 	return gameWon;
// }