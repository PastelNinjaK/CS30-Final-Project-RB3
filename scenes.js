function scene1(){
  background(253, 218, 13);
  // line(windowWidth/2,0,windowWidth/2,windowHeight)
  
  // noStroke();
  fill(0);
  textAlign(CENTER)
  textFont("ROBOTO");
  fill(0)
  image(title_pic,windowWidth * 0.2775,-windowHeight * 0.1,windowWidth * 0.457)
  // Normal Button
  fill(128, 128, 128)
  stroke(0)
  button(windowWidth * 0.3,windowHeight * 0.4,windowWidth * 0.4,windowHeight*0.2,0,1)
  strokeWeight(20)
  textSize(35)
  fill(128, 128, 128)
  // God Mode Button
  button(windowWidth * 0.3,windowHeight * 0.7,windowWidth * 0.4,windowHeight*0.2,0,1,1)
  fill(0)
  textSize(35)
  noStroke()
  text("Normal Mode",windowWidth * 0.5,windowHeight * 0.5)
  text("God Mode",windowWidth * 0.5,windowHeight * 0.8)
}// end of scene1




function scene2(){
  if(godMode == 1){
    background(255)
    button(windowWidth * 0.3,windowHeight * 0.4,windowWidth * 0.4,windowHeight*0.2,1,2)

  }else{
    background(0)
    button(windowWidth * 0.3,windowHeight * 0.4,windowWidth * 0.4,windowHeight*0.2,1,2)

  }// end of if

}// end of scene2

function scene3(){
  if(godMode == 1){
    AITest();
  }else{
    trafficSim();
  }// end of if
}// end of scene3

function endScreen(){


  background(253, 218, 13);
  fill(255)
  stroke(0)
  strokeWeight(3)
  rect(windowWidth * 0.3,windowHeight * 0.5, windowWidth  * 0.4, windowHeight * 0.2,5)
  textFont("ROBOTO")
  // Restart Button 
  button(windowWidth * 0.3,windowHeight * 0.1, windowWidth  * 0.4, windowHeight * 0.1,2,0)

  textAlign(CENTER);
  textSize(35);
  noStroke();
  text("Restart",windowWidth * 0.5, windowHeight * 0.15);
  
  
  text(`Your Final Score is: ${score}`,windowWidth * 0.5, windowHeight * 0.6 );
 
 
}


function trafficSim(){
  // background(124,252,0)
  score = floor(scoreCalc(-car.y,0.01))
  for(let i = 0; i < traffic.length ; i++){
    traffic[i].update(road.borders,[])
  }//end of for  
  road.draw(-car.y);
  scoreboard.draw(score)
  car.update(road.borders,traffic)
  push();

  translate(0, -car.y + windowHeight * 0.7);
  
  for(let i = 0; i < traffic.length; i++){
    traffic[i].draw('blue');
  }// end of for
  car.draw('red')
  pop()
  if(car.damaged){
    scenenum++
  }// end of if

}// end of trafficSim

function AITest(){
  for(let i = 0; i < traffic.length ; i++){
    traffic[i].update(road.borders,[])
  }// end of for

  bestCar = self_driving_cars[0];
  score = floor(scoreCalc(-bestCar.y,0.008))
  scoreboard.draw(score)

  for(let i = 1; i < self_driving_cars.length; i++){
    if(self_driving_cars[i].y < bestCar.y){
      bestCar = self_driving_cars[i];
    }// end of if

  }// end of for
  road.draw(-bestCar.y);
  for(let i = 0; i < self_driving_cars.length; i++){
    self_driving_cars[i].update(road.borders, traffic);
  }// end of for

  push();
  
  translate(0, -bestCar.y + windowHeight * 0.7);

  for(let i = 0; i < traffic.length; i++){
    traffic[i].draw('blue');
  }// end of for

  for(let i = 0; i < self_driving_cars.length; i++){
    
    if(self_driving_cars[i]!= bestCar){
      self_driving_cars[i].draw('red');
          
    }// end of if
    if(!self_driving_cars[i].damaged){
      self_driving_cars[i].draw('dead');
    }// end of if

    // if(self_driving_cars[i].damaged && self_driving_cars[i]!= bestCar){
    //   self_driving_cars[i].x = bestCar.x
    //   self_driving_cars[i].y = bestCar.y * 0.99
    //   self_driving_cars[i].brain = bestCar.brain
    //   Network.mutate(self_driving_cars[i].brain,0.2)
    //   self_driving_cars[i].damaged = false
    // }

  }// end of for

  bestCar.draw('blue', true);

  pop();
  // if(bestCar.damaged){
  //   scenenum++
  // }// end of if

}// end of AITest

function reset(){
  godMode = 0
  car = new Car(road.getLaneCenter(laneCodes["lane 3"]), 0, standardWidth, standardHeight, "PLAYER", 10)
  playerCars = [car]

  traffic = [
    // Multiple layers of traffic cars for training AI
    // new Car(road.getLaneCenter(laneCodes[laneNames[3]]), -self_driving_cars[0].y - standardHeight * lane_start, standardWidth, standardHeight, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[1]]), -self_driving_cars[0].y - standardHeight * lane_start, standardWidth, standardHeight, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[0]]), -self_driving_cars[0].y - standardHeight * lane_start, standardWidth, standardHeight, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[2]]), -self_driving_cars[0].y - standardHeight * (lane_start + lane_factor), standardWidth, standardHeight, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[4]]), -self_driving_cars[0].y - standardHeight * (lane_start + lane_factor), standardWidth, standardHeight, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[1]]), -self_driving_cars[0].y - standardHeight * (lane_start + lane_factor), standardWidth, standardHeight, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[0]]), -self_driving_cars[0].y - standardHeight * (lane_start + 2 * lane_factor), standardWidth, standardHeight, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[3]]), -self_driving_cars[0].y - standardHeight * (lane_start + 2 * lane_factor), standardWidth, standardHeight, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[1]]), -self_driving_cars[0].y - standardHeight * (lane_start + 3 * lane_factor), standardWidth, standardHeight, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[2]]), -self_driving_cars[0].y - standardHeight * (lane_start + 3 * lane_factor), standardWidth, standardHeight, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[4]]), -self_driving_cars[0].y - standardHeight * (lane_start + 4 * lane_factor), standardWidth, standardHeight, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[2]]), -self_driving_cars[0].y - standardHeight * (lane_start + 4 * lane_factor), standardWidth, standardHeight, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[1]]), -self_driving_cars[0].y - standardHeight * (lane_start + 5 * lane_factor), standardWidth, standardHeight, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[4]]), -self_driving_cars[0].y - standardHeight * (lane_start + 5 * lane_factor), standardWidth, standardHeight, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[3]]), -self_driving_cars[0].y - standardHeight * (lane_start + 6 * lane_factor), standardWidth, standardHeight, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[1]]), -self_driving_cars[0].y - standardHeight * (lane_start + 6 * lane_factor), standardWidth, standardHeight, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[1]]), -self_driving_cars[0].y - standardHeight * (lane_start + 7 * lane_factor), standardWidth, standardHeight, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[0]]), -self_driving_cars[0].y - standardHeight * (lane_start + 7 * lane_factor), standardWidth, standardHeight, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[1]]), -self_driving_cars[0].y - standardHeight * (lane_start + 8 * lane_factor), standardWidth, standardHeight, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[4]]), -self_driving_cars[0].y - standardHeight * (lane_start + 8 * lane_factor), standardWidth, standardHeight, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[2]]), -self_driving_cars[0].y - standardHeight * (lane_start + 8 * lane_factor), standardWidth, standardHeight, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[1]]), -self_driving_cars[0].y - standardHeight * (lane_start + 9 * lane_factor), standardWidth, standardHeight, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[3]]), -self_driving_cars[0].y - standardHeight * (lane_start + 9 * lane_factor), standardWidth, standardHeight, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[2]]), -self_driving_cars[0].y - standardHeight * (lane_start + 10 * lane_factor), standardWidth, standardHeight, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[4]]), -self_driving_cars[0].y - standardHeight * (lane_start + 10 * lane_factor), standardWidth, standardHeight, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[2]]), -self_driving_cars[0].y - standardHeight * (lane_start + 11 * lane_factor), standardWidth, standardHeight, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[3]]), -self_driving_cars[0].y - standardHeight * (lane_start + 11 * lane_factor), standardWidth, standardHeight, "TRAFFIC"),
    // new Car(road.getLaneCenter(laneCodes[laneNames[1]]), -self_driving_cars[0].y - standardHeight * (lane_start + 9 * lane_factor), standardWidth, standardHeight, "TRAFFIC"),
    // new Car(road.getLaneCenter(laneCodes[laneNames[3]]), -self_driving_cars[0].y - standardHeight * (lane_start + 10 * lane_factor), standardWidth, standardHeight, "TRAFFIC"),

  ];
}



