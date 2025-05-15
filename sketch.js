let car;
let road;
let laneCodes = {
  "lane 1":-2.75,
  "lane 2":-2.275,
  "lane 3":-1.75,
  "lane 4":-1.25,
  "lane 5":-0.75
  };



function setup() {
  createCanvas(windowWidth, windowHeight);
  let roadX = windowWidth/2;
  let roadWidth = windowWidth * 0.9;
  let proportionalWidth = windowWidth*0.05;
  let proportionalLength = windowWidth * 0.1
  road = new Road(roadX,roadWidth);
  car = new Car(road.getLaneCenter(laneCodes["lane 4"]), 0, proportionalWidth, proportionalLength);

}// end of setup

function draw() {
  background(220);
  sceneTest();
}// end of draw

function sceneTest(){
  
  // translate(0, car.y + height * 0.7);
  road.draw(-car.y);




  push();

  translate(0,-car.y + windowHeight * 0.7);
  
  car.update();
  car.draw();



  pop()
  
}// end of sceneTest

function keyPressed(){
  car.controls.handleKeyPress(key, true);
}// end of keyPressed

function keyReleased(){
  car.controls.handleKeyPress(key, false);
}// end of keyReleased


// function scene1(){

// }