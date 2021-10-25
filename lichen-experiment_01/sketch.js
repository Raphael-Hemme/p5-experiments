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


function setup() {
  createCanvas(600, 600);
  dots = makeDots(200, 100);
  for (let el of dots) {
    const intSubDotArr = makeSubDots(el.x, el.y, 20, 20)
    dots2.push(...intSubDotArr);
  }
  for (let el of dots2) {
    const intSubDotArr = makeSubDots(el.x, el.y, 5, 10)
    dots3.push(...intSubDotArr);
  } 
  
  dots4 = makeDots(400, 30);
  for (let el of dots4) {
    const intSubDotArr = makeSubDots(el.x, el.y, 10, 10)
    dots5.push(...intSubDotArr);
  }

  dots6 = makeDots(200, 70);
  for (let el of dots6) {
    const intSubDotArr = makeSubDots(el.x, el.y, 30, 15)
    dots7.push(...intSubDotArr);
  }
}

function draw() {
  background(100);

  for (var i = 0; i < dots2.length; i++){
    // strokeWeight(6);
    // stroke(163, 118, 21)
    fill(163, 118, 21);
    noStroke();
    circle(dots2[i].x, dots2[i].y, 6);
  }
  for (var i = 0; i < dots.length; i++){
    // strokeWeight(9);
    // stroke(135, 87, 14)
    // noStroke();
    fill(135, 87, 14);
    stroke(110, 86, 36)
    strokeWeight(1);
    circle(dots[i].x, dots[i].y, 9);
  }
  for (var i = 0; i < dots3.length; i++){
/*     strokeWeight(5);
    stroke(196, 152, 39)
    point(dots3[i].x, dots3[i].y); */
    strokeWeight(1);
    fill(196, 152, 39)
    stroke(133, 91, 19)
    // noStroke();
    circle(dots3[i].x, dots3[i].y, 8);
  }
  noFill();
  noStroke();

    // draw dots5 and dots4
    for (var i = 0; i < dots5.length; i++){
      // strokeWeight(6);
      // stroke(133, 91, 19)
      fill(133, 91, 19);
      noStroke();
      circle(dots5[i].x, dots5[i].y, 9);
    }
    for (var i = 0; i < dots4.length; i++){
      // strokeWeight(2);
      // stroke(112, 82, 29)
      fill(112, 82, 29);
      noStroke();
      circle(dots4[i].x, dots4[i].y, 2);
    }

  // draw dots6 and dots7
  for (var i = 0; i < dots6.length; i++){
    // strokeWeight(1);
    // stroke(133, 91, 19)
    fill(196, 152, 39);
    noStroke();
    circle(dots6[i].x, dots6[i].y, 8);
  }
  noFill();
  for (var i = 0; i < dots7.length; i++){
    noStroke();
    // stroke(112, 82, 29)
    // strokeWeight(1);
    // stroke(169, 131, 35);
    fill(179, 139, 37)
    circle(dots7[i].x, dots7[i].y, 9);
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