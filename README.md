# TicTacToeAnew
Returning to coding after a long break


The goal of this project was to create a tic-tac-toe board. It probably could have taken me two weeks, which is still a long time, but it took me close to a month because I kept piling on features. 

To make an updatable game board would have been a pretty simple proposition ... an interview question or with minimax, a second-semester freshman CS project. But then I set about 

* giving the player an option to choose their symbol
* to do things like choose between playing human, a random move generator, and an unbeatable mode, and 
* light up the winners 
* and even provide a modal end screen (though that last choice was to get around the fact that when I would alert the win, the alert would appear before the screen updated with the last move. 

I was also coming back after a several month hiatus, so I had to learn everything all over again. 

I watched all the videos of Tic Tac Toe and minimax available on YouTube (about a dozen in total.) Surprisingly only about three of the Tic Tac Toe tutorials teach minimax. I also asked a lot of Stack Exchange
https://stackoverflow.com/questions/65999974/tic-tac-toe-minimax-ai-not-working-beyond-end-game-recursion-issues-where-are

Daniel Shiffman's video was really helpful in understanding minimax, even though he operates in a js variant called p5js. I couldn't make heads or tails of what Beau Carnes of Free Code Camp did, his minimax is full of recursive methods that don't come second hand to me so it was hard to parse.

I spent many days debugging, working line by line though what the minimax recursion was doing. 

Then I faced a new hurdle because the system was really slow dealing with the initial moves. I understand that's because it's testing 8! (40,320) game boards. Is this lag expected and the only way to do it? 

It seems a little like it's relying on brute force. I suspect there are tricks to make it better (like the alpha beta pruning I read about.) The tic-tac-toe when you google it is a lot faster. 

So first, after being advised that I probably shouldn't directly manipulate the DOM and that's why it was so slow, I created parallel board on the DO with a spread operator and it was faster but some gaps in logic, because it was still passing by reference to the original array.

Finally, I went to a parallel board only using primitives to test the board, and that was even faster and smoother. Only when a move was determined would I manipulate the DOM.

I wonder if removing all my console.logs help? I know it's already heavy because I have three move trackers running in parallel -- one using classes, one using innerhtml and a third using primitives.

Even then, it was kind of slow, so I pulled a few clever hacks. The first was to randomize the first move. The initial move has 9! options, but that's player choice. With 8! or 40,320 game boards, I just surveyed the empty spots and said to claim the middle, or if not the corner. Then after the player moved, the minimax would only have to assess 6! or 720 boards.

When I was building the player AI guide, I added in an extra feature. The computer AI can just go to a corner if the middle is occupied as the second move and that's fine.

When the player AI goes to an available corner after two markers have been placed, it can lead us to a tie when a win was possible by taking the spot opposite the opponent and having the middle.

I worked out that is 0 or 8 were occupied, the only good places were 2 and 6 and vice versa. I messed around with absolute numbers (if the space between the two markers is a multiple of 4, that's bad but if it's 2 or 6, that's ok). But ultimately I went with just two `if` statements with a nice use of `math.random()` and a ternary operator. Clever but I think there are cleverer options out there.

I learned some amusing things while stepping through the code trying to understand the choices that the AI did. For example, in this board, it chose the middle left and not any of the other 3 open spots to block anyone, but I guess the computer knew to give up before I did:

```
X O X

O   X
```
Essentially, it takes the highest first appearing move even though it may take several steps to play out than going for the kill.
