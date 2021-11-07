let globalMaxDistDecrementor = 300
let canvasCenter = {
  x: 0,
  y: 0
}
let counter;

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

const cells = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  canvasCenter.x = width / 2;
  canvasCenter.y = height /2;
  // colorMode('HSL');

  for (let i = 10; i > 0; i--) {
    const amount = random(i * 10, i * 20);
    const minSize = random(i, i * 2);
    const maxSize = random(i * 2, i * 5);
    cells.push(generateCellGeneration(amount, minSize, maxSize, canvasCenter));
    
  }
  console.log(cells)
}

function draw() {
  console.log(cells.length)
  
  background(60)
  for (let i = 0; i < cells.length; i++) {
    moveCells(cells[i]);
    // cells[i].forEach(cell => cell.incrementAge())
  }

  if (frameCount % 120 === 0) {
    cells.pop();
    counter < 10 ? counter++ : counter = 0
    dynamicMaxDistDecrementor = counter * 30;
    globalMaxDistDecrementor = dynamicMaxDistDecrementor; // Super ugly implementation. Needs attention later.
    const amount = random(50, 100);
    const minSize = random(2, 10);
    const maxSize = random(20, 30);
    cells.push(generateCellGeneration(amount, minSize, maxSize, canvasCenter));
  }

  // cells = cells.filter(gen => gen[0].age < 600)

  /* if(frameCount % 2 === 0) {
    for (let j = 0; j < 2; j++) {
      for (let element of cells[j]) {
        const currCenter = {
          x: element.x,
          y: element.y
        }
        globalMaxDistDecrementor = 50
        cells.push(generateCellGeneration(5, 2, 20, currCenter));
        
      };
      cells.shift();
    }
    console.log(cells.length)
  }   */

}

function generateCellGeneration(amount, minSize, maxSize, center) {
  const pulseGeneration = generateCells(amount, minSize, maxSize, center, globalMaxDistDecrementor);
  globalMaxDistDecrementor -= 30;
  return pulseGeneration
}

function moveCells(cellArr) {
  for(let cell of cellArr){
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

function generateCells(amount, minSize, maxSize, center, maxDist) {
  const internalGenArray = []
  for(let i = 0; i < amount; i++) {

    const x = center.x // width / 2; 
    const y = center.y // height / 2; 

    const xSpeed = random(-5, 5);
    const ySpeed = random(-5, 5);

    const traveledDist = 0;
    const size = random(minSize, maxSize);

    const hsl = {h: 40, s: random(30, 90), l: 40};

    internalGenArray.push(new Cell(x, y, size, xSpeed, ySpeed, traveledDist, maxDist, hsl))
  }
  return internalGenArray;
}


