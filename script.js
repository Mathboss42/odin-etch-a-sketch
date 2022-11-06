const container = document.querySelector('#container');
const button = document.querySelector('button');

button.addEventListener('click', changeGrid);

function makeGrid (columns, rows) {
    makeColumns(columns);
    makeRows(rows);
}


function makeColumns (columns) {
    for (let i = 0; i < columns; i++) {
        const newDiv = document.createElement('div');
        container.appendChild(newDiv);
        newDiv.setAttribute('class', 'column');
    }
}


function makeRows (rows) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < getColumns().length; j++) {
            const newDiv = document.createElement('div');
            getColumns()[j].appendChild(newDiv);
            newDiv.setAttribute('class', 'row');
            getRows().forEach(cell => cell.addEventListener('mouseover', colorCell));
        }
    }
}


function getColumns() {
    const columns = Array.from(document.querySelectorAll('.column'));
    return columns;
}


function getRows() {
    const rows = Array.from(document.querySelectorAll('.row'));
    return rows;
}


function colorCell(event) {
    event.target.classList.add('colored');
}


function changeGrid() {
    let newSizeX = promptDimension('height');
    if (newSizeX === null) {    
        return;
    }
    let newSizeY = promptDimension('width');
    if (newSizeY === null) {    
        return;
    }
    getRows().forEach(row => row.remove());
    getColumns().forEach(row => row.remove());
    makeGrid(newSizeX, newSizeY);
  
}

function promptDimension(direction) {
    const newSize = prompt(`Please specify grid ${direction}. \nMax size: 100x100`);
    if (isNaN(newSize) || (newSize === '')) {
        alert('Invalid input, please specify a valid grid size between 1x1 and 100x100');
        return promptDimension(direction);
    } else if (newSize === null) {
        return;
    } else {
        return newSize; 
    }
}


makeGrid(16, 16);




