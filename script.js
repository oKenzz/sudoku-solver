let createGrid = () => {

    const numberOfElements = 9

    const container = document.getElementById('sudoku');

    for (let i = 0; i < numberOfElements; i++){

        const newGrid = document.createElement('div');

        newGrid.classList.add('grid');

        container.appendChild(newGrid)

        for (let j = 0; j < numberOfElements; j++){
            const newInnerGrid = document.createElement('div');

            newInnerGrid.classList.add('inner-grid');

            newGrid.appendChild(newInnerGrid)
        }
    }
}

let renderGrid = () => {
    const innerGrid = document.getElementsByClassName('inner-grid')
    for (let i = 0; i < map.length; i++){
        for (let j = 0; j < map.length; j++){
            base = Math.floor(i / 3) * 27 + (i % 3) * 3;
            elementIndex = base + (j % 3) + (Math.floor(j / 3) * 9)
            if (map[i][j] != 0){
                innerGrid[elementIndex].textContent = map[i][j]
            }
        }
    }
}

let map = []
let rowSets = []
let columnSets = []
let gridSets = []
let ratioNumber = [0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9]
let initializeMap = () => {
    for (let i = 0; i < 9; i++){
        map.push([0,0,0,0,0,0,0,0,0])
        rowSets.push(new Set())
        columnSets.push(new Set())
        gridSets.push(new Set())
    }
}

let generateMap = () => {
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            const index = Math.floor(Math.random() * (18))
            const number = ratioNumber[index]
            const innerGridNumber = getInnerGridFromRowAndColumn(i,j)
            const gridNumber = getGrid(innerGridNumber)
            if (number != 0 && !((rowSets.at(i).has(number)) || columnSets.at(j).has(number) || gridSets.at(gridNumber).has(number))){
                map[i][j] = number;
                rowSets[i].add(number)
                columnSets[j].add(number)
                gridSets[gridNumber].add(number)
            }

        }
    }
    console.log(map)
    console.log(rowSets)
    console.log(columnSets)
    console.log(gridSets)
    renderGrid()
}

let getInnerGridFromRowAndColumn = (row, column) => {
    const subgridRowIndex = Math.floor(row / 3);
    const subgridColumnIndex = Math.floor(column / 3);
    const withinBlockRowIndex = row % 3;
    const withinBlockColumnIndex = column % 3;
    const baseNumber = (subgridRowIndex * 3 + subgridColumnIndex) * 9;
    const overallNumber = baseNumber + (withinBlockRowIndex * 3) + withinBlockColumnIndex;
    return overallNumber;
}

let getRowAndColumnFromInnerGrid = (number) => {
    // TODO
}

let getGrid = (node) => {
    return Math.floor(node / 9)
}

let addNumber = (number) => {
    // TODO
}

let removeNumber = (node) => {
    // TODO
}

createGrid() 
initializeMap() 
generateMap()
