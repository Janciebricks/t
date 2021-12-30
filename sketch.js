// By Roni Kaufman

let kMax;
let step;
let n = 1; // number of blobs
let radius = 1; // diameter of the circle
let inter = 1; // difference between the sizes of two blobs
let maxNoise = 600;
let lapse = 0;    // mouse timer
let noiseProg = (x) => (x);

function setup() {
  createCanvas(windowWidth, windowHeight);
  //colorMode(HSB, 1);
  angleMode(DEGREES);
  noFill();
	kMax = random(0.6, 1.0);
	step = 0.01;
	noStroke();
	drawingContext.shadowBlur = 200;
}

function draw() {
	blendMode(BLEND);
  background(0);
	blendMode(ADD);
  let t = frameCount / 200;
  for (let i = n; i > 0; i--) {
		let size = radius + i * inter;
		let k = kMax * sqrt(i/n);
		let noisiness = maxNoise * noiseProg(i / n);
		
		fill(255, 0, 0, 255);
  	drawingContext.shadowColor = color(255, 255, 0, 255);
    blob(size, width/2, height/2, k, t - i * step, noisiness);
		
		fill(0, 255, 0, 255);
		drawingContext.shadowColor = color(0, 255, 255, 255);
    blob(size, width/2, height/2, k, t - i * step + 2, noisiness);
		
		fill(0, 0, 255, 255);
		drawingContext.shadowColor = color(255, 0, 255, 255);
    blob(size, width/2, height/2, k, t - i * step + 4, noisiness);
  }
}

function blob(size, xCenter, yCenter, k, t, noisiness) {
  beginShape();
	let angleStep = 360 / 8;
  for (let theta = 0; theta <= 360 + 2 * angleStep; theta += angleStep) {
    let r1, r2;
		/*
    if (theta < PI / 2) {
      r1 = cos(theta);
      r2 = 1;
    } else if (theta < PI) {
      r1 = 0;
      r2 = sin(theta);
    } else if (theta < 3 * PI / 2) {
      r1 = sin(theta);
      r2 = 0;
    } else {
      r1 = 1;
      r2 = cos(theta);
    }
		*/
		r1 = cos(theta)+1;
		r2 = sin(theta)+1;
    let r = size + noise(k * r1,  k * r2, t) * noisiness;
    let x = xCenter + r * cos(theta);
    let y = yCenter + r * sin(theta);
    curveVertex(x, y);
  }
  endShape();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
