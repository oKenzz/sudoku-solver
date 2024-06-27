let map = [];
const rowSets = [];
const columnSets = [];
const gridSets = [];
let cells = [];
let selected = null;

const createGrid = () => {
  const numberOfElements = 9;
  const container = document.getElementById("sudoku");
  for (let i = 0; i < numberOfElements; i++) {
    const newGrid = document.createElement("div");
    newGrid.classList.add("grid");
    container.appendChild(newGrid);
    for (let j = 0; j < numberOfElements; j++) {
      const newInnerGrid = document.createElement("div");
      newInnerGrid.classList.add("inner-grid");
      newInnerGrid.addEventListener("click", (e) => select(e.target, e));
      newGrid.appendChild(newInnerGrid);
    }
  }
  document.addEventListener('keydown', (e) => addNumber(selected, Number(e.key)));
  document.addEventListener('keydown', (e) => removeNumber(selected, e.key, false))
  const button = document.getElementsByClassName('basic-button')[0];
  button.addEventListener("click", () => solveSudoku());
};

const select = (cell, e) => {
  if (selected == cell) {
    selected = null;
    e.target.style.backgroundColor = "white"
  } else {
    if (selected != null) {
      selected.style.backgroundColor = "white"
    }
    selected = cell;
    e.target.style.backgroundColor = "CornFlowerBlue"
  }
}

const renderGrid = () => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map.length; j++) {
      base = Math.floor(i / 3) * 27 + (i % 3) * 3;
      elementIndex = base + (j % 3) + Math.floor(j / 3) * 9;
      if (map[i][j] != 0) {
        cells[elementIndex].textContent = map[i][j];
      }
    }
  }
};

const initializeMap = () => {
  for (let i = 0; i < 9; i++) {
    map.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    rowSets.push(new Set());
    columnSets.push(new Set());
    gridSets.push(new Set());
    cells = [...document.getElementsByClassName('inner-grid')]
  }
};

const generateMap = () => {
  // 1. Place out random numbers
  // 2. Create a solution
  // 3. Remove numbers to create a puzzle
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const number = Math.floor(Math.random() * 9);
      const cellNumber = getCellFromRowAndColumn(i, j);
      const gridNumber = getGrid(cellNumber);
      if (number != 0 && !(rowSets.at(i).has(number) || columnSets.at(j).has(number) || gridSets.at(gridNumber).has(number))) {
        map[i][j] = number;
        rowSets[i].add(number);
        columnSets[j].add(number);
        gridSets[gridNumber].add(number);
      }
    }
  }
  renderGrid();
};

const removeRandomCells = (difficulty) => {
  // TODO:
}

const reset = () => {
  // TODO:
}

const getCellFromRowAndColumn = (row, column) => {
  const subgridRowIndex = Math.floor(row / 3);
  const subgridColumnIndex = Math.floor(column / 3);
  const withinBlockRowIndex = row % 3;
  const withinBlockColumnIndex = column % 3;
  const baseNumber = (subgridRowIndex * 3 + subgridColumnIndex) * 9;
  const overallNumber = baseNumber + withinBlockRowIndex * 3 + withinBlockColumnIndex;
  return overallNumber;
};

const getRowAndColumnFromCell = (cell) => {
  const position = cell % 9;
  const baseRow = Math.floor(position / 3);
  const baseColumn = position % 3;
  const gridNumber = getGrid(cell);
  const row = baseRow + Math.floor(gridNumber / 3) * 3;
  const column = baseColumn + gridNumber % 3 * 3;
  return { row, column };
};

const getGrid = (cell) => {
  return Math.floor(cell / 9);
};

const addNumber = (cell, number) => {
  const index = cells.indexOf(cell);
  const coordinates = getRowAndColumnFromCell(index); // Originally index
  const row = coordinates.row;
  const column = coordinates.column;
  if (cell != null && number > 0 && !(rowSets[row].has(number) || columnSets[column].has(number) || gridSets[getGrid(index)].has(number))) {
    const prevNumber = map[row][column];
    rowSets[row].delete(prevNumber);
    columnSets[column].delete(prevNumber);
    gridSets[getGrid(index)].delete(prevNumber)
    map[row][column] = number;
    rowSets[row].add(number);
    columnSets[column].add(number);
    gridSets[getGrid(index)].add(number);
    cell.textContent = number
    if (completeSudoku()) {
      if (isValid()) {
        console.log("Sudoku solved")
      }
    }
    return true;
  }
  return false;
};

const removeNumber = (cell, key, solving) => {
  if (cell != null) {
    const index = cells.indexOf(cell);
    const coordinates = getRowAndColumnFromCell(index);
    const row = coordinates.row;
    const column = coordinates.column;
    const number = map[row][column];
    if (key == "Backspace" && number != 0 || solving) {
      map[row][column] = 0;
      rowSets[row].delete(number);
      columnSets[column].delete(number);
      gridSets[getGrid(index)].delete(number);
      cell.textContent = "";
    };
  }

}

const isValid = () => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 1; j < map.length; j++) {
      if (!(gridSets[i].has(j) && rowSets[i].has(j) && columnSets[i].has(j))) {
        return false;
      }
    }
  }
  return true;
}

const completeSudoku = () => {
  for (let row = 0; row < map.length; row++) {
    for (let column = 0; column < map.length; column++) {
      if (map[row][column] == 0) return false;
    }
  }
  return true;
}

const solveSudoku = async (delay = 10) => {
  for (let row = 0; row < map.length; row++) {
    for (let column = 0; column < map.length; column++) {
      if (map[row][column] == 0) {
        const cellNumber = getCellFromRowAndColumn(row, column);
        const cell = cells[cellNumber];
        for (let number = 1; number <= 9; number++) {
          if (addNumber(cell, number)) {
            await new Promise(resolve => setTimeout(resolve, delay));
            if (await solveSudoku(delay)) return true;
          }
        }
        removeNumber(cell, null, true);
        return false;
      }
    }
  }
  return true;
}

const initialize = () => {
  createGrid();
  initializeMap()
  // generateMap();
}

// TODO:
//  1. Generate map with solve
//  2. Reset button
//  3. Optimize??? (Freezes on extreme difficulty)
//  4. Modularize
//  5. Visualizer
//  6. Lock in system mode to test (toggleable)
//
// Ideas:
//  - Selection, Have to lock in so you can try different numbers and follow through and determine if it makes sense
//  - paper (Notes)
//  - Remaining Number left to be placed
//  - Highlight all number of selected
//  - Multiple input method for numbers
//  - Highlight wrong in current context

// Problems:
// - Removing all cells lead to incosistent cell sizes
// - Uncaught error caused by removeNumber
initialize()
