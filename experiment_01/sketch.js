let textArr;
let roboto;
let rotation = 0;

function preload() {
  roboto = loadFont('./assets/roboto-medium.ttf')
}

function setup() {
  createCanvas(400, 400);
  background(63, 37, 66);
  frameRate(10)
  
  textArr = roboto.textToPoints('p5', width / 5,  height /2 + 50, 200, {sampleFactor: 0.08});


}

function draw() {
  background(63, 37, 66, 70);

  textFont(roboto);
  fill(63, 37, 66, 70)
  textSize(200);
  noStroke()
  text('p5', width / 5,  height /2 + 50);

  strokeWeight(3)
  stroke('#ED225D')
  for (let i = 0; i < textArr.length; i++) {
    push();
      translate(textArr[i].x, textArr[i].y)
      rotate(rotation);
      rotation++
      line(3, 3, -3, -3)
    pop();
  }
}