/* const ballCount = 100;
let x = [];
let y = [];
let size = [];
let xSpeed = [];
let ySpeed = [];
let traveledDist = [];
let r = [];
let g = [];
let b = []; */

maxDistDecrementor = 300


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

  // generateCells(100, 3, 30);
  console.log(cells)
}

function draw() {
  background(0, 50);
  
  for (let i = 10; i > 0; i--) {
    /* const amount = random(i * 10, i * 20);
    const minSize = random(i, i * 2);
    const maxSize = random(i * 2, i * 5);
    generateAndMoveCellPulse(amount, minSize, maxSize) */
    generateAndMoveCellPulse(100, 2, 8);
  }
  noLoop();
}


function generateAndMoveCellPulse(amount, minSize, maxSize) {
  maxDistDecrementor -= 30;
  const pulseGeneration = generateCells(amount, minSize, maxSize);
  for (let i = 0; i < pulseGeneration.length; i++) {
    moveCells(pulseGeneration, maxDistDecrementor);
  }
}

function moveCells(cellArr, maxDist) {
  for(let i = 0; i < cellArr.length; i++){
    /* console.log(cells[i].x) */
    let oldX = cellArr[i].x;
    let oldY = cellArr[i].y;

    cellArr[i].x += cellArr[i].xSpeed;
    cellArr[i].y += cellArr[i].ySpeed;

    cellArr[i].traveledDist += dist(oldX, oldY, cellArr[i].x, cellArr[i].y);
 
    if (cellArr[i].traveledDist > maxDist){
      cellArr[i].xSpeed = 0;
      cellArr[i].ySpeed = 0;
    }

    fill(cellArr[i].r, cellArr[i].g, cellArr[i].b)
    noStroke()
    ellipse(cellArr[i].x, cellArr[i].y, cellArr[i].size, cellArr[i].size);
  }
}

function generateCells(amount, minSize, maxSize) {
  const internalGenArray = []
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

    internalGenArray.push(new Cell(x, y, size, xSpeed, ySpeed, traveledDist, r, g, b))
  }
  return internalGenArray;
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

