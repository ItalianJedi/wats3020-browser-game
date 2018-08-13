/* WATS 3020 Browser Game project */
/* Build a tic tac toe game for two players. */

// Created a class called `Player`. The `constructor()` looks for a
// parameter called `token` and sets `this.token` as a property of
// the class.
class Player {
    constructor(token){
        this.token = token;
    }
}


// Tic Tac Toe Game Class
class TicTacToe {
    constructor(){
        // Set up `this.player1` and `this.player2` properties.
        // These properties are new Player class instances.
        // Changed them to heart and bell because it sounds like Art Bell
    this.player1 = new Player('heart');
    this.player2 = new Player('bell');

        // Initialized several properties that will be used to track game
        // progress.
        this.currentPlayer = null;
        this.gameStatus = null;
        this.winner = null;
        this.moveCount = 0;
        this.startPrompt = document.querySelector('#start-prompt');
        this.movePrompt = document.querySelector('#move-prompt');
        this.currentPlayerToken = document.querySelector('#player-token');
        this.gameboard = document.querySelector('#gameboard');
        this.winScreen = document.querySelector('#win-screen');
        this.winnerToken = document.querySelector('#winner-token');
        this.drawScreen = document.querySelector('#draw-screen');

        // Initialize an Array representing the starting state of the game board.
        // This is provided for you. We can access the spaces on the board using
        // (X, Y) coordinates as `this.gameState[x][y]`, which is how the game
        // will check to see if the winner is known.
        this.gameState = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];

        // Array of Win States
        // This is provided for you. Each of these arrays represents the ways
        // a player can win Tic Tac Toe. Each item in the array is another
        // array. Each of those arrays contains a set of (X, Y) coordinates.
        // If a player has claimed the tile at each of the coordinates listed in
        // one of the win states, then they have won the game.
        this.winStates = [
          [[0,0],[0,1],[0,2]],
          [[1,0],[1,1],[1,2]],
          [[2,0],[2,1],[2,2]],
          [[0,0],[1,0],[2,0]],
          [[0,1],[1,1],[2,1]],
          [[0,2],[1,2],[2,2]],
          [[0,0],[1,1],[2,2]],
          [[0,2],[1,1],[2,0]]
        ];
    }

    // This `checkForWinner()` method is provided for you, but you must fill in
    // the event dispatch lines that cause the end game screens to show.
    checkForWinner(){
        console.log('checking for winner');
        for (let condition of this.winStates){
            let winningCondition = true;
            for (let position of condition){
                if (this.gameState[position[0]][position[1]] != this.currentPlayer.token) {
                    winningCondition = false;
                }
            }
            if (winningCondition) {
                console.log('We have a winner!');
                console.log(`Condition is: ${condition}`);
                this.gameStatus = 'won';
                this.winner = this.currentPlayer;

                // If we've gotten here, then we need to createa  `win` event and
                // dispatch it.

                // Created a new event called `winEvent` that will dispatch the signal "win".
                let winEvent = new Event('win');

                // Dispatched the winEvent using the `document.dispatchEvent()` method.
                document.dispatchEvent(winEvent);

                return true; // Return a value to stop processing the additional move count check.
            }
        }
        this.moveCount++;
        console.log(`Reviewed move ${this.moveCount}.`);
        if (this.moveCount >= 9) {
            console.log(`This game is a draw at ${this.moveCount} moves.`);
            this.gameStatus = 'draw';

            // Created a new event called `drawEvent` that dispatches the signal "draw".
            let drawEvent = new Event('draw');

            // Dispatched the `drawEvent` event.
            document.dispatchEvent(drawEvent);
        }
    }

    recordMove(event){
        console.log('recording move');
        // This method handles recording a move in the `this.gameState` property.
        // To record a move, we must accmoplish the following:

        // 1. Find the X, Y coordinates of the tile that was just selected
        // 2. Claim that tile in the `this.gameState` array
        // 3. Set the class attribute of the tile to reflect which player has claimed it

        // Defined a variable called `tile_x` that equals the `data-x` attribute on the `event.target`.
        let tileX = event.target.dataset.x;

        // Defined a variable called `tile_y` that equals the `data-y` attribute on the `event.target`.
        let tileY = event.target.dataset.y;

        // Claimed this spot in the `this.gameState` array for the player.
        this.gameState[tileX][tileY] = this.currentPlayer.token;

        // Set the class on the `event.target` to show the player's token. 
        event.target.setAttribute('class', `tile played glyphicon glyphicon-${this.currentPlayer.token}`);
    }
    switchPlayer(){
        console.log('switching player');
        // This method handles switching between players after each move.
        // It must determine who the current player is, and then switch to the
        // other player. After that, it must set the class on the
        // `this.currentPlayerToken` property to show the proper class.

        // Made a conditional that checks to see if `this.currentPlayer`
        // is equal to `this.player1` If so, set `this.currentPlayer` to
        // `this.player2`. If not, set `this.currentPlayer` equal to
        // `this.player1`. (You will use an if/else statement to do this.)
        if (this.currentPlayer === this.player1) {
            this.currentPlayer = this.player2;
        } else {
            this.currentPlayer = this.player1;
        }

        // Set the `class` attribute on `this.currentPlayerToken` to
        // reflect the current player's token.
        
        this.currentPlayerToken.setAttribute('class', `glyphicon glyphicon-${this.currentPlayer.token}`);
    }
    setUpTileListeners(){
        console.log('setting up tile listener');
        // This method sets up event listeners for tiles. It is called when we
        // start a new game. It must find all the tiles and apply event listeners
        // to them.

        // Selected all of the `.tile` elements into a variable called
        // `tileElements`.
        let tileElements = document.querySelectorAll('.tile');

        // Used a loop to add a "click" event listener to each tile that
        // will call the `handleMove` function whenever a tile is clicked.
        // Couldn't figure out why this wouldn't work. Finally realized I had handleMove in single quotes
        for (let tile of tileElements){
            tile.addEventListener('click', handleMove);
        }
    }
    showWinScreen(){
        // This method displays the end game screen for a Win.
        console.log('show win screen');

        // Changed the `class` attribute on the `this.winScreen` property
        // to "show".
        this.winScreen.setAttribute('class', 'show');

        // Changed the `class` attribute on the `this.winnerToken` property
        // to show the proper winner's token.
        this.winnerToken.setAttribute('class', `glyphicon ${this.winner.token}`);
    }
    showDrawScreen(){
        // This method displays the end game screen for a Draw.

        // Set the `class` attribute on the `this.drawScreen` property
        // to "show".
        this.drawScreen.setAttribute('class', 'show');
    }
    setUpBoard(){
        console.log('setting up gameboard');
        // Cleared all content from the existing `this.gameboard` element.
        this.gameboard.innerHTML = '';

        // We must draw the game board by using a loop to create rows with
        // tiles in them. We want to create the same structure as we see in the
        // index.html file.

        // Created a `for` loop that will loop three times. The counter
        // variable in this loop is called `i`.
        for (let i=0; i<3; i++){
            
            // Created a new div element called `newRow
            let newRow = document.createElement('div');
            // Set the `class` attribute on `newRow` to "row".
            newRow.setAttribute('class', 'row');

            // Created another `for` loop to make the colums to contain the
            // tiles. This `for` loop should also loop 3 times. The counter
            // variable in this loop is called `j`.
            for (let j=0; j<3; j++){
                // Created a new `div` element called `newCol`.
                let newCol = document.createElement('div');
                
                // Set the `class` attribute on `newCol` to "col-xs-3".
                newCol.setAttribute('class', 'col-xs-3');

                // Created a new `span` element called `newTile`.
                let newTile = document.createElement('span');

                // Set the `class` attribute on `newTile` to equal the
                // placeholder styles ("tile glyphicon glyphicon-question-sign").
                newTile.setAttribute('class', 'tile glyphicon glyphicon-question-sign');

                // Set the `data-x` attribute on the `newTile` element
                // equal to `i`.
                // my original newTile.setAttribute('data-x', 'i');
                newTile.dataset.x = i;

                // Set the `data-y` attribute on the `newTile` element
                // equal to `j`.
                // my original newTile.setAttribute('data-y', 'j');
                newTile.dataset.y = j;

                // Appended `newTile` as a child to `newCol`.
                newCol.appendChild(newTile);

                // Appended `newCol` as a child to `newRow`.
                newRow.appendChild(newCol);
            }
            // NOTE: Second `for` loop should end here.

            // Appended the `newRow` element to `this.gameboard` as a child element.
            this.gameboard.appendChild(newRow);

        }

        // NOTE: Your first `for` loop should end here.

        // Called `this.setUpTileListeners()` to add event listeners to the
        // `.tile` elements.
        this.setUpTileListeners();

    }
    initializeMovePrompt(){
        // This method initializes the `this.movePrompt` element.
        console.log('initializing move prompt');

        // Hid the `this.startPrompt` element by setting the `class`
        // attribute to "hidden".
        this.startPrompt.setAttribute('class', 'hidden');

        // Removed the "hidden" class from the `this.movePrompt` element.
        this.movePrompt.setAttribute('class', '');

        // Set `this.currentPlayer` equal to `this.player1`.
        this.currentPlayer = this.player1;
        
        // Set `this.currentPlayerToken` class equal to `glyphicon glyphicon-${this.currentPlayer.token}`
        this.currentPlayerToken.setAttribute('class', 'glyphicon glyphicon-${this.currentPlayer.token}');
    }
    start(){
        // This method handles the logic to create a new game. It primarily has
        // two duties in the basic version of the game:
        console.log('start game');

        // Created a new gameboard by calling `this.setUpBoard`
        this.setUpBoard();

        // Initialized the move prompt by calling `this.initializeMovePrompt`.
        this.initializeMovePrompt();

    }
} // End of the Tic Tac Toe Class definition.

// Outside of the Class definitions, we need a few items to control the game
// so our players can successfull play.

// Added an event listener to the `document` object that will watch for the
// "DOMContentLoaded" event signal. This listener should execute an anonymous
// function to handle the "DOMContentLoaded" event.

let game;
console.log('game code starting');

//DOMContentLoaded means all of the document content is loaded before this function is ran
document.addEventListener('DOMContentLoaded', function(event){
    
    // Inside the "DOMContentLoaded" event handler, performed the following
    // steps:
    console.log('dom content has loaded');
    
    // Selected the `#start-button` element from the DOM and saved it as a
    // variable called `startButton`.
    let startButton = document.querySelector('#start-button');

    // Created an event listener on the `startButton` element that listens for
    // a "click" event and executes an anonymous function to start the game.
    startButton.addEventListener('click', function(event){
        // Inside the `startButton` event listener, instantiated a new
        // instance of the `TicTacToe` class and save it as a variable called
        // `game`.
         game = new TicTacToe();

        // Called the `start()` method of the `game` object you just created. Game was initialized outside of the event listener 
        // in case it is needed elsewhere
        game.start();
    });
    // NOTE: End of the `startButton` event listener here.

// NOTE: End of the "DOMContentLoaded" event listener here.
});

// Added an event listener on the `document` object that listens for the
// "win" event signal.

    // In the handler for the "win" event, call the `game.showWinScreen()`
    // method to display the winning screen.
    document.addEventListener('win', function(event){
        console.log('Detected win Event');
        game.showWinScreen();
    });

// NOTE: End of the "win" event listener.

// Added an event listener on the `document` object that listens for the
// "draw" event signal.

    // In the handler for the "draw" event, call the `game.showDrawScreen()`
    // method to display the tie game screen.
    document.addEventListener('draw', function(event){
        console.log('Detected draw Event');
        game.showDrawScreen();
    });

// NOTE: End of the "draw" event listener.

// External function for event listeners provided for you.
function handleMove(event){
    console.log('handling player move');
    // Record the move for the current player.
    game.recordMove(event);

    // Check to see if the last move was a winning move.
    game.checkForWinner();

    // Rotate players.
    game.switchPlayer();
}
