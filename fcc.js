

function minimax() {
    const newBoard = [...origBoard]
    var smartAIArray = listEmptySpaces(newBoard);
  
    if (playerhasWon(newBoard) &&  playerOneTurn) {
      return -10;
    } else if (playerhasWon(newBoard) && !playerOneTurn) {
      return 10;
    } else if (emptySpaceRemains(newBoard) === false) {
      return 0;
    }
  
    var moves = [];

	for (var i = 0; i < smartAIArray.length; i++) {
        var move = {};
        var smartAIpicked = smartAIArray[i];
		move.index = newBoard[smartAIArray[i]];

		if  (!playerOneTurn) {
            newBoard[smartAIpicked].classList.add(TWO_CLASS);
            newBoard[smartAIpicked].innerHTML = TWO_CLASS;
			var result = minimax();
			move.score = result;
		} else {
            newBoard[smartAIpicked].classList.add(ONE_CLASS);
            newBoard[smartAIpicked].innerHTML = ONE_CLASS;
			var result = minimax();
			move.score = result;
		}

		newBoard[smartAIpicked] = move.index;

		moves.push(move);
	}

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

    // score is -10, I don't want it
    // P1 best case -10, 0, 10 ; best is 1000; score < best score
    // P2 best case 10, 0 -10 ; best is -1000; score > best score