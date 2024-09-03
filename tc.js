document.addEventListener('DOMContentLoaded', () => {
  const cells = document.querySelectorAll('.cell');
  let currentPlayer = 'X'; // Set the initial player to 'X'
  const board = Array(3).fill(null); // Initialize the game board as an array of nulls (3x3 grid)

  // Function to check if there's a winner
  const checkWinner = () => {
    // Define all possible winning combinations
    const winningCombinations = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];

    // Loop through each winning combination
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      // Check if the current combination is fulfilled by a player
      if (board[a - 1] && board[a - 1] === board[b - 1] && board[a - 1] === board[c - 1]) {
        return board[a - 1]; // Return the winner ('X' or 'O')
      }
    }
    // Return 'Tie' if no more moves are left, otherwise return null
    return board.includes(null) ? null : 'Tie';
  };

  // Function to handle a click on a cell
  const handleClick = (e) => {
    // Get the index of the clicked cell
    const index = e.target.getAttribute('data-index') - 1;
    
    // If the cell is already occupied or there's a winner, do nothing
    if (board[index] || checkWinner()) return;

    // Mark the cell with the current player's symbol
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    // Check if there is a winner after the move
    const winner = checkWinner();
    if (winner) {
      // Delay the alert and game reset to allow for visual confirmation of the last move
      setTimeout(() => {
        alert(winner === 'Tie' ? 'It\s a tie!' : `${winner} wins!`);
        resetGame(); // Reset the game after displaying the winner
      }, 100);
    } else {
      // Switch to the other player if there's no winner
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  };

  // Function to reset the game board and cells for a new game
  const resetGame = () => {
    board.fill(null); // Clear the board array
    cells.forEach(cell => cell.textContent = ''); // Clear the text in each cell
    currentPlayer = 'X'; // Reset the current player to 'X'
  };

  // Add a click event listener to each cell
  cells.forEach(cell => cell.addEventListener('click', handleClick));
})