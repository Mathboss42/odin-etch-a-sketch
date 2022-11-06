const container = document.querySelector('#container');

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
            // newDiv.textContent = 'test';
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


makeGrid(16, 16);


getRows().forEach(cell => cell.addEventListener('mouseover', colorCell));


function colorCell(event) {
    event.target.classList.add('colored');
}