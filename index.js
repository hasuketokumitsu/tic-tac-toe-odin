const game = (() => {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let player1Turn = true;
  let whichTurn = 0;
  let winner = false;
  const resultToDOM = document.getElementById("result"); // will be used to update the game result to DOM]
  let player1Name = "Player 1";
  let player2Name = "Player 2";
  let mark = "o"; // corresponds to player 1's mark

  const startButtonClickEvent = (() => {
    const signUpForm = document.getElementById("players-sign-up");
    signUpForm.addEventListener("submit", (eve) => {
      eve.preventDefault();

      // set players' input names to player1Name and player2Name const
      player1Name = document.getElementById("player1-name").value;
      player2Name = document.getElementById("player2-name").value;

      // Update playerTurn to show players' names in the game board
      playerTurnUpdate();

      // close the sign-up page and load the game board
      document.getElementById("players-sign-up-names").style.display = "none";
      document.getElementById("board").style.display = "block";
    });
  })();

  const gameBoardSquareClickEvent = (() => {
    // Target all squares and add click eventlistener
    const allSquares = document.querySelectorAll(".square");

    allSquares.forEach((square) => {
      square.addEventListener("click", () => {
        // Check if the game is already over
        if (winner === true) return;
        else {
          // When a square is clicked, look for the square id
          const whichSpot = parseInt(square.id);
          // Check same spot
          // Change gameBoard spot to "x" or "o"
          placeMarker(whichSpot);
          // Update the board
          gameBoardToDOM();
          whichTurn++;
          if (whichTurn >= 5) checkWinner();
          // After everything is done, toggle the player turn
          player1Turn = !player1Turn;
          playerTurnUpdate();
        }
      });
    });
  })();

  const placeMarker = (spot) => {
    // Only place marker if the spot is not already taken.
    if (gameBoard[spot] === "") {
      // Place mark to gameBoard
      gameBoard[spot] = mark;
    } else alert("Spot already taken.");
  };

  const playerTurnUpdate = () => {
    // toggle mark + toggle player-turn on html
    const playerTurnDOM = document.getElementById("player-turn");
    if (player1Turn === true) {
      mark = "o";
      playerTurnDOM.textContent = `${player1Name}'s turn`;
    } else {
      mark = "x";
      playerTurnDOM.textContent = `${player2Name}'s turn`;
    }
  };

  const gameBoardToDOM = () => {
    gameBoard.forEach((mark, i) => {
      let square = document.getElementById(`00${i}`);
      square.textContent = mark;
    });
  };

  const checkWinner = () => {
    // hide the player-turn part in html when the winner is announced???
    let playerTurnHTML = document.getElementById("player-turn");
    if (player1Turn === true) {
      winner = player1WinCheck();
      if (winner === true) {
        resultToDOM.textContent = `${player1Name} wins.`;
        playerTurnHTML.style.display = "none";
        return;
      }
    } else {
      winner = player2WinCheck();
      if (winner === true) {
        resultToDOM.textContent = `${player2Name} wins.`;
        playerTurnHTML.style.display = "none";
        return;
      }
    }
    if (whichTurn === 9) {
      resultToDOM.textContent = "Ties.";
      playerTurnHTML.style.display = "none";
      winner = true;
    }
  };

  const player1WinCheck = () => {
    if (gameBoard[0] === "o") {
      if (gameBoard[1] === "o" && gameBoard[2] === "o") return true;
      else if (gameBoard[3] === "o" && gameBoard[6] === "o") return true;
      else if (gameBoard[4] === "o" && gameBoard[8] === "o") return true;
    } else if (gameBoard[1] === "o") {
      if (gameBoard[4] === "o" && gameBoard[7] === "o") return true;
    } else if (gameBoard[2] === "o") {
      if (gameBoard[5] === "o" && gameBoard[8] === "o") return true;
      else if (gameBoard[4] === "o" && gameBoard[6] === "o") return true;
    } else if (gameBoard[3] === "o") {
      if (gameBoard[4] === "o" && gameBoard[5] === "o") return true;
    } else if (gameBoard[6] === "o") {
      if (gameBoard[7] === "o" && gameBoard[8] === "o") return true;
    } else return false;
  };

  const player2WinCheck = () => {
    if (gameBoard[0] === "x") {
      if (gameBoard[1] === "x" && gameBoard[2] === "x") return true;
      else if (gameBoard[3] === "x" && gameBoard[6] === "x") return true;
      else if (gameBoard[4] === "x" && gameBoard[8] === "x") return true;
    } else if (gameBoard[1] === "x") {
      if (gameBoard[4] === "x" && gameBoard[7] === "x") return true;
    } else if (gameBoard[2] === "x") {
      if (gameBoard[5] === "x" && gameBoard[8] === "x") return true;
      else if (gameBoard[4] === "x" && gameBoard[6] === "x") return true;
    } else if (gameBoard[3] === "x") {
      if (gameBoard[4] === "x" && gameBoard[5] === "x") return true;
    } else if (gameBoard[6] === "x") {
      if (gameBoard[7] === "x" && gameBoard[8] === "x") return true;
    } else return false;
  };
})();
