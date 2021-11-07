// Copy of "Listing i.1" in Matt Pearson's 
// "Generative Art: A opractical Guide using Processing" (2011: xxiii)
// Translated from processing into p5 and changed colors

function setup() {
  createCanvas(windowWidth, windowHeight);
  //createCanvas(2000, 2000);
  limit = 200
  background(44, 45, 119);
  stroke(0, 50);
  colorMode('RGBA')
  fill(0, 173, 139, 200);
  let xstart = random(10);
  let ynoise = random(10);
  translate(width / 2, height / 2, 0);
  for(let y = -(height / 8); y <= (height / 8); y += 3) {
    ynoise += 0.02;
    let xnoise = xstart;
    
    // Using height instead of width here does prevent stretching of the shape
    // when using windowWidth and Height to create the canvas in lines 6 & 7.
    // Original listing used the commented out lines 22 and 7.

    // for (let x = -(width / 8); x <= (width / 8); x += 3) {
    for (let x = -(height / 8); x <= (height / 8); x += 3) { 
      xnoise += 0.02;
      drawPoint(x, y, noise(xnoise, ynoise));
    }
  }
}

function draw() {}

function drawPoint(x, y, noiseFactor) {
  push();
  translate(x * noiseFactor * 4, y * noiseFactor * 4, -y);
  let edgeSize = noiseFactor * 10;
  ellipse(0, 0, edgeSize, edgeSize);
  pop();
}

