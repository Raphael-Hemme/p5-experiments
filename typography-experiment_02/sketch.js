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
/*     push();
      translate(100, yOffset)
    pop(); */
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
  if (stringArr.includes('return')) {
    const preSubStringArr = stringArr.map(el => {
      // maybe find a better solution for the substitution characters 
      // in order to not block them. Maybe Reg-Ex...
      if (el === 'return') {
        return '~';
      } else if (el === 'space') {
        return '_';
      } else {
        return el;
      }
    })
    const subStringArr = preSubStringArr.join('').split('~');
    for (let i = 0; i < subStringArr.length; i++) {
      const currYOffset = i > 0 ? 150 : 0;
      const currXOffset = i > 0 ? -1 * (subStringArr[i - 1].length * 100) : 0;
      translate(currXOffset, currYOffset);
      for (let char of subStringArr[i]) {
        if (char === '_') {
          translate(100, 0);
        } else {
          translate(100, 0); 
          drawChar(chars[char]);
        }
      }
    }
  } else {
    for (let char of stringArr) {
      if (char === 'space') {
        translate(100, 0);
      } else {
        translate(100, 0); 
        drawChar(chars[char]);
      }
    }
  }
  
};

function keyTyped() {
  if (key === ' ') {
    ioStringArr.push('space')
  } else if (key === 'Enter') {
    ioStringArr.push('return');
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
