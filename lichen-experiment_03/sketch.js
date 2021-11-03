const ballCount = 100;
let x = [];
let y = [];
let size = [];
let xSpeed = [];
let ySpeed = [];
let traveledDist = [];
let r = [];
let g = [];
let b = [];

class Cell {
  constructor(x, y, size, xSpeed, ySpeed, traveledDist, r, g, b) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.traveledDist = traveledDist;
    this.r = r;
    this.g = g;
    this.b = b;
  }
}

const cells = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  generateCells(100, 3, 30);
  console.log(cells)
}

function draw() {
  background(0, 50);
  
  // moveCells(300)
  
}

function moveCells(maxDist) {
  for(let i = 0; i < ballCount; i++){
    let oldX = x[i];
    let oldY = y[i];

    x[i] += xSpeed[i];
    y[i] += ySpeed[i];

    traveledDist[i] += dist(oldX, oldY, x[i], y[i]);
 
    if (traveledDist[i] > maxDist){
      xSpeed[i] = 0;
      ySpeed[i] = 0;
    }

    fill(r[i], g[i], b[i])
    noStroke()
    ellipse(x[i], y[i], size[i], size[i]);
  }
}

function generateCells(amount, minSize, maxSize) {
  const internalCellArr = [];
  for(let i = 0; i < amount; i++) {

    const x = width / 2; 
    const y = height / 2; 

    const xSpeed = random(-5, 5);
    const ySpeed = random(-5, 5);

    const traveledDist = 0;
    const size = random(minSize, maxSize);

    const r = random(0, 256);
    const g = random(0, 256);
    const b = random(0, 256);

    internalCellArr.push(new Cell(x, y, size, xSpeed, ySpeed, traveledDist, r, g, b))
  }
  cells.push(internalCellArr);
}

/* function generateCells(amount, minSize, maxSize) {
  for(let i = 0; i < amount; i++) {

    x[i] = width / 2; 
    y[i] = height / 2; 

    xSpeed[i] = random(-5, 5);
    ySpeed[i] = random(-5, 5);

    traveledDist[i] = 0;

    size[i] = random(minSize, maxSize);

    r[i] = random(0, 256);
    g[i] = random(0, 256);
    b[i] = random(0, 256);
  }
} */

