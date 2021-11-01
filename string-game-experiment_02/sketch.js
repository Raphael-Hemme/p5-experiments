// Based on this sketch to generate randomly distributed dots inside a circle: 
// https://editor.p5js.org/zapra/sketches/rjIJR18fT

// Neon Edition Color Set

dots = [];
maxR = 200;

function setup() {
  createCanvas(windowWidth, windowHeight);
  makeDots(25);
  background(40, 40, 40);
  frameRate(30);
  stroke(5);
  for (let dot of dots) {
    point(dot.x, dot.y);
  }
}

function draw() {
  background('rgba(40, 40, 40, 0.25)');

  for (var i = 0; i < dots.length; i++){
    const connectionsForPointArr = [];
    const amountOfConnectionsForPoint = Math.floor(random(1, dots.length / 10));
    
    const pointPositionShiftObj = getPointPositionShiftObj(dots[i])
    dots[i].x += pointPositionShiftObj.xShift;
    dots[i].y += pointPositionShiftObj.yShift;

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

function getPointPositionShiftObj (currDot) {
  const pointCanMovePlusX = currDot.x < width - 10; 
  const pointCanMovePlusY = currDot.y < height - 10; 
  const pointCanMoveMinusX = currDot.y > 10; 
  const pointCanMoveMinusY = currDot.y > 10; 
  const shouldAddX = Math.random() > 0.5
  const shouldAddY = Math.random() > 0.5

  const pointPositionShift = {
    xShift: 0,
    yShift: 0
  }

  if (shouldAddX) {
    pointCanMovePlusX ? pointPositionShift.xShift = random(0, 10) : pointPositionShift.xShift = 0;
  } else {
    pointCanMoveMinusX ? pointPositionShift.xShift = random(0, 10) * -1 : pointPositionShift.xShift = 0;
  }

  if (shouldAddY) {
    pointCanMovePlusY ? pointPositionShift.yShift = random(0, 10) : pointPositionShift.yShift = 0;
  } else {
    pointCanMoveMinusY ? pointPositionShift.yShift = random(0, 10) * -1 : pointPositionShift.yShift = 0;
  }

  return pointPositionShift;
}