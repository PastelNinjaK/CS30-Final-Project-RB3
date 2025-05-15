

let car;
function setup() {
  createCanvas(windowWidth, windowHeight);
  car = new Car(100,100,100,150)
  let roadX = windowWidth/2
  let roadWidth = windowWidth * 0.9
  road = new Road(roadX,roadWidth)
}

function draw() {
  background(220);
  road.draw()
  car.update()
  car.draw()
}

function sceneTest(){

}

function keyPressed(){
  car.controls.handleKeyPress(key, true);
}

function keyReleased(){
  car.controls.handleKeyPress(key, false);
}