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

let ioString = [];

let yOffset = 100;

function setup() {
  generateAlphabet();
  createCanvas(windowWidth, windowHeight);
  background(50);
  translate(0, yOffset)
  frameRate(60);

  fill(237, 34, 93);
  noStroke();
}

function draw() {
  drawString(ioString);
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
  translate(100, 0)
  beginShape();
    for (let point of charPointArr) {
      vertex(point.x, point.y);
    } 
    vertex(charPointArr[0].x, charPointArr[0].y)
  endShape();
};

function drawString(stringArr) {
  // const stringArr = string.toLowerCase().split('');
  for (let char of stringArr) {
    if (char === 'space') {
      translate(100, 0);
    } else if (char === 'return') {
      yOffset += 150
      // translate(-100 * (ioString.length -1), yOffset);
      // translate(-100 * (ioString.length -1), 0);
    } else {
      drawChar(chars[char]);
    }
  }
};

function keyTyped() {
  if (key === ' ') {
    ioString.push('space')
  } else if (key === 'Enter') {
    ioString.push('return')
  } else {
    const currKey = key;
    currKey.toLowerCase();
    ioString.push(currKey)
  }
};

function keyPressed() {
  if (keyCode === BACKSPACE) {
    ioString.pop()
    background(50);
  };
};
