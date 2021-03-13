const game = (() => {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let player1 = false;
  let turn = 0;
  let winner = false;
  const resultToDOM = document.getElementById("result"); // will be used to update the game result to DOM

  const clickEvent = (() => {
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
        }
      });
    });
  })();

  const placeMarker = (spot) => {
    // Only place marker if the spot is not already taken.
    if (gameBoard[spot] === "") {
      // Change the gameBoard arr to "x" or "o"
      gameBoard[spot] = playerToggler();
      // Update the board
      gameBoardToDOM();
      turn++;
      if (turn >= 5) checkWinner();
    } else alert("Spot already taken.");
  };

  const playerToggler = () => {
    player1 = !player1;
    return player1 ? "o" : "x";
  };

  const gameBoardToDOM = () => {
    gameBoard.forEach((mark, i) => {
      let square = document.getElementById(`00${i}`);
      square.textContent = mark;
    });
  };

  const checkWinner = () => {
    if (turn % 2 === 1) {
      winner = player1WinCheck();
      if (winner === true) {
        resultToDOM.textContent = "Player 1 wins.";
        return;
      }
    } else {
      winner = player2WinCheck();
      if (winner === true) {
        resultToDOM.textContent = "Player 2 wins.";
        return;
      }
    }
    if (turn === 9) {
      resultToDOM.textContent = "Ties.";
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
