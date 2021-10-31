// Based on this sketch to generate randomly distributed dots inside a circle: 
// https://editor.p5js.org/zapra/sketches/rjIJR18fT

// Neon Edition Color Set

dots = [];
maxR = 200;

function setup() {
  createCanvas(windowWidth, windowHeight);
  makeDots(25);
}

function draw() {
  background(20);
  for (var i = 0; i < dots.length - 2; i++){
    strokeWeight(5);
    point(dots[i].x, dots[i].y);
    
    strokeWeight(1);
    stroke(224, 0, 52)
    line(dots[i].x, dots[i].y, dots[i + 1].x, dots[i + 1].y);
    stroke(0, 81, 222)
    line(dots[i].x, dots[i].y, dots[i + 2].x, dots[i + 2].y);
  }
  line(dots[0].x, dots[0].y, dots[dots.length - 1].x, dots[dots.length - 1].y);
  strokeWeight(1);
  noFill();
}

function makeDots(n){
  for (var i = 0; i < n; i++){
    const a = random(0, 2*PI);
    const r = 20 * sqrt(random(0, maxR));
    const x = width / 2 + r * cos(a);
    const y = height / 2 + r * sin(a);
    const newDot = createVector(x, y);
    dots.push(newDot);
  }

}