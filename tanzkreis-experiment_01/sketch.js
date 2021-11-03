// This sketch is a adaptation of CodeCademy's Bouncing Balls exercise which transforms the area
// the balls bounce in into a circle. There is a slight variation build in that leads to a 
// morphing of the initialy circular containment.

// ToDo: Fix Bug that makes balls bounce off the center after the first or second trip.

const ballCount = 100;
let x = [];
let y = [];
let size = [];
let xSpeed = [];
let ySpeed = [];
let traveledDist = [];
let firstTrip = [];
let r = [];
let g = [];
let b = [];


function setup() {
  createCanvas(windowWidth, windowHeight);

  for(let i = 0; i < ballCount; i++) {

    x[i] = width / 2; 
    y[i] = height / 2; 

    xSpeed[i] = random(-5, 5);
    ySpeed[i] = random(-5, 5);

    traveledDist[i] = 0;
    firstTrip[i] = true;

    size[i] = random(10, 50);

    r[i] = random(0, 256);
    g[i] = random(0, 256);
    b[i] = random(0, 256);
  }
}

function draw() {
  background(0, 50);
  
  for(let i = 0; i < ballCount; i++){
    let oldX = x[i];
    let oldY = y[i];

    x[i] += xSpeed[i];
    y[i] += ySpeed[i];

    traveledDist[i] += dist(oldX, oldY, x[i], y[i]);
 
    if (firstTrip[i] && traveledDist[i] > 300){
      console.log('test 1');
      xSpeed[i] *= -1;
      ySpeed[i] *= -1;
      traveledDist[i] = -300
      firstTrip[i] = false;
    } else if (firstTrip[i] && traveledDist[i] < -300) {
      // else if never runs. Check logic.
      console.log('test 2');
      xSpeed[i] *= -1;
      ySpeed[i] *= -1;
      traveledDist[i] = 300
      firstTrip[i] = false;
    }

    if ((!firstTrip[i] && traveledDist[i] > 300) || (!firstTrip[i] && traveledDist[i] < -300)){
      console.log('test 3')
      const chanceSlightChangeX = Math.random() > 0.5 ? (Math.round(Math.random() * 10)) : (Math.round(Math.random() * 10) * -1);
      const chanceSlightChangeY = Math.random() > 0.5 ? (Math.round(Math.random() * 10)) : (Math.round(Math.random() * 10) * -1);

      xSpeed[i] *= -1;
      ySpeed[i] *= -1;
      x[i] += chanceSlightChangeX
      y[i] += chanceSlightChangeY

      traveledDist[i] = 0
    }

    fill(r[i], g[i], b[i])
    noStroke()
    ellipse(x[i], y[i], size[i], size[i]);
  }

} 