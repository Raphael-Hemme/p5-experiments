// Based on this sketch to generate randomly distributed dots inside a circle: 
// https://editor.p5js.org/zapra/sketches/rjIJR18fT

// Neon Edition Color Set

dots = [];
maxR = 200;

function setup() {
  createCanvas(windowWidth, windowHeight);
  makeDots(25);
  frameRate(5);

}

function draw() {
  background(30, 30, 30);
  for (var i = 0; i < dots.length - 2; i++){
    const connectionsForPointArr = [];
    const amountOfConnectionsForPoint = Math.floor(random(1, dots.length / 8));
    for (let j = 0; j <= amountOfConnectionsForPoint; j++) {
      connectionsForPointArr.push(dots[Math.floor(random(0, dots.length))])
    }

    strokeWeight(1);
    for (let j = 0; j < connectionsForPointArr.length; j++) {
      strokeWeight(1);
      j % 2 === 0 ? stroke(224, 0, 52) : stroke(0, 81, 222);
      line(dots[i].x, dots[i].y, connectionsForPointArr[j].x, connectionsForPointArr[j].y);
      point(dots[i].x, dots[i].y);
      strokeWeight(5);
    }

    strokeWeight(5);
    point(dots[i].x, dots[i].y);
  }
}

function makeDots(n){
  for (var i = 0; i < n; i++){
    const a = random(0, 2*PI);
    const r = 20 * sqrt(random(0, maxR));
    const x = Math.floor(width / 2 + r * cos(a));
    const y = Math.floor(height / 2 + r * sin(a));
    const newDot = {x, y};
    dots.push(newDot);
  }

}