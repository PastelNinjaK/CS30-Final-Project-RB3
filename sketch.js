let car;
let road;
let scoreboard;
let laneCodes = {
  "lane 1":-2.75,
  "lane 2":-2.275,
  "lane 3":-1.75,
  "lane 4":-1.25,
  "lane 5":-0.75
  };
  let laneNames = Object.keys(laneCodes);
  let scenenum = 0;
  let godMode = 0;
  let title_pic;
  let playerCars = []
  let traffic = []
  
  
  
  function preload(){
    title_pic = loadImage("images/title_image.png") 
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  let roadX = windowWidth/2;
  let roadWidth = windowWidth * 0.9;
  let proportionalWidth = windowWidth*0.05;
  let proportionalLength = windowWidth * 0.1
  road = new Road(roadX,roadWidth);
  car = new Car(road.getLaneCenter(laneCodes["lane 3"]), 0, proportionalWidth, proportionalLength,false,10);
  scoreboard = new Scoreboard(windowWidth * 0.8,windowHeight * 0.3 ,windowWidth * 0.4,windowHeight * 0.1)
  
  
  
  let random_lane_int = floor(random(0,laneNames.length))
  traffic = [new Car(road.getLaneCenter(laneCodes[laneNames[random_lane_int]]), -car.y-car.height * 2, proportionalWidth, proportionalLength)]
  print(random_lane_int)
  // traffic = [new Car(road.getLaneCenter(laneCodes["lane 3"]), -car.y-car.height * 2, proportionalWidth, proportionalLength)]
  playerCars = [car]
  // for(let i = 0; i < traffic.length; i++){
  //   allCars.push(traffic[i])
  // 



}// end of setup



function draw() {
  background(220);
  if(scenenum == 0){
    scene1();
  }// end of if

  if(scenenum == 1){
    scene3();
  }// end of if
  if(scenenum == 2){
    endScreen();
  }// end of if
}// end of draw



function keyPressed(){
  for(let i = 0; i < playerCars.length; i++){
    playerCars[i].controls.handleKeyPress(key, true);
  }

}// end of keyPressed

function keyReleased(){
  for(let i = 0; i < playerCars.length; i++){
    playerCars[i].controls.handleKeyPress(key, false);
  }
}// end of keyReleased








