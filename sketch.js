const MAX_GRIDSIZE = 100;
const MIN_GRIDSIZE = 4;
let curColor = '#000000'; // black by default
// let traceFlag = false;

/* TODO: make "rainbow" function work" */

/**
 * Creates a grid of the specified grid size
 * 
 * @param {Number} gridSize 
 */
function create_grid(gridSize = 16) {
    const gridContainer = document.querySelector('.gridContainer');

    for (let i=0; i<gridSize; i++) {
        const row = document.createElement('div');
        row.className = 'row';

        for (let j=0; j<gridSize; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.addEventListener('mouseenter', (e) => {
                // if (curColor == 'rainbow') {
                //     e.target.style.backGroundColor = get_random_color();
                //     console.log(e.target.style.backGroundColor);
                // }
                // if (traceFlag == true) {
                //     e.target.style.filter = 'brightness(90%)';
                // }
                // else {
                    e.target.style.backgroundColor = curColor;
                // }
            });
            row.appendChild(cell);
        }

        gridContainer.appendChild(row);
    }
}

/**
 * Removes the previous grid
 */
function clear_grid() {
    const gridContainer = document.querySelector('.gridContainer');
    const rows = gridContainer.querySelectorAll('.row');
    
    rows.forEach(row => {
        const cells = row.querySelectorAll('.cell');
        cells.forEach(cell => {
            row.removeChild(cell);
        });
        gridContainer.removeChild(row);
    });
}

/**
 * Set up event listeners for the buttons
 */
function activate_buttons() {
    // Reset Button
    const resetBtn = document.querySelector('#resetBtn');
    resetBtn.addEventListener('click', (e) => {
        clear_grid();
        
        gridSize = prompt('How big should the new grid be?');
        gridSize = (gridSize <= MAX_GRIDSIZE) ? gridSize : MAX_GRIDSIZE;
        gridSize = (gridSize >= MIN_GRIDSIZE) ? gridSzie : MIN_GRIDSIZE;
        
        create_grid(+gridSize);
    });

    // color selector buttons
    const cntrlBtns = document.querySelector('.cntrlBtns');
    cntrlBtns.addEventListener('click', (e) => {

        let oldSelected = cntrlBtns.querySelector('.selected');
        oldSelected.classList.remove('selected');
        e.target.classList.add('selected');
        
        let newSelected = e.target.id;
        traceFlag = false;
        
        switch(newSelected) {
            // case 'rainbowBtn':
            //     curColor = 'rainbow';
            //     break;
            case 'inputBtn':
                curColor = prompt('Select a color', '#FF0000');
                if (!curColor) curColor = '#FF0000';
                curColor = curColor.padStart(6, 0);
                break;
            case 'randomBtn':
                curColor = get_random_color();
                break;
            // case 'traceBtn':
            //     traceFlag = true;
            case 'blackBtn':
            default:
                curColor = '#000000';
                break;
        }
    });
}

/**
 * Determine a random color for the "random" button
 * 
 * @returns {String} hexvalue
 */
function get_random_color() {
    let randomNum = Math.floor(Math.random() * 0xFFFFFF);
    randomNum = randomNum.toString(16);
    let hexValue = randomNum.padStart(6, 0); // to make it 6 digits long
    return `#${hexValue.toUpperCase()}`;
}

/** 
 * Initialize the grid
 */
function init_grid() {
    create_grid();
    activate_buttons();
}


init_grid();