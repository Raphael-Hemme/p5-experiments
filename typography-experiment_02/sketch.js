const chars = {
  a: {},
  b: {},
  c: {},
  d: {},
  e: {},
  f: {},
  g: {},
  h: {},
  i: {},
  j: {},
  k: {},
  l: {},
  m: {},
  n: {},
  o: {},
  p: {},
  q: {},
  r: {},
  s: {},
  t: {},
  u: {},
  v: {},
  w: {},
  x: {},
  y: {},
  z: {},
  space: 'space',
  return: 'return'
}

let ioStringArr = [];

let yOffset = 100;
let counter = 0;

class DotTriplet {
  constructor(x1, y1) {
    this.firstDot.x = x1;
    this.firstDot.y = y1;
    this.secondDot.x = x1 + 10;
    this.secondDot.y = y1;
    this.thirdDot.x = x1;
    this.thirdDot.y = y1 + 10;
  }
  firstDot = {
    x: 0,
    y: 0
  };
  secondDot = {
    x: 0,
    y: 0
  };
  thirdDot = {
    x: 0,
    y: 0
  };
}

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

function generateHorizontalBarArr(n) {
  const result = [];
  for(let i = 0; i < n; i++) {
    const currX = int(random(0, 80));
    result.push({
      x: currX,
      y: int(random(0, 90)),
      w: int(random(10, 100 - currX)),
      h: 5
    });
  };
  return result;
}

function generateVerticalBarArr(n) {
  const result = [];
  for(let i = 0; i < n; i++) {
    const currY = int(random(0, 80));
    result.push({
      x: int(random(0, 90)),
      y: currY,
      w: 5,
      h: int(random(10, 100 - currY))
    });
  };
  return result;
}

function generateLetter() {
  // Old shape-data generation:
  /*   const pointCount = random(5, 10)
  const points = [];
  for (let i = 0; i < pointCount; i++) {
    points.push({
      x: random(5, 95),
      y: random(5, 95)
    })
  }
  return points; */

  // New shape-data generation:
  const horizontalBarCount = random(0, 5);
  const dotTriplet = new DotTriplet(int(random(10, 91)), int(random(10, 91)));
  const verticalBarCount = random(0, 5);
  return {
    horizontalBarArr: generateHorizontalBarArr(horizontalBarCount),
    verticalBarArr: generateVerticalBarArr(verticalBarCount),
    dotTriplet: dotTriplet
  }
}

function generateAlphabet() {
  for (let char in chars) {
    if (char === 'space' ||  char === 'return') {
      //chars[char] = char;
      continue;
    };
    const currLetter = generateLetter()
    chars[char] = currLetter;
  }
}

function drawChar(charPointArr) {
  // old drawing function:
  /* beginShape();
    for (let point of charPointArr) {
      vertex(point.x, point.y);
    } 
    vertex(charPointArr[0].x, charPointArr[0].y)
  endShape(); */

  // new drawing function: charPointArr is not renamed to be less confusing if old function
  // is restored. It is an object however.
  for (let hbar of charPointArr.horizontalBarArr) {
    rect(hbar.x, hbar.y, hbar.w, hbar.h);
  }
  for (let vbar of charPointArr.verticalBarArr) {
    rect(vbar.x, vbar.y, vbar.w, vbar.h);
  }
  for (let dot in charPointArr.dotTriplet) {
    // console.log(dot)
    // circle(charPointArr[dot].x, charPointArr[dot].y, charPointArr[dot].w, charPointArr[dot].h)
  }
  circle(
    charPointArr.dotTriplet.firstDot.x,
    charPointArr.dotTriplet.firstDot.y,
    5
  );
  circle(
    charPointArr.dotTriplet.secondDot.x,
    charPointArr.dotTriplet.secondDot.y,
    5
  )
  circle(
    charPointArr.dotTriplet.thirdDot.x,
    charPointArr.dotTriplet.thirdDot.y,
    5
  )

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
    currKey.toLowerCase(); // ToDo: not working
    ioStringArr.push(currKey)
  }
};

function keyPressed() {
  if (keyCode === BACKSPACE) {
    ioStringArr.pop()
    background(50);
  };
};
