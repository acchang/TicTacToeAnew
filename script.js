const boxes = Array.from(document.getElementsByClassName('box'));

let currentPlayer = "playerOne"
let board = []

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

// puts even listeners on all squares -- and also prevents another
// for loop puts eventlistener on
// could also use forEach method which is how webdev/kubow does it "cellElements.forEach(cell => {cell.addEventListener...)"
const gridOfBoxes = document.querySelectorAll('.box');
for (const gridBox of gridOfBoxes) {
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
    const gridArray = Array.from(gridOfBoxes)
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

// start with an empty board and each click matches index with marker 


function checkWin() {

    // function isTrue(arr, arr2){
    //     return arr.every(i => arr2.includes(i))};

    var indexSelected = boxes.reduce((indexSelected, box, idx) => {
        if (box.classList[1] === 'X') {
            indexSelected.push(idx);
        }
        return indexSelected;
    }, []);
    console.log(indexSelected);

    // console.log(istrue(winningTrios,indexSelected));
    
//    var winner = winningTrios.forEach(trio => {
//        return trio.every(i => indexSelected.includes(i))});
//     console.log(winner)


    // function checkWin(currentClass) {
//     return WINNING_COMBINATIONS.some(combination => {
//       return combination.every(index => {
//         return cellElements[index].classList.contains(currentClass)
//       })

   var winner = winningTrios.some(trio => {
       return trio.every(i => indexSelected.includes(i))});
    console.log(winner)




    
    // console.log(winningTrios.every(i => indexSelected.includes(i)))

    // if any of the winning trios is included in indexselected, use some
    // console.log(winningTrios.some(trio => indexSelected.includes(trio)))


    // var winner = winningTrios.forEach((trio) => {
    //     if (indexSelected.includes(trio)) {
    //         alert('winner')} else {alert(trio + indexSelected)};
    //     })
    //     return winner;
    
        // var winner = winningTrios.forEach((trio) => {
        //     console.log(indexSelected + (trio))});

    // var winner = winningTrios.forEach(element => console.log(element));

    // indexSelected.includes(a winning trio)
    // forEach executes function for each element, try another reduce?

    // var winner = winningTrios.forEach(trio => indexSelected.includes(trio));

    // winningTrios.some(trio => {
    //     return trio.every(indexSelected.contains(index))});

    // console.log(winner)

};


// function checkWin(currentClass) {
//     return WINNING_COMBINATIONS.some(combination => {
//       return combination.every(index => {
//         return cellElements[index].classList.contains(currentClass)
//       })