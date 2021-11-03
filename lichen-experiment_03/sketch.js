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


function setup() {
  createCanvas(windowWidth, windowHeight);

  generateCells(3, 30);
}

function draw() {
  background(0, 50);
  
  moveCells(300)
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

function generateCells(minSize, maxSize) {
  for(let i = 0; i < ballCount; i++) {

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
}