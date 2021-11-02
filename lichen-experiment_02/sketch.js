// Based on this this sketch to generate randomly distributed dots inside a circle: 
// https://editor.p5js.org/zapra/sketches/rjIJR18fT

// This sketch (my improvisation on the linked sketch above) is still in the early stages of playful experimentation.
// Therefore my current version is highly inefficient and duplicates code etc. withouth geting the result nearly right.
// This might be addressed later.

let dots;

function setup() {
  createCanvas(600, 600);
  dots = makeDots(200, 150, 250);
}

function draw() {
  background(100);
  colorMode('RGBA')

  for (let i = 0; i < dots.length; i++){
    fill(135, 87, 14);
    stroke(110, 86, 36)
    strokeWeight(1);
    circle(dots[i].x, dots[i].y, 9);
  }
  
  strokeWeight(1);
  noFill();
}

function makeDots(n, minRadius, maxRadius){
  const internalDotArr = []
//   choose random radius and angle from the center
  for (let i = 0; i < n; i++){
    const a = random(0, 365);
    // https://programming.guide/random-point-within-circle.html
    // we use square root of random for equal distribution of points from the center
    r = random(minRadius, maxRadius);
    
    const x = width/2 + r * cos(a);
    const y = height / 2 + r * sin(a);
    internalDotArr.push({x, y});
  }
  return internalDotArr;
}