// script.js

const n = 9;
const boardDiv = document.getElementById('board');
let fullSolution = null;

// 1) Build the 9×9 input grid
for (let idx = 0; idx < n * n; idx++) {
  const input = document.createElement('input');
  input.type = 'text';
  input.maxLength = '1';
  input.id = 'cell-' + idx;
  boardDiv.appendChild(input);
}

// 2) “isValid” now takes n, just like your C++ version
function isValid(board, i, j, num, n) {
  for (let x = 0; x < n; x++) {
    if (board[i][x] === num || board[x][j] === num) {
      return false;
    }
  }
  const rn = Math.sqrt(n);
  const si = i - (i % rn);
  const sj = j - (j % rn);
  for (let x = si; x < si + rn; x++) {
    for (let y = sj; y < sj + rn; y++) {
      if (board[x][y] === num) {
        return false;
      }
    }
  }
  return true;
}

// 3) “sudokuSolver” with (board, i, j, n)
function sudokuSolver(board, i, j, n) {
  if (i === n) {
    return true;              // completely filled
  }
  if (j === n) {
    return sudokuSolver(board, i + 1, 0, n);
  }
  if (board[i][j] !== 0) {
    return sudokuSolver(board, i, j + 1, n);
  }
  for (let num = 1; num <= n; num++) {
    if (isValid(board, i, j, num, n)) {
      board[i][j] = num;
      if (sudokuSolver(board, i, j + 1, n)) {
        return true;
      }
      board[i][j] = 0;  // backtrack
    }
  }
  return false;
}

// 4) “New Puzzle” button handler
function newSudoku() {
  // start with empty
  let board = Array.from({ length: n }, () => Array(n).fill(0));

  // fill diagonal 3×3 blocks to guarantee solvability
  for (let r = 0; r < n; r += 3) {
    fillDiagonalBox(board, r, r);
  }

  // now solve it to get the complete solution
  sudokuSolver(board, 0, 0, n);
  fullSolution = board.map(row => [...row]); // deep copy

  // remove a random set of cells to create the puzzle
  let clues = 25 + Math.floor(Math.random() * 5);
  let toRemove = n * n - clues;
  while (toRemove > 0) {
    let r = Math.floor(Math.random() * n),
        c = Math.floor(Math.random() * n);
    if (board[r][c] !== 0) {
      board[r][c] = 0;
      toRemove--;
    }
  }

  // render puzzle into inputs
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const cell = document.getElementById(`cell-${i * n + j}`);
      cell.value = board[i][j] === 0 ? '' : board[i][j];
    }
  }
}

// 5) “Solve” button handler
function solveSudoku() {
  if (!fullSolution) {
    alert('No solution available — generate a puzzle first!');
    return;
  }
  // just fill the saved solution
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      document.getElementById(`cell-${i * n + j}`).value = fullSolution[i][j];
    }
  }
  alert('Solved!');
}

// helper: fill a 3×3 block at (row, col) with a random perm of 1..9
function fillDiagonalBox(board, row, col) {
  let nums = shuffle(Array.from({ length: n }, (_, i) => i + 1));
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      board[row + i][col + j] = nums.pop();
    }
  }
}

// Fisher–Yates shuffle
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// generate on load
window.onload = newSudoku;
