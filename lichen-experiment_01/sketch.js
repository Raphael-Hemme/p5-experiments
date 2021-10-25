// Based on this this sketch to generate randomly distributed dots inside a circle: 
// https://editor.p5js.org/zapra/sketches/rjIJR18fT

// This sketch (my improvisation on the linked sketch above) is still in the early stages of playful experimentation.
// Therefore my current version is highly inefficient and duplicates code etc. withouth geting the result nearly right.
// This might be addressed later.

dots = [];
dots2 = [];
dots3 = [];

dots4 = [];
dots5 = []


function setup() {
  createCanvas(600, 600);
  dots = makeDots(300, 100);
  for (let el of dots) {
    const intSubDotArr = makeSubDots(el.x, el.y, 20, 20)
    dots2.push(...intSubDotArr);
  }
  for (let el of dots2) {
    const intSubDotArr = makeSubDots(el.x, el.y, 30, 10)
    dots3.push(...intSubDotArr);
  } 
  
  dots4 = makeDots(500, 40);
  for (let el of dots4) {
    const intSubDotArr = makeSubDots(el.x, el.y, 30, 10)
    dots5.push(...intSubDotArr);
  }
}

function draw() {
  background(100);
  colorMode('RGBA')
  for (var i = 0; i < dots3.length; i++){
    strokeWeight(2);
    stroke(196, 152, 39, 70)
    point(dots3[i].x, dots3[i].y);
  }
  for (var i = 0; i < dots2.length; i++){
    strokeWeight(4);
    stroke(163, 118, 21, 90)
    point(dots2[i].x, dots2[i].y);
  }
  for (var i = 0; i < dots.length; i++){
    strokeWeight(5);
    stroke(135, 87, 14, 90)
    point(dots[i].x, dots[i].y);
  }
  
  for (var i = 0; i < dots5.length; i++){
    strokeWeight(3);
    stroke(133, 91, 19, 90)
    point(dots5[i].x, dots5[i].y);
  }
  for (var i = 0; i < dots4.length; i++){
    strokeWeight(4);
    stroke(112, 82, 29, 100)
    point(dots4[i].x, dots4[i].y);
  }
  strokeWeight(1);
  noFill();
}

function makeDots(n, maxRadius){
  const internalDotArr = []
//   choose random radius and angle from the center
  for (var i = 0; i < n; i++){
    const a = random(0, 2*PI);
    
    // https://programming.guide/random-point-within-circle.html
    // we use square root of random for equal distribution of points        from the center
    r = 20 * sqrt(random(0, maxRadius));
    
    x = width/2 + r * cos(a);
    y = height / 2 + r * sin(a);
    var newDot = {x: x, y: y};
    internalDotArr.push(newDot);
  }
  return internalDotArr;
}

function makeSubDots(subDotCenterX, subDotCenterY, maxAmount, rRange) {
  //   choose random radius and angle from the center
  const amount = random(0, maxAmount);
  const subDots = [];
  for (var i = 0; i < amount; i++){
    
    const a = random(0, 2*PI);
    const r = random(5, rRange);
        
    x = subDotCenterX + r * cos(a);
    y = subDotCenterY + r * sin(a);
    var newDot = {x: x, y: y};
    subDots.push(newDot);
  }
  return subDots;
}