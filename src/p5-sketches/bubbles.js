class Bubble {
  constructor(x, y, size) {
    // This code runs once when an instance is created.
    this.x = x;
    this.y = y;
    this.size = size;
    
    this.sinOffset = random(-100, 100);
  }

  show() {
    circle(this.x, this.y, this.size);
  }
  
  move() {
    this.x += sin((this.sinOffset + frameCount) * 0.1);
    this.y -= 1;
  }
  
}


let bubbles = [];
let c1, c2;
let firstClick;
var w = window.innerWidth;
var h = window.innerHeight;  

function setup() {
  canvas=createCanvas(w, h);
  frameRate(30);
  textAlign(CENTER);
  textSize(18);
  firstClick = false;
  
  // set colors for gradient
  c1 = color(240,230,250);
  c2 = color(63, 191, 191);

  // draw gradient background
  for(let y=0; y<height; y++){
    n = map(y,0,height,0,1);
    let newc = lerpColor(c1,c2,n);
    stroke(newc);
    line(0,y,width, y);
  }
  
}

function draw() {

  // keep drawing gradient background
  for(let y=0; y<height; y++){
    n = map(y,0,height,0,1);
    let newc = lerpColor(c1,c2,n);
    stroke(newc);
    line(0,y,width, y);
  }
  
  // draw text before first click
  if(firstClick == false){
    strokeWeight(0);
    fill(255);
    text('click to make bubbles', width/2, height/2);
  }
  
  // define bubble colors
  strokeWeight(2);
  stroke(255);
  fill(255,255,255,50);
  
  let bubblesToPop = [];
  
  // iterate through all bubbles
  for(var i = 0; i < bubbles.length; i++) {
    bubbles[i].show();
    bubbles[i].move();
    
    // check if bubble goes above edge of screen
    if (bubbles[i].y < (0-(bubbles[i].size/2))) {
      bubblesToPop.push(i);
    }
  }
  
  // remove out of bounds bubbles
  for (var j = 0; j < bubblesToPop.length; j++) {
    bubbles.splice(bubblesToPop[j], 1);
  }
  
}

function mousePressed() {
  let newBubble = new Bubble(mouseX, mouseY, random(10,100));
  bubbles.push(newBubble);
  firstClick = true;
}
