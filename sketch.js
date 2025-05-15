

let car;
let road;
let laneCodes = {
  "lane 1":-2.75,
  "lane 2":-2.275,
  "lane 3":-1.75,
  "lane 4":-1.25,
  "lane 5":-0.75
  }
function setup() {
  createCanvas(windowWidth, windowHeight);
  let roadX = windowWidth/2
  let roadWidth = windowWidth * 0.9
  road = new Road(roadX,roadWidth)
  car = new Car(road.getLaneCenter(laneCodes["lane 3"]),400,75,150)

}

function draw() {
  background(220);
  sceneTest()
}

function sceneTest(){
  road.draw()
  car.update()
  car.draw()
}

function keyPressed(){
  car.controls.handleKeyPress(key, true);
}

function keyReleased(){
  car.controls.handleKeyPress(key, false);
}