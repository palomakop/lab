const N = 10;
const liveLikelihood = 0.5;
const framesPerSecond = 30;
let grid = [];
let isPaused = false;

function setup() {
  createCanvas(N*40, N*40);
  for (let i = 0; i < N; i++) {
    let row = []
    for (let j = 0; j < N; j++) {
      row.push(random(0, 1) < liveLikelihood); // true means live
    }
    grid.push(row);
  }
  frameRate(framesPerSecond);
}

function keyTyped() {
  isPaused = !isPaused;
}

function check(i, j) {
  if (i < 0 || i >= N) {
    return 0;
  } else if (j < 0 || j >= N) {
    return 0;
  } else {
    return (grid[i][j])? 1 : 0;
  }
  
}

function sumNeighbors(i, j) {
  return check(i-1, j-1) +check(i, j-1) + check(i+1, j-1) +
    check(i-1, j) + check(i+1, j) +
    check(i-1, j+1) + check(i, j+1) + check(i+1, j+1);
}

let gridNeighbors = [];

function step() {
  let newGrid = []
  for (let i = 0; i < N; i++) {
    let row = [];
    for (let j = 0; j < N; j++) {
      let neighbors = sumNeighbors(i, j);
      if (grid[i][j]) {
        if (neighbors < 2 || neighbors > 3) {
          row.push(false);
        } else {
          row.push(true);
        }
      } else {
        if (neighbors == 3) {
          row.push(true);
        } else {
          row.push(false);
        }
      }
    }
    newGrid.push(row);
  }
  grid = newGrid;
}

function mouseClicked() {
  let squarei = floor((mouseX)/40);
  let squarej = floor((mouseY)/40);
  console.log(mouseX, mouseY, squarei, squarej);
  if (squarei >= 0 && squarei < N && squarej >= 0 && squarej < N) {
    grid[squarei][squarej] = !grid[squarei][squarej];
  }
}

function draw() {
  if (isPaused) {
    background('red');
  } else {
    background(255);
  }
  
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (grid[i][j]) {
        fill(0,200);
      } else {
        fill(255,150);
      }
      square(i*40, j*40, 40);
    }
  }
  
  if (frameCount % (framesPerSecond/5) == 0 && !isPaused) {
    step();
  }
}