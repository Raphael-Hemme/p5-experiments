let canvasCenter = {
  x: 0,
  y: 0
}

class Cell {
  constructor(x, y, size, xSpeed, ySpeed, traveledDist, maxDist, hsla, maxAge) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.traveledDist = traveledDist;
    this.maxDist = maxDist;
    this.hsla = hsla;
    this.maxAge = maxAge;
  }
  age = 0;
  blooming = false;
  canBloom = Math.random() > 0.8;
  canReproduce = Math.random() > 0.8;

  incrementAge() {
    this.age++;
  }
  fade() {
    if ((this.maxAge - this.age < 50) && this.hsla.a > 0.05) {
      this.hsla.a -= 0.02;
    }
  }
  bloom() {
    this.blooming = true;
    this.hsla.h = 19;
    this.hsla.s = round(random(40, 70))
  }
}

let cells = [];
let subCells = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  canvasCenter.x = width / 2;
  canvasCenter.y = height /2;
  frameRate(20);
}

function draw() {
  background(60)

  if (frameCount % 30 === 0) {
    console.log('cells length: ', cells.length)
    console.log('subCells length: ', subCells.length)
  }

  const currGenCount = round(random(3, 25))
  const minSize = 2
  const maxSize = 15
  const maxDist = round(random(10, 300))
  const mainCellMaxAge = round(random(300, 500));
  generateCells(currGenCount, minSize, maxSize, canvasCenter, maxDist, cells, mainCellMaxAge);

  drawCells(cells);
  ageCells(cells);
  multiplyCells(cells)
  killCells(cells);
  if (subCells.length > 0) {
    drawCells(subCells);
    ageCells(subCells);
    setRandomCellsToHaveBloomShape(subCells)
    killCells(subCells);
  }
}

function drawCells(targetCellArr) {
  for(let cell of targetCellArr){
    let oldX = cell.x;
    let oldY = cell.y;

    cell.x += cell.xSpeed;
    cell.y += cell.ySpeed;

    cell.traveledDist += dist(oldX, oldY, cell.x, cell.y);
 
    if (cell.traveledDist > cell.maxDist){
      cell.xSpeed = 0;
      cell.ySpeed = 0;
    }

    let c = color(`hsla(${cell.hsla.h}, ${cell.hsla.s}%, ${cell.hsla.l}%, ${cell.hsla.a})`);
    if (!cell.blooming) {
      noStroke();
      fill(c);
    } else {
      noFill()
      strokeWeight(2);
      stroke(c);
    }
    ellipse(cell.x, cell.y, cell.size, cell.size);
  }
}

function generateCells(amount, minSize, maxSize, center, maxDist, targetCellArr, maxAge) {
  for(let i = 0; i < amount; i++) {

    const x = center.x // width / 2; 
    const y = center.y // height / 2; 

    const xSpeed = random(-5, 5);
    const ySpeed = random(-5, 5);

/*     const xSpeed = random(-1, 1);
    const ySpeed = random(-1, 1); */

    const maxTravelDist = round(random(maxDist / 2, maxDist))
    const traveledDist = 0;
    const size = random(minSize, maxSize);

    const hsla = {h: 40, s: random(30, 90), l: 40, a: 1.0};

    targetCellArr.push(new Cell(x, y, size, xSpeed, ySpeed, traveledDist, maxTravelDist, hsla, maxAge))
  }
}

// Not for generating new cells (rename later) just visual
function setRandomCellsToHaveBloomShape(targetCellArr) {
  for (let cell of targetCellArr) {
    if (cell.xSpeed === 0 && cell.canBloom) {
      cell.bloom();
    } 
  }
}

function killCells(targetCellArr) {
  const survivingCellArr = targetCellArr.filter(cell => cell.age < cell.maxAge);
  while (targetCellArr.length > 0) {
    targetCellArr.pop();
  }
  for (let el of survivingCellArr) {
    targetCellArr.push(el);
  }
}

function ageCells(targetCellArr) {
  for (let cell of targetCellArr) {
    cell.incrementAge();
    if (cell.age > cell.maxAge / 2) {
      cell.fade();
    }
  }
}

function multiplyCells(targetCellArr) {
  for (let cell of targetCellArr) {
    if ((cell.xSpeed === 0 && cell.age > 170) && cell.canReproduce && subCells.length < 6000) {
      cell.bloom()
      const currGenCount = round(random(5, 15))
      const currMinSize = 2
      const currMaxSize = 15
      const currMaxDist = round(random(10, 50))
      const currCenter = {
        x: cell.x,
        y: cell.y
      }
      const descendentMaxAge = round(random(100, 200))
      generateCells(currGenCount, currMinSize, currMaxSize, currCenter, currMaxDist, subCells, descendentMaxAge);
    }
  }
  
}


