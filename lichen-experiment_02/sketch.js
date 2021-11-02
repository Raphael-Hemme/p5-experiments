// Based on this this sketch to generate randomly distributed dots inside a circle: 
// https://editor.p5js.org/zapra/sketches/rjIJR18fT

// This sketch (my improvisation on the linked sketch above) is still in the early stages of playful experimentation.
// Therefore my current version is highly inefficient and duplicates code etc. withouth geting the result nearly right.
// This might be addressed later.

let dots = [];

let inc = 0.01;
let start = 0;

function setup() {
  createCanvas(600, 600);
  for (let i = 0; i < 15; i ++) {
    if (i < 3) {
      let currN = Math.floor(random(30, 50));
      let currMinR = Math.floor(random(0, 30));
      let currMaxR = Math.floor(random(30, 60));
      dots.push(makeDots(currN, currMinR, currMaxR));
    } else {
      dots.push(makeDots(i * 10, i * 10, i * 20 ));
    }
    
    dots[dots.length - 1].forEach(el => el.hslColor = [44, 77, (30 + i)]);
    dots[dots.length - 1].forEach(el => el.size = Math.round(random(i | 3 * 1, i | 3 * 2)));
  }
  frameRate(1);
  colorMode(HSL);
}

function draw() {
  background(100);

  for (let i = 0; i < dots.length; i++){
    for (let j = 0; j < dots[i].length; j++) {
      const l =  
      fill(...dots[i][0].hslColor);
      // stroke(110, 86, 36)
      noStroke()
      // strokeWeight(1);
      circle(dots[i][j].x, dots[i][j].y, dots[i][j].size);
    }
  }
  
  strokeWeight(1);
  noFill();
}

function makeDots(n, minRadius, maxRadius){
  const internalDotArr = []
  for (let i = 0; i < n; i++){
    // choose random radius and angle from the center
    const a = Math.round(random(0, 365));
    const r = Math.round(random(minRadius, maxRadius));
    
    const x = Math.round(width / 2 + r * cos(a));
    const y = Math.round(height / 2 + r * sin(a));
    internalDotArr.push({x, y});
  }
  return internalDotArr;
}

// Copied from Daniel Shiffmans Intro to perlin noise in p5.js:
// https://www.youtube.com/watch?v=y7sgcFhk6ZM
function drawMovingNoiseCurve() {
  stroke(255);
  noFill();
  beginShape();
  let xOff = start;
  for (let x = 0; x < width; x++) {
    stroke(255);
    const y = noise(xOff) * height;
    vertex(x, y)

    xOff += inc;
  }
  endShape();
  start += inc
}