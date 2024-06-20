let renderGrid = () => {

    const numberOfElements = 9

    const container = document.getElementById('sudoku');

    for (let i = 0; i < numberOfElements; i++){

        const newGrid = document.createElement('div');

        newGrid.classList.add('grid');

        container.appendChild(newGrid)

        for (let j = 0; j < numberOfElements; j++){
            const newInnerGrid = document.createElement('div');

            newInnerGrid.classList.add('inner-grid');

            if (j % Math.floor(Math.random() * 9 + 1) == 0){
                newInnerGrid.textContent = Math.floor(Math.random() * 9 + 1);
            }

            newGrid.appendChild(newInnerGrid)
        }
    }
}

let addNumber = (number) => {

}

let removeNumber = (node) => {

}


/* 
TODO:
1. Need to able to perform various option on the board
 - Add number
 - Remove nubmer

1. Need to able to represnet the grid map in a good way and should somehow reflect the html structure

2. Check if the sudoku is valid

3. Create algorithm for solving


*/

renderGrid()