let car;
let road;
let rawY;
let scoreboard;
let laneCodes = {
  "lane 1":-2.75,
  "lane 2":-2.275,
  "lane 3":-1.75,
  "lane 4":-1.25,
  "lane 5":-0.75
  };


let scenenum = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  let roadX = windowWidth/2;
  let roadWidth = windowWidth * 0.9;
  let proportionalWidth = windowWidth*0.05;
  let proportionalLength = windowWidth * 0.1
  road = new Road(roadX,roadWidth);
  car = new Car(road.getLaneCenter(laneCodes["lane 4"]), 0, proportionalWidth, proportionalLength);
  rawY = car.y
  // scoreboard = new Scoreboard(windowWidth -(windowWidth * 0.2),windowHeight - (windowWidth * 0.8),100,-rawY)
  scoreboard = new Scoreboard(windowWidth-(windowWidth * 0.2),windowHeight - (windowHeight * 0.7),100)



}// end of setup

function draw() {
  background(220);
  // if(scenenum == 0){
  //   scene1();

  // }
  // print(car.y)
  scene3();
}// end of draw

function sceneTest(){
  let score;
  road.draw(-car.y);
  if(-car.y < 0){
    score = 0
  }else{
    score = floor(scoreCalc(-car.y,0.02))
  }
  // print(score)
  push();

  scoreboard.draw(score);
  // text(score)
  translate(0,-car.y + windowHeight * 0.7);
  car.update(road.borders);
  car.draw();
  pop()
}// end of sceneTest

function keyPressed(){
  car.controls.handleKeyPress(key, true);
}// end of keyPressed

function keyReleased(){
  car.controls.handleKeyPress(key, false);
}// end of keyReleased


function scene1(){
  background(255,255,0)
  fill(0)
  rect(100,100,100)
}


function scene3(){
  // let score = scoreCalc(-car.y)
  // scoreboard(windowWidth - (windowHeight * 0.2),windowHeight - (windowWidth * 0.8),100,score);
  sceneTest();
}

// function scoreCalc(x, factor){
//     if(x < 0){
//         return 0
//     }else{
//         return x * factor
//     }

// }// end of scoreCalc

