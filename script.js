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
        event.target.style.backgroundColor = generateColor();
        event.target.classList.add('colored');
        console.log(generateColor());
        console.log(event.target.style.backgroundColor);
    } else {
        const rgb = splitRGB(event.target.style.backgroundColor);
        const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
        console.log(hsl);
        console.log(returnUsableColor(hsl));
        darkenedColor = darkenColor(hsl[0], hsl[1], hsl[2]);
        console.log(darkenedColor);
        event.target.style.backgroundColor = darkenedColor;
    }
}


function generateColor() {
    hue = Math.floor(Math.random() * 255);
    sat = Math.floor(Math.random() * 100);
    light = Math.floor(Math.random() * 100);
    return `hsl(${hue}, ${sat}%, ${light}%)`
}


function splitRGB(rgb) {
    console.log(rgb);
    let newRGB = rgb.split(', ');
    let newR = newRGB[0].slice(4);
    let newG = newRGB[1];
    let newB = newRGB[2].slice(0, newRGB[2].length - 1);
    let finalRGB = [newR, newG, newB];
    console.log(finalRGB);
    return finalRGB;
}


function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = (max - min);
        s = l >= 0.5 ? d / (2 - (max + min)) : d / (max + min);
        switch(max){
            case r: h = ((g - b) / d + 0)*60; break;
            case g: h = ((b - r) / d + 2)*60; break;
            case b: h = ((r - g) / d + 4)*60; break;
        }
    }

    return [h, s, l];
}

function returnUsableColor(hsl) {
    var str = '';
        str += Math.round(hsl[0]) + ",";
      str += Math.round(hsl[1]*100) + "%,";
      str += Math.round(hsl[2]*100) + "%";
      return str;
    }


function darkenColor (h, s, l) {
    l = l * (1 - 10/100);
    return `hsl(${h}, ${s}, ${l})`
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




