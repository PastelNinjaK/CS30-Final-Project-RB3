function mainGame(){
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
  noStroke()
  let currentControl = ""
  let forwardKey = ''
  let reverseKey = ''
  let rightKey = ''
  let leftKey = ''
  background(253, 218, 13);
  
  
  if(playerControl === 1){
    currentControl = "WASD"
    forwardKey = currentControl[0]
    leftKey = currentControl[1]
    reverseKey = currentControl[2]
    rightKey = currentControl[3]
  }
  if(playerControl === 2){
    currentControl = "IJKL"
    forwardKey = currentControl[0]
    leftKey = currentControl[1]
    reverseKey = currentControl[2]
    rightKey = currentControl[3]
  }
  if(playerControl === 3 ){
    currentControl = "Arrow keys"
    forwardKey = "UP"
    leftKey = "LEFT"
    reverseKey = "DOWN"
    rightKey = "RIGHT"
  }
  textSize(20)
  text(`Current Control Layout: ${currentControl}`,windowWidth * 0.1, windowHeight * 0.05)
  text(`Key Binding`,windowWidth * 0.1,windowHeight * 0.12)
  text(`Forward Key: ${forwardKey}`,windowWidth * 0.1, windowHeight * 0.17)
  text(`Reverse Key: ${reverseKey}`,windowWidth * 0.1, windowHeight * 0.2)
  text(`Left Key: ${leftKey}`,windowWidth * 0.1, windowHeight * 0.23)
  text(`Right Key: ${rightKey}`,windowWidth * 0.1, windowHeight * 0.26)
  
  
  // IJKL button
  text("Switch to IJKL",windowWidth * 0.095,windowHeight * 0.65)
  text("Switch to Arrow\nKeys",windowWidth * 0.195,windowHeight * 0.65)
  text("Switch to AWSD",windowWidth * 0.295,windowHeight * 0.65)
  stroke(0)
  strokeWeight(10)
  fill(255)
  controlButton(windowWidth * 0.1, windowHeight * 0.7,windowWidth * 0.05,windowHeight * 0.1,2) 
  
  // Arrow button
  fill(255)
  controlButton(windowWidth * 0.2, windowHeight * 0.7,windowWidth * 0.05,windowHeight * 0.1,3) 
  
  // WASD button
  fill(255)
  controlButton(windowWidth * 0.3, windowHeight * 0.7,windowWidth * 0.05,windowHeight * 0.1,1) 
  // Return to Game button 
  fill(255) 
  button(windowWidth * 0.01, windowHeight * 0.05, windowWidth * 0.05, windowHeight * 0.1,4,2)
  
  
  
}
function trafficSim(){
  let playerCar = playerCars[whichCar]
  fill(255)
  stroke(0)
  strokeWeight(10)
  button(windowWidth * 0.8, windowHeight * 0.1, windowWidth * 0.05, windowHeight * 0.1,2,4)
  image(pause_img,windowWidth * 0.805, windowHeight * 0.11,windowWidth * 0.04, windowHeight * 0.08)
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





