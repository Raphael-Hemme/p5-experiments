const chars = {
  a: [],
  b: [],
  c: [],
  d: [],
  e: [],
  f: [],
  g: [],
  h: [],
  i: [],
  j: [],
  k: [],
  l: [],
  m: [],
  n: [],
  o: [],
  p: [],
  q: [],
  r: [],
  s: [],
  t: [],
  u: [],
  v: [],
  w: [],
  x: [],
  y: [],
  z: [],
  space: 'space',
  return: 'return'
}

let ioStringArr = [];

let yOffset = 100;
let counter = 0;

function setup() {
  generateAlphabet();
  createCanvas(windowWidth, windowHeight);
  background(50);
  frameRate(60);

  fill(237, 34, 93);
  noStroke();
}

function draw() {
    push();
      translate(100, yOffset)
    pop();
  drawString(ioStringArr);
}

function generateLetter() {
  const pointCount = random(5, 10)
  const points = [];
  for (let i = 0; i < pointCount; i++) {
    points.push({
      x: random(5, 95),
      y: random(5, 95)
    })
  }
  return points;
}

function generateAlphabet() {
  for (let char in chars) {
    if (char === 'space' ||  char === 'return') {
      //chars[char] = char;
      continue;
    };
    const currLetter = generateLetter()
    chars[char].push(...currLetter)
  }
}

function drawChar(charPointArr) {
  beginShape();
    for (let point of charPointArr) {
      vertex(point.x, point.y);
    } 
    vertex(charPointArr[0].x, charPointArr[0].y)
  endShape();
};

function drawString(stringArr) {
  for (let char of stringArr) {
    if (char === 'space') {
      translate(100, 0);
    } else if (char === 'return') {
      const lengthWithoutReturn = ioStringArr.length -1
      translate(-(lengthWithoutReturn * 100), 150);
      // translate(-100 * (ioString.length -1), 0);
    } else {
      // Why does carriage return work once and the first letter 
      // is correctly placed but after that the translate(100, 0) stops wokring?
      translate(100, 0); 
      drawChar(chars[char]);
    }
  }
};

function keyTyped() {
  if (key === ' ') {
    ioStringArr.push('space')
  } else if (key === 'Enter') {
    ioStringArr.push('return')
  } else {
    const currKey = key;
    currKey.toLowerCase();
    ioStringArr.push(currKey)
  }
};

function keyPressed() {
  if (keyCode === BACKSPACE) {
    ioStringArr.pop()
    background(50);
  };
};
