function scene1(){
  background(253, 218, 13);  
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
  background(253, 218, 13);
  
  // Car 1 button
  stroke(0)
  fill(255)
  if(godMode == 1){
    // Car 1 button
    button(windowWidth * 0.05,windowHeight * 0.3,windowWidth * 0.2,windowHeight*0.1,1,2,0,true,1)
    fill(255)
    // Car 2 button
    button(windowWidth * 0.05,windowHeight * 0.6,windowWidth * 0.2,windowHeight*0.1,1,2,0,true,2)
  }else{
  // Car 1 button
  button(windowWidth * 0.05,windowHeight * 0.3,windowWidth * 0.2,windowHeight*0.1,1,2,0,true,1)
  fill(255)
  // Car 2 button
  button(windowWidth * 0.05,windowHeight * 0.6,windowWidth * 0.2,windowHeight*0.1,1,2,0,true,2)
  }
push();
translate(windowWidth * 0.5 + red_car_pic.width / 2, windowHeight * 0.4 + red_car_pic.height / 2);
rotate(-HALF_PI);
image(gray_car_pic, 0, 0, windowWidth * 0.1, windowHeight * 0.4);
pop();

push();
translate(windowWidth * 0.5 + red_car_pic.width / 2, windowHeight * 0.07 + red_car_pic.height / 2);
rotate(-HALF_PI);
image(red_car_pic, 0, 0, windowWidth * 0.1, windowHeight * 0.4);
pop();
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
  button(windowWidth * 0.3,windowHeight * 0.1, windowWidth  * 0.4, windowHeight * 0.1,3,0)

  textAlign(CENTER);
  textSize(35);
  noStroke();
  text("Restart",windowWidth * 0.5, windowHeight * 0.15);
  
  
  text(`Your Final Score is: ${score}`,windowWidth * 0.5, windowHeight * 0.6 );
 
 
}

function instructions(){
  background(255)
  button(windowWidth * 0.2, windowHeight * 0.1, windowWidth * 0.05, windowHeight * 0.1,4,2)
  // IJKL button
  fill(0,255,0)
  controlButton(windowWidth * 0.2, windowHeight * 0.5,windowWidth * 0.05,windowHeight * 0.1,2) 
  
  
  // WASD button
  fill(0,0,255)
  controlButton(windowWidth * 0.5, windowHeight * 0.5,windowWidth * 0.05,windowHeight * 0.1,1) 

  
  
  
}
function trafficSim(){
  let playerCar = playerCars[whichCar]
  fill(255,0,0)
  stroke(0)
  strokeWeight(10)
  button(windowWidth * 0.8, windowHeight * 0.1, windowWidth * 0.1, windowHeight * 0.1,2,4)
  noStroke();
  score = floor(scoreCalc(-playerCar.y,0.01))
  for(let i = 0; i < traffic.length ; i++){
    traffic[i].update(road.borders,[])
  }//end of for  
  road.draw(-playerCar.y);
  scoreboard.draw(score)
  print(playerCar.controls.controlType = playerControl)
  playerCar.update(road.borders,traffic)
  push();

  
  translate(0, -playerCar.y + windowHeight * 0.7);
  
  for(let i = 0; i < traffic.length; i++){
    traffic[i].draw(color_names[i % color_names.length])
  }// end of for
  
  
  if(whichCar == 1){
    playerCar.draw('red')

  }else if(whichCar == 2){
    playerCar.draw('gray')
  }else{
    playerCar.draw('blue')

  }
  pop()
  if(playerCar.damaged){
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
    traffic[i].draw(color_names[i % color_names.length])
  }// end of for


  if(whichCar == 1){
    bestCar.draw('red', true);
  }
  if(whichCar == 2){
    bestCar.draw('gray', true);

  }


  pop();
  // if(bestCar.damaged){
  //   scenenum++
  // }// end of if

}// end of AITest

function reset(){
  godMode = 0
  car = new Car(road.getLaneCenter(laneCodes["lane 3"]), 0, standardWidth, standardHeight, "PLAYER", playerControl,10)
  car1 = new Car(road.getLaneCenter(laneCodes["lane 3"]), 0, standardWidth, standardHeight, "PLAYER", playerControl, 9)
  car2 = new Car(road.getLaneCenter(laneCodes["lane 3"]), 0, standardWidth, standardHeight, "PLAYER", playerControl, 8)

  playerCars = [car,car1,car2]
  let lane_start = 2;
  let lane_factor = 3;

  let lanePattern = [
    [1, 0],
    [2, 4, 1],
    [0, 3],
    [1, 2],
    [4, 2],
    [1, 4],
    [3, 1],
    [1, 0],
    [1, 2],
    [1, 3],
    [2, 4],
    [2, 3],
    [1, 3]
  ];

traffic = makeTraffic(lanePattern,lane_start,lane_factor);
}



