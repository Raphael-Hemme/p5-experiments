// Based on this this sketch to generate randomly distributed dots inside a circle: 
// https://editor.p5js.org/zapra/sketches/rjIJR18fT

// This sketch (my improvisation on the linked sketch above) is still in the early stages of playful experimentation.
// Therefore my current version is highly inefficient and duplicates code etc. withouth geting the result nearly right.
// This might be addressed later.

let dots = [];
let dots2 = [];
let dots3 = [];

let dots4 = [];
let dots5 = [];

let dots6 = [];
let dots7 = [];

let dots8 = [];

let dots9 = [];


function setup() {
  createCanvas(600, 600);
  dots = makeDots(200, 100);
  for (let el of dots) {
    const intSubDotArr = makeSubDots(el.x, el.y, 10, 20)
    dots2.push(...intSubDotArr);
  }
  for (let el of dots2) {
    const intSubDotArr = makeSubDots(el.x, el.y, 5, 10)
    dots3.push(...intSubDotArr);
  }
  dots3.forEach(el => el.size = random(4, 10)) 
  
  dots4 = makeDots(50, 30);
  dots4.forEach(el => el.size = random(1, 8))
  for (let el of dots4) {
    const intSubDotArr = makeSubDots(el.x, el.y, 30, 10)
    dots5.push(...intSubDotArr);
  }
  dots5.forEach(el => el.size = random(3, 15))

  dots6 = makeDots(300, 70);
  for (let el of dots6) {
    const intSubDotArr = makeSubDots(el.x, el.y, 10, 15)
    dots7.push(...intSubDotArr);
  }
  

  dots8 = makeDots(300, 140);
  dots8.forEach(el => el.size = random(1, 5))

  dots9 = makeDots(200, 10);
  dots9.forEach(el => el.size = random(1, 9))
}

function draw() {
  background(100);
  colorMode('RGBA')

  for (var i = 0; i < dots8.length; i++){
    fill(163, 118, 21);
    noStroke();
    circle(dots8[i].x, dots8[i].y, dots8[i].size);
  }

  for (var i = 0; i < dots2.length; i++){
    fill(163, 118, 21);
    noStroke();
    circle(dots2[i].x, dots2[i].y, 20);
  }
  for (var i = 0; i < dots.length; i++){
    fill(135, 87, 14);
    stroke(110, 86, 36)
    strokeWeight(1);
    circle(dots[i].x, dots[i].y, 9);
  }
  for (var i = 0; i < dots3.length; i++){
    strokeWeight(1);
    fill(196, 152, 39)
    stroke(133, 91, 19)
    circle(dots3[i].x, dots3[i].y, dots3[i].size);
  }

  // draw dots6 and dots7
  for (var i = 0; i < dots6.length; i++){
    fill(189, 145, 32);
    noStroke();
    circle(dots6[i].x, dots6[i].y, 10);
  }
  for (var i = 0; i < dots7.length; i++){
    // noStroke();
    stroke(161, 125, 33, 90)
    fill(179, 139, 37)
    circle(dots7[i].x, dots7[i].y, 9);
  }


  // draw dots5 and dots4
  for (var i = 0; i < dots5.length; i++){
    fill(133, 91, 19);
    noStroke();
    circle(dots5[i].x, dots5[i].y, dots5[i].size);
  }
  for (var i = 0; i < dots4.length; i++){
    fill(174, 134, 36);
    noStroke();
    circle(dots4[i].x, dots4[i].y, dots4[i].size);
  }

  // draw dots9
  for (var i = 0; i < dots9.length; i++){
    fill(107, 76, 33);
    noStroke();
    circle(dots9[i].x, dots9[i].y, dots9[i].size);
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