let angle = 0;              
let angularSpeed = 0.03;    
let orbitRadius = 100;      
let isPaused = false;       
    
const centerX = 250;        
const centerY = 250;        
const waveStartX = 520;     
const maxWavePoints = 260;  

let waveHistory = [];

function setup() {
  createCanvas(800, 500);
  textFont('monospace');
}

function draw() {
  background(20, 24, 40);


  if (!isPaused) {
    angle += angularSpeed;  
  }

  let cosValue = cos(angle);
  let sinValue = sin(angle);
  let dotX = centerX + orbitRadius * cosValue;
  let dotY = centerY + orbitRadius * sinValue;

  if (!isPaused) {
    waveHistory.unshift(orbitRadius * sinValue); 
    if (waveHistory.length > maxWavePoints) {
      waveHistory.pop();
    }
  }

  noFill();
  stroke(90, 100, 140);
  strokeWeight(1);
  circle(centerX, centerY, orbitRadius * 2);              
  line(centerX - 150, centerY, centerX + 150, centerY);  
  line(centerX, centerY - 150, centerX, centerY + 150);  

  stroke(255, 200, 80);
  strokeWeight(2);
  line(centerX, centerY, dotX, dotY);

  stroke(120, 220, 160);
  line(centerX, centerY, dotX, centerY);  
  stroke(240, 120, 160);
  line(dotX, centerY, dotX, dotY);         

  stroke(240, 120, 160);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let i = 0; i < waveHistory.length; i++) {
    vertex(waveStartX + i, centerY + waveHistory[i]);
  }
  endShape();

  stroke(255, 255, 255, 80);
  strokeWeight(1);
  line(dotX, dotY, waveStartX, dotY);

  noStroke();
  fill(255, 200, 80);
  circle(dotX, dotY, 16);

  stroke(90, 100, 140);
  line(waveStartX, centerY, waveStartX + maxWavePoints, centerY);

  noStroke();
  fill(255);
  textSize(13);
  let angleDegrees = degrees(angle) % 360;
  if (angleDegrees < 0) angleDegrees += 360;
  text("angle  = " + angleDegrees.toFixed(1) + " deg (" + (angle % TWO_PI).toFixed(3) + " rad)", 20, 30);
  text("cos    = " + cosValue.toFixed(3), 20, 50);
  text("sin    = " + sinValue.toFixed(3), 20, 70);
  text("x      = " + dotX.toFixed(1) + "   y = " + dotY.toFixed(1), 20, 90);
  text("radius = " + orbitRadius + " px   speed = " + angularSpeed.toFixed(3) + " rad/frame", 20, 110);

  fill(200, 210, 255);
  text("CONTROLS", 20, 420);
  text("SPACE or click : pause / resume" + (isPaused ? "  [PAUSED]" : ""), 20, 440);
  text("UP / DOWN      : change speed", 20, 458);
  text("LEFT / RIGHT   : change radius", 20, 476);
  text("R              : reset to 30 deg and pause", 20, 494 - 0);
}

function keyPressed() {
  if (key === ' ') {
    isPaused = !isPaused;
  }
  if (keyCode === UP_ARROW) {
    angularSpeed = min(angularSpeed + 0.005, 0.2);    
  }
  if (keyCode === DOWN_ARROW) {
    angularSpeed = max(angularSpeed - 0.005, 0.005);  
  }
  if (keyCode === RIGHT_ARROW) {
    orbitRadius = min(orbitRadius + 10, 150);         
  }
  if (keyCode === LEFT_ARROW) {
    orbitRadius = max(orbitRadius - 10, 20);          
  }
  if (key === 'r' || key === 'R') {
    angle = PI / 6;        
    waveHistory = [];
    isPaused = true;
  }
  return false; 
}

function mousePressed() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    isPaused = !isPaused;
  }
}