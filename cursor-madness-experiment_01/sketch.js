let cursorArr = [];

let currMultiplyerXArr = [];
let currMultiplyerYArr = [];

function preload() {
  curs = loadImage('./cursor_img_2.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  cursorArr = makeDots(70, height / 2);
  for (let el of cursorArr) {
    currMultiplyerXArr.push(1)
    currMultiplyerYArr.push(1)
  }
}

function draw() {
  background(100);
  colorMode('RGBA')

  for (var i = 0; i < cursorArr.length; i++){
    fill(163, 118, 21);
    noStroke();
    image(curs, cursorArr[i].x, cursorArr[i].y, 34, 35);
    moveCursor(i)
  }
}

function makeDots(n, maxRadius){
  const internalDotArr = []

  for (var i = 0; i < n; i++){ 
    x = random(10, width -10);
    y = random(10, height -10);
    var newDot = {x: x, y: y};
    internalDotArr.push(newDot);
  }
  return internalDotArr;
}

function moveCursor(currCursorIndex) {
  if (cursorArr[currCursorIndex].x > width) {
    cursorArr[currCursorIndex].x = 0;
  }
  if (cursorArr[currCursorIndex].x < 0) {
    cursorArr[currCursorIndex].x = width;
  }
  if (cursorArr[currCursorIndex].y > height) {
    cursorArr[currCursorIndex].y = 0;
  }
  if (cursorArr[currCursorIndex].y < 0) {
    cursorArr[currCursorIndex].y = height;
  }
  if (frameCount % 60 === 0) {
    currMultiplyerXArr[currCursorIndex] = random(1) > 0.5 ? 1 : -1;
    currMultiplyerYArr[currCursorIndex] = random(1) > 0.5 ? 1 : -1;
  }
  
  const currRandDeviation = random(-5, 5);

  let movementX = abs(winMouseX - pwinMouseX);
  let movementY = abs(winMouseY - pwinMouseY);

  // Completely crazy mode
  if (random(1) > 0.7) {
    const intermediary = [movementX, movementY];
    movementX = intermediary[1];
    movementY = intermediary[0];
  }
  // end

  if (movementX !== 0) {
    const speedX = movementX * currMultiplyerXArr[currCursorIndex] + currRandDeviation;
    cursorArr[currCursorIndex].x = cursorArr[currCursorIndex].x + speedX;
  }
  if (movementY !== 0) {
    const speedY = movementY * currMultiplyerYArr[currCursorIndex] + currRandDeviation;
    cursorArr[currCursorIndex].y = cursorArr[currCursorIndex].y + speedY;
  }
}