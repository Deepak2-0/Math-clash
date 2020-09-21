let target;
let score = 0;

let currentSum = 0;
let columnSize = 6;
let rowSize = 6;
let grid = [];

const getTarget = () => {
  target = 15 + Math.floor(Math.random() * 20);
  document.getElementById("toScore").innerHTML = target;
};
let c = 0;
const updateScore = (score) => {
  document.getElementById("scoreBoard").innerHTML = "Score: " + score;
};

const addCells = () => {
  c++;
  console.log("c is " + c);
  if (c === 8) {
    document.getElementById("gameOverContainer").classList.remove("hide");
    window.stop();
    throw new Error("Stop script");
  }
  let arr = [];
  for (let i = 0; i < columnSize; i++) {
    let obj = {};
    obj.value = Math.ceil(Math.random() * 9);
    obj.selected = false;
    arr.push(obj);
  }
  grid.unshift(arr);
};

const updateBoard = () => {
  // console.log("uodateBoard is working grid length is " + grid.length);
  for (let i = 0; i < grid.length; i++) {
    // console.log("i is working");
    for (let j = 0; j < grid[i].length; j++) {
      // console.log("j is working");
      const el = document.getElementById(getStringId(i, j));
      el.innerHTML = grid[i][j].value;

      if (grid[i][j].selected === true) {
        el.classList.add("selected");
      } else if (el.classList.contains("selected")) {
        el.classList.remove("selected");
      }
    }
  }
};

let gameOver = () => {
  // console.log("gameOver is working");

  if (grid.length < rowSize) {
    return false;
  }
  if (c === 8) {
    return true;
  }

  for (let i = 0; i < columnSize; i++) {
    if (grid[rowSize - 1][i].value !== "") {
      return true;
    }
  }

  return false;
};

let startTimer = () => {
  let id = setInterval(() => {
    addCells();

    updateBoard();

    if (gameOver()) {
      //document.getElementById("gameRegion").classList.add("abs");
      document.getElementById("gameOverContainer").classList.remove("hide");
      clearInterval(id);
      return;
    }
  }, 5000);
};

const getStringId = (i, j) => {
  return i.toString() + j.toString();
};

const createBoard = () => {
  let box = document.getElementById("bottom");
  let cellContainer = document.createElement("div");
  cellContainer.id = "cellContainer";
  for (let i = 0; i < 6; i++) {
    let row = document.createElement("div");
    row.className = "row";
    for (let j = 0; j < 6; j++) {
      let column = document.createElement("div");
      column.className = "column";
      column.id = getStringId(i, j);
      column.addEventListener("click", () => handleClick(column, i, j));
      row.appendChild(column);
    }
    cellContainer.appendChild(row);
  }
  box.appendChild(cellContainer);
  updateBoard();
  getTarget();
  updateScore(0);
};

createBoard();
startTimer();

const startNewGame = () => {
  c = 0;
  currentSum = 0;
  score = 0;
  grid = [];
  document.getElementById("gameOverContainer").classList.add("hide");
  //document.getElementById("gameRegion").classList.remove("abs");
  let el = document.getElementById("cellContainer");
  document.getElementById("bottom").removeChild(el);
  createBoard();
  startTimer();
};

const deselectAllSelected = () => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j].selected = false;
    }
  }
};

const removeAllSelected = () => {
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j].selected) {
        count++;
        grid[i][j].value = "";
        grid[i][j].selected = false;
      }
    }
  }
  return count;
};

const handleClick = (column, i, j) => {
  if (grid[i][j] === "") return;

  grid[i][j].selected = !grid[i][j].selected;

  if (grid[i][j].selected) {
    currentSum += grid[i][j].value;
  } else {
    currentSum -= grid[i][j].value;
  }

  if (currentSum > target) {
    currentSum = 0;
    deselectAllSelected();
  } else if (currentSum === target) {
    currentSum = 0;
    let noOfCellsRemoved = removeAllSelected();
    score += noOfCellsRemoved;
    getTarget();
    updateScore(score);
  }

  document.getElementById("sumLeft").innerHTML = currentSum;
  updateBoard();
};
