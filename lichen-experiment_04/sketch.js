let canvasCenter = {
  x: 0,
  y: 0
}

maxAge = 300

class Cell {
  constructor(x, y, size, xSpeed, ySpeed, traveledDist, maxDist, hsl) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.traveledDist = traveledDist;
    this.maxDist = maxDist;
    this.hsl = hsl
  }
  age = 0;
  incrementAge () {
    this.age++;
  }
}

let cells = [];
let subCells = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  canvasCenter.x = width / 2;
  canvasCenter.y = height /2;
  frameRate(30);
}

function draw() {
  background(60)

  if (frameCount % 30 === 0) {
    console.log('cells length: ', cells.length)
    console.log('subCells length: ', subCells.length)
  }

  let currGenCount = round(random(2, 10))
  let minSize = round(random(2, 5))
  let maxSize = round(random(6, 15))
  let maxDist = round(random(10, 300))
  generateCells(currGenCount, minSize, maxSize, canvasCenter, maxDist, cells);

  moveCells(cells);
  ageCells(cells);
  multiplyCells(cells)
  killCells(cells);
  if (subCells.length > 0) {
    moveCells(subCells);
    ageCells(subCells);
    killCells(subCells);
  }
}

function moveCells(targetCellArr) {
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

    let c = color(`hsl(${cell.hsl.h}, ${cell.hsl.s}%, ${cell.hsl.l}%)`);
    fill(c)
    noStroke()
    ellipse(cell.x, cell.y, cell.size, cell.size);
  }
}

function generateCells(amount, minSize, maxSize, center, maxDist, targetCellArr) {
  for(let i = 0; i < amount; i++) {

    const x = center.x // width / 2; 
    const y = center.y // height / 2; 

    const xSpeed = random(-5, 5);
    const ySpeed = random(-5, 5);

    const traveledDist = 0;
    const size = random(minSize, maxSize);

    const hsl = {h: 40, s: random(30, 90), l: 40};

    targetCellArr.push(new Cell(x, y, size, xSpeed, ySpeed, traveledDist, maxDist, hsl))
  }
}

function killCells(targetCellArr) {
  const survivingCellArr = targetCellArr.filter(cell => cell.age <= maxAge);
  targetCellArr = survivingCellArr;
}

function ageCells(targetCellArr) {
  for (let cell of targetCellArr) {
    cell.incrementAge();
  }
}

function multiplyCells(targetCellArr) {
  for (let cell of targetCellArr) {
    const hasChildren = random(1) > 0.8;
  if (cell.age === 200 && hasChildren) {
    const currGenCount = round(random(5, 20))
    const currMinSize = round(random(1, 5))
    const currMaxSize = round(random(6, 9))
    const currMaxDist = round(random(10, 40))
    const currCenter = {
      x: cell.x,
      y: cell.y
    }
    generateCells(currGenCount, currMinSize, currMaxSize, currCenter, currMaxDist, subCells);
  }
  }
  
}


