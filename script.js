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
    if (!(event.target.classList.contains('colored'))) {
        newColor = generateColor();
        newColorString = formatColorString(newColor);
        event.target.style.backgroundColor = newColorString;
        event.target.classList.add('colored');
        event.target.setAttribute('data-color', newColor);
        // console.log('dataset ' + event.target.dataset.color)
        // console.log('color generated: ' + newColorString);
    } else {

        let newHsl = event.target.dataset.color
        console.log('newhsl = ' + newHsl);
        newHsl = newHsl.split(',');
        // console.log('newhsl split = ' + newHsl);
        darkenedColor = darkenColor(newHsl[0], newHsl[1], newHsl[2]);
        darkenedColorString = formatColorString(darkenedColor);
        // console.log('darkened color is ' + darkenedColor);
        event.target.style.backgroundColor = darkenedColorString;
        event.target.setAttribute('data-color', darkenedColor);
    }
}


function generateColor() {
    hue = Math.floor(Math.random() * 255);
    sat = Math.floor(Math.random() * 100);
    light = Math.floor(Math.random() * 100);
    return [hue, sat, light];
}


function formatColorString([hue, sat, light]) {
    return `hsl(${hue}, ${sat}%, ${light}%)`;
}


function darkenColor (h, s, l) {
    if (l < 2) {
        l = 0;
    } else {
        l = l * (1 - 40/100);
    }
        console.log('l = ' + l);
    return [h, s, l];
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
        return null;
    } else {
        return newSize; 
    }
}


makeGrid(16, 16);




