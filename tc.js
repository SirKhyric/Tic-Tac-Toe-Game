document.addEventListener('DOMContentLoaded', () => {
  const cells = document.querySelectorAll('.cell');
  let currentPlayer = 'X';
  const board = Array(3).fill(null);

  const checkWinner = () => {
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

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a - 1] && board[a - 1] === board[b - 1] && board[a - 1] === board[c - 1]) {
        return board[a-1];
      }
    }
    return board.includes(null) ? null : 'Tie';
  };

  const handleClick = (e) => {
    const index = e.target.getAttribute('data-index') - 1;
    
    if (board[index] || checkWinner()) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
      setTimeout(() => {
        alert(winner === 'Tie' ? 'It\s a tie!' : `${winner} wins!`);
        resetGame();
      }, 100);
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  };

  const resetGame = () => {
    board.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
  };

  cells.forEach(cell => cell.addEventListener('click', handleClick));
})