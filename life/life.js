
let w;
let columns;
let rows;
let board;
let next;
//let changed;
let poem;

function preload() {
    // text = loadStrings("text.txt");
    // console.log(text)
    
}

function setup() {
  // Set simulation framerate to 10 to avoid flickering
  frameRate(2);
  createCanvas(720, 400);
  w = 40;
  // Calculate columns and rows
  columns = floor(width / w);
  rows = floor(height / w);
  // Wacky way to make a 2D array is JS
  board = new Array(columns);
  for (let i = 0; i < columns; i++) {
    board[i] = new Array(rows);
  }
  // Going to use multiple 2D arrays and swap them
  next = new Array(columns);
  for (i = 0; i < columns; i++) {
    next[i] = new Array(rows);
  }
  let text = "—But a lovely mummer! he murmured to himself. Kinch, the loveliest mummer of them all! He shaved evenly and with care, in silence, seriously. Stephen, an elbow rested on the jagged granite, leaned his palm against his brow and gazed at the fraying edge of his shiny black coat-sleeve. Pain, that was not yet the pain of love, fretted his heart. Silently, in a dream she had come to him after her death, her wasted body within its loose brown graveclothes giving off an odour of wax and rosewood, her breath, that had bent upon him, mute, reproachful, a faint odour of wetted ashes. Across the threadbare cuffedge he saw the sea hailed as a great sweet mother by the wellfed voice beside him. The ring of bay and skyline held a dull green mass of liquid. A bowl of white china had stood beside her deathbed holding the green sluggish bile which she had torn up from her rotting liver by fits of loud groaning vomiting. Buck Mulligan wiped again his razorblade. —Ah, poor dogsbody! he said in a kind voice. I must give you a shirt and a few noserags. How are the secondhand breeks? —They fit well enough, Stephen answered. Buck Mulligan attacked the hollow beneath his underlip. ";
    // split based on lines and spaces into a 2D array
    text = text.split(" ");
    poem = new Array(columns);
    for (let i = 0; i < columns; i++) {
      poem[i] = new Array(rows);
    }
    for (let index = 0; index < text.length; index++) {
      let i = index % columns;
      let j = Math.floor(index/columns);
      poem[i][j] = text[index];
    } 
  init();
}

function draw() {
  background(255);
  stroke(0);
  generate();
  for ( let i = 0; i < columns;i++) {
    for ( let j = 0; j < rows;j++) {
      if ((board[i][j] == 1))  {
        fill(0);
        // draw text at the center of the cell
        textAlign(CENTER);
      } else {
        fill(255);
      }
      text(poem[i][j], i * w + w / 2, j * w + w / 2);
    //   stroke(0);
    //   rect(i * w, jr * w, w-1, w-1);
    }
  }

}

// reset board when mouse is pressed
function mousePressed() {
  init();
}

// Fill board randomly
function init() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      // Lining the edges with 0s
      if (i == 0 || j == 0 || i == columns-1 || j == rows-1) board[i][j] = 0;
      // Filling the rest randomly
      else board[i][j] = floor(random(2));
      next[i][j] = 0;
      //changed[i][j] = 0;
    }
  }
}

// The process of creating the new generation
function generate() {

  // Loop through every spot in our 2D array and check spots neighbors
  for (let x = 1; x < columns - 1; x++) {
    for (let y = 1; y < rows - 1; y++) {
      // Add up all the states in a 3x3 surrounding grid
      let neighbors = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          neighbors += board[x+i][y+j];
        }
      }

      // A little trick to subtract the current cell's state since
      // we added it in the above loop
      neighbors -= board[x][y];
      // Rules of Life
      if      ((board[x][y] == 1) && (neighbors <  2)) next[x][y] = 0;           // Loneliness
      else if ((board[x][y] == 1) && (neighbors >  3)) next[x][y] = 0;           // Overpopulation
      else if ((board[x][y] == 0) && (neighbors == 3)) next[x][y] = 1;           // Reproduction
      else                                             next[x][y] = board[x][y]; // Stasis
    }
  }



  // Swap!
  swapWords(board, next, transform);
  let temp = board;
  board = next;
  next = temp;
  
}

// function swap(word, monad) {
//   let new_word = monad(word)
//   return new_word
// }

function swapWords(prev, current, monad) {
  //let changed
  //changed = new Array (columns);
  //for (let i = 0; i < columns; i++) {
  //   board[i] = new Array(rows);
  // }
  for (let i = 0; i < columns; i++){
    for (let j = 0; j < rows;j++) {
      //let index = j * columns + i;
      let old_word = poem[i][j];
      let new_word = monad(old_word);
      if (current[i][j] == 1 && prev[i][j] == 0) {
        poem[i][j] = new_word;
      }
      console.log(i, j, old_word, new_word, prev[i][j], current[i][j]);
    }
  }
}

function transform(inputWord) {
    return "life";
}