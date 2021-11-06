globalMaxDistDecrementor = 300

class Cell {
  constructor(x, y, size, xSpeed, ySpeed, traveledDist, maxDist, h, s, l) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.traveledDist = traveledDist;
    this.maxDist = maxDist;
    this.h = h;
    this.s = s;
    this.l = l;
  }
}

const cells = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode('HSL', 100);

  for (let i = 10; i > 0; i--) {
    const amount = random(i * 10, i * 20);
    const minSize = random(i, i * 2);
    const maxSize = random(i * 2, i * 5);
    cells.push(generateCellGeneration(amount, minSize, maxSize));
  }
  console.log(cells)
}

function draw() {
  background(100)
  for (let i = 0; i < cells.length; i++) {
    moveCells(cells[i]);
  }  
}


function generateCellGeneration(amount, minSize, maxSize) {
  const pulseGeneration = generateCells(amount, minSize, maxSize, globalMaxDistDecrementor);
  globalMaxDistDecrementor -= 30;
  return pulseGeneration
}

function moveCells(cellArr) {
  for(let i = 0; i < cellArr.length; i++){
    /* console.log(cells[i].x) */
    let oldX = cellArr[i].x;
    let oldY = cellArr[i].y;

    cellArr[i].x += cellArr[i].xSpeed;
    cellArr[i].y += cellArr[i].ySpeed;

    cellArr[i].traveledDist += dist(oldX, oldY, cellArr[i].x, cellArr[i].y);
 
    if (cellArr[i].traveledDist > cellArr[i].maxDist){
      cellArr[i].xSpeed = 0;
      cellArr[i].ySpeed = 0;
    }

    fill(cellArr[i].h, cellArr[i].s, cellArr[i].l)
    noStroke()
    ellipse(cellArr[i].x, cellArr[i].y, cellArr[i].size, cellArr[i].size);
  }
}

function generateCells(amount, minSize, maxSize, maxDist) {
  const internalGenArray = []
  for(let i = 0; i < amount; i++) {

    const x = width / 2; 
    const y = height / 2; 

    const xSpeed = random(-5, 5);
    const ySpeed = random(-5, 5);

    const traveledDist = 0;
    const size = random(minSize, maxSize);

    const h = 40;
    const s = random(30, 90);
    const l = 40;

    internalGenArray.push(new Cell(x, y, size, xSpeed, ySpeed, traveledDist, maxDist, h, s, l))
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

