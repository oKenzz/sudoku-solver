const map = [];
const rowSets = [];
const columnSets = [];
const gridSets = [];
const ratioNumber = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const cells = document.getElementsByClassName('inner-grid')

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
      newGrid.appendChild(newInnerGrid);
    }
  }
};

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
  }
};

const generateMap = () => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const index = Math.floor(Math.random() * 18);
      const number = ratioNumber[index];
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

// TODO: Add error handling for unvalid inputs
const addNumber = (index, number) => {
  const cell = cells[index];
  cell.textContent = number
  const coordinates = getRowAndColumnFromCell(index);
  const row = coordinates.row;
  const column = coordinates.column;
  map[row][column] = number
};

// TODO: Add error handling for unvalid inputs
const removeNumber = (index) => {
  const cell = cells[index];
  cell.textContent = "";
  const coordinates = getRowAndColumnFromCell(index);
  const row = coordinates.row;
  const column = coordinates.column;
  map[row][column] = 0
};

createGrid();
initializeMap();
generateMap();
console.log(cells)
