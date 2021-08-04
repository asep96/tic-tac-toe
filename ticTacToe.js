const gameBoardModule = (function() {
    'use strict';
    
    let gameBoard = [
        [{position: "Top Left", state: "empty", id: "00"}, {position: "Top Center", state: "empty", id: "01"}, {position: "Top Right", state: "empty", id: "02"}],
        [{position: "Mid Left", state: "empty", id: "10"}, {position: "Mid Center", state: "empty", id: "11"}, {position: "Mid Right", state: "empty", id: "12"}],
        [{position: "Bot Left", state: "empty", id: "20"}, {position: "Bot Center", state: "empty", id: "21"}, {position: "Bot Right", state: "empty", id: "22"}]
    ]
    
    let gameBoardSetUp = () => {
        let gameBoardContainer = document.createElement("div");
        gameBoardContainer.setAttribute("id", "game-board-container");
        document.getElementById("game-board").appendChild(gameBoardContainer);

        let restartButton = document.createElement("BUTTON");
        restartButton.setAttribute("id", "restart-button");
        restartButton.innerHTML = "Restart Game";
        document.getElementById("game-board").appendChild(restartButton);
        document.getElementById("restart-button").addEventListener("click", function() {
            gameLogicController.restartGame();
        });
        console.log(gameBoard);
        for(let i = 0; i < gameBoard.length; i++) {
            for(let j = 0; j < gameBoard.length; j++) {
                //have the idString correlate with the id in the array
                let idString = "a" + i + j;
                //create buttons
                let gameBoardSquare = document.createElement("BUTTON");
                //set attributes
                gameBoardSquare.setAttribute("class", "game-button");
                gameBoardSquare.setAttribute("id", idString);
                document.getElementById("game-board-container").appendChild(gameBoardSquare);
                //for right now have the state pulled in from the array itself and display it
                //gameBoardSquare.innerHTML = gameBoard[i][j].state;
                gameBoardSquare.innerHTML = ""
                document.getElementById(idString).addEventListener("click", function() {
                    //send the ID of the button to the update state function in the controller
                    gameLogicController.updateState(idString);
                });

            }
        }
    }

    return {
        gameBoard, gameBoardSetUp
    } 
})();

const PlayerFactory = (name, marker) => {
    return { name, marker }
}

const gameLogicController = (function() {

    let playerOne;
    let playerTwo;
    
    const initializeGame = () => {
        playerOne = PlayerFactory(document.getElementById("player-one-name").value, document.getElementById("player-one-marker").value);
        playerTwo = PlayerFactory(document.getElementById("player-two-name").value, document.getElementById("player-two-marker").value);
        startGame();
    }

    let _gameState = {
        //have current turn initially null
        currentPlayerName: null,
        currentPlayerMarker: null,
        gameOver: false,
        turnCounter: 1
    }

    //see if there is a winner
    const _determineWinner = () => {
        //check top row
        if (gameBoardModule.gameBoard[0][0].state != "empty" && gameBoardModule.gameBoard[0][0].state == gameBoardModule.gameBoard[0][1].state && gameBoardModule.gameBoard[0][0].state == gameBoardModule.gameBoard[0][2].state) {
            document.getElementById("turn-display").innerHTML = _gameState.currentPlayerName + " wins!";
            console.log("Game over");
            _gameState.gameOver = true;
            _displayWinningSquares("a00", "a01", "a02");
        //check middle column
        } else if (gameBoardModule.gameBoard[0][1].state != "empty" && gameBoardModule.gameBoard[0][1].state == gameBoardModule.gameBoard[1][1].state && gameBoardModule.gameBoard[0][1].state == gameBoardModule.gameBoard[2][1].state) {
            document.getElementById("turn-display").innerHTML = _gameState.currentPlayerName + " wins!";
            console.log("Game over");
            _gameState.gameOver = true;
            _displayWinningSquares("a01", "a11", "a21");
        //check right column
        } else if (gameBoardModule.gameBoard[0][2].state != "empty" && gameBoardModule.gameBoard[0][2].state == gameBoardModule.gameBoard[1][2].state && gameBoardModule.gameBoard[0][2].state == gameBoardModule.gameBoard[2][2].state) {
            //print winning message
            document.getElementById("turn-display").innerHTML = _gameState.currentPlayerName + " wins!";
            console.log("Game over");
            _gameState.gameOver = true;
            _displayWinningSquares("a02", "a12", "a22");
        //check middle row
        } else if (gameBoardModule.gameBoard[1][0].state != "empty" && gameBoardModule.gameBoard[1][1].state == gameBoardModule.gameBoard[1][2].state && gameBoardModule.gameBoard[1][0].state == gameBoardModule.gameBoard[1][2].state) {
            //print winning message
            document.getElementById("turn-display").innerHTML = _gameState.currentPlayerName + " wins!";
            console.log("Game over");
            _gameState.gameOver = true;
            _displayWinningSquares("a10", "a11", "a12");
        //check bottom row
        } else if (gameBoardModule.gameBoard[2][0].state != "empty" && gameBoardModule.gameBoard[2][0].state == gameBoardModule.gameBoard[2][1].state && gameBoardModule.gameBoard[2][0].state == gameBoardModule.gameBoard[2][2].state) {
            //print winning message
            document.getElementById("turn-display").innerHTML = _gameState.currentPlayerName + " wins!";
            console.log("Game over");
            _gameState.gameOver = true;
            _displayWinningSquares("a20", "a21", "a22");
        //check left column
        } else if (gameBoardModule.gameBoard[0][0].state != "empty" && gameBoardModule.gameBoard[0][0].state == gameBoardModule.gameBoard[1][0].state && gameBoardModule.gameBoard[0][0].state == gameBoardModule.gameBoard[2][0].state) {
            //print winning message
            document.getElementById("turn-display").innerHTML = _gameState.currentPlayerName + " wins!";
            console.log("Game over");
            _gameState.gameOver = true;
            _displayWinningSquares("a00", "a10", "a20");
        //check diagonal from bot left to top right
        } else if (gameBoardModule.gameBoard[2][0].state != "empty" && gameBoardModule.gameBoard[2][0].state == gameBoardModule.gameBoard[1][1].state && gameBoardModule.gameBoard[2][0].state == gameBoardModule.gameBoard[0][2].state) {
            //print winning message
            document.getElementById("turn-display").innerHTML = _gameState.currentPlayerName + " wins!";
            console.log("Game over");
            _gameState.gameOver = true;
            _displayWinningSquares("a20", "a11", "a02");
        //check diagonal from top left to bot right
        } else if (gameBoardModule.gameBoard[0][0].state != "empty" && gameBoardModule.gameBoard[0][0].state == gameBoardModule.gameBoard[1][1].state && gameBoardModule.gameBoard[0][0].state == gameBoardModule.gameBoard[2][2].state) {
            //print winning message
            document.getElementById("turn-display").innerHTML = _gameState.currentPlayerName + " wins!";
            console.log("Game over");
            _gameState.gameOver = true;
            _displayWinningSquares("a00", "a11", "a22");
        } else {
            console.log("Game is still going");
        }
        //count turns
        _gameState.turnCounter++;
        //if turn counter is 10, then all the spots on the board are filled up
        if (_gameState.turnCounter == 10) {
            _gameState.gameOver = true;
            document.getElementById("turn-display").innerHTML = "The game ends in a tie!";
        }
    }

    const _displayWinningSquares = (square1, square2, square3) => {
        document.getElementById(square1).style.color = "#5F9EA0";
        document.getElementById(square1).style.backgroundColor = "#000000";
        //document.getElementById(square1).style.borderColor = "#5F9EA0"
        document.getElementById(square2).style.color = "#5F9EA0";
        document.getElementById(square2).style.backgroundColor = "#000000";
        //document.getElementById(square2).style.borderColor = "#5F9EA0"
        document.getElementById(square3).style.color = "#5F9EA0";
        document.getElementById(square3).style.backgroundColor = "#000000";
        //document.getElementById(square3).style.borderColor = "#5F9EA0"
    }

    const startGame = () => {
        document.getElementById("player-input-form").remove();
        console.log(_gameState)
        
        console.log(playerOne);
 
        console.log(playerTwo);
        //update whose turn it is in game state
        _gameState.currentPlayerName = playerOne.name;
        _gameState.currentPlayerMarker = playerOne.marker;
        gameBoardModule.gameBoardSetUp();
        console.log("Inside startGame() Current player name: " + _gameState.currentPlayerName);
        console.log("Inside startGame() Current player marker: " + _gameState.currentPlayerMarker);
        document.getElementById("turn-display").innerHTML = _gameState.currentPlayerName + "'s Turn";

        return {
            playerOne, playerTwo
        }
    }

    const restartGame = () => {
        //reset game board so they are the same color and have an empty state
        for(let i = 0; i < gameBoardModule.gameBoard.length; i++) {
            for(let j = 0; j < gameBoardModule.gameBoard.length; j++) {
                gameBoardModule.gameBoard[i][j].state = "empty";
                document.getElementById("a" + i + j).innerHTML = "";
                document.getElementById("a" + i + j).style.color = "#000000";
                document.getElementById("a" + i + j).style.backgroundColor = "#5F9EA0";
            }
        }
        //update states to default values with the exception of the player
        _gameState.currentPlayerName = playerOne.name;
        _gameState.currentPlayerMarker = playerOne.marker;
        _gameState.gameOver = false;
        _gameState.turnCounter = 1;
        document.getElementById("turn-display").innerHTML = _gameState.currentPlayerName + "'s Turn";
    }

    //grab button 
    const updateState = (squareId) => {
        //pull coordinate of button so we can go directly to its corresponding spot in the array
        let x = parseInt(squareId[1]);
        let y = parseInt(squareId[2]);
        //save us some typing by grabbing the array reference of the clicked square
        let clickedGameSquare = gameBoardModule.gameBoard[x][y];
        //make sure square state is empty before updating, if not, alert the player
        if(_gameState.gameOver == true) {
            return alert("Game is over. Refresh to start new game");
        }
        //check to see if someone won
        if(clickedGameSquare.state == "empty") {
            //eventually change marker to grab the player's marker
            gameMarker = _gameState.currentPlayerMarker;
            //call function to update square's state
            updateSquareState(clickedGameSquare, gameMarker, squareId);
            //check to see if someone won
            _determineWinner();
            if(_gameState.gameOver == false) {
                //update turn
                if(_gameState.currentPlayerName == playerOne.name) {
                    _gameState.currentPlayerName = playerTwo.name;
                    _gameState.currentPlayerMarker = playerTwo.marker;
                    console.log("Conditional inside updateState() Current player name: " + _gameState.currentPlayerName);
                    console.log("Conditional inside updateState() Current player marker: " + _gameState.currentPlayerMarker);
                    document.getElementById("turn-display").innerHTML = _gameState.currentPlayerName + "'s Turn";
                } else {
                    _gameState.currentPlayerName = playerOne.name;
                    _gameState.currentPlayerMarker = playerOne.marker;
                    console.log("Conditional inside updateState() Current player name: " + _gameState.currentPlayerName);
                    console.log("Conditional inside updateState() Current player marker: " + _gameState.currentPlayerMarker);
                    document.getElementById("turn-display").innerHTML = _gameState.currentPlayerName + "'s Turn";
                }
            }
        } else {
            alert("This square is already taken. Pick an empty one.");
        }
    }

    const updateSquareState = (clickedGameSquare, marker, squareId) => {
        //update state of square in array to equal player marker
        clickedGameSquare.state = marker;
        //update display to user
        document.getElementById(squareId).innerHTML = marker;
        //debug
        console.log(gameBoardModule.gameBoard);
    };

    return{updateState, startGame, restartGame, initializeGame}
})();

