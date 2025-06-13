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
  textFont("IMPACT")
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
  // background(253, 218, 13);
  
  image(instructions_pic,0,0,windowWidth,windowHeight)  
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
  fill(255)
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
  text("Welcome to TrafficSim!\nYour goal survive for as long as you can.",windowWidth * 0.7, windowHeight * 0.1)
  text(`Your Current Score: ${score}`,windowWidth * 0.7, windowHeight * 0.2)
  text("Quit Button",windowWidth * 0.7, windowHeight * 0.45)
  text("Conitnue Button",windowWidth * 0.01, windowHeight * 0.2)

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
  image(play_img,windowWidth * 0.015, windowHeight * 0.06,windowWidth * 0.04, windowHeight * 0.08)
  // Quit button
  fill(255)
  button(windowWidth * 0.7, windowHeight * 0.5, windowWidth * 0.05, windowHeight * 0.1,4,3)

  
  
}



function AiInstructions(){
  textFont("IMPACT")
  image(instructions_pic,0,0,windowWidth,windowHeight)
  fill(255)
  textSize(20)
  noStroke()
  text("Welcome to TrafficSim(GOD mode)!\nYour goal:\nChill and just watch my AI trained Navigate through traffic!.",windowWidth * 0.7, windowHeight * 0.1)
  text(`Your Current Score: ${score}`,windowWidth * 0.7, windowHeight * 0.2)
  text("Quit Button",windowWidth * 0.7, windowHeight * 0.45)
  text("Conitnue Button",windowWidth * 0.01, windowHeight * 0.2)
  // Return to Game button 
  button(windowWidth * 0.01, windowHeight * 0.05, windowWidth * 0.05, windowHeight * 0.1,5,2)
  image(play_img,windowWidth * 0.015, windowHeight * 0.06,windowWidth * 0.04, windowHeight * 0.08)
  // Quit Button
  stroke(0)
  fill(255)
  button(windowWidth * 0.7, windowHeight * 0.5, windowWidth * 0.05, windowHeight * 0.1,5,3)  

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
  text(`Speed: ${floor(playerCar.speed) * 7 }km/h`,windowWidth * 0.85, windowHeight * 0.5)
  recycleTraffic(playerCar,windowHeight,playerCar.width * (lane_factor * lane_start))
  print(playerCar.controls.controlType = playerControl)
  playerCar.update(road.borders,traffic)
  push();

  
  translate(0, -playerCar.y + windowHeight * 0.7);
  
  for(let i = 0; i < traffic.length; i++){
    traffic[i].draw(color_names[i % color_names.length])
  }// end of for
  
  
  if(whichCar == 1){
    playerCar.draw('red')

  }
  if(whichCar == 2){
    playerCar.draw('gray')
  }
  if(whichCar == 0){
    playerCar.draw('denny')

  }
  pop()
  if(playerCar.damaged){
    scenenum++
  }// end of if

}// end of trafficSim




function AITest(){
  fill(255)
  stroke(0)
  strokeWeight(10)
  button(windowWidth * 0.8, windowHeight * 0.1, windowWidth * 0.05, windowHeight * 0.1,2,5)
  image(pause_img,windowWidth * 0.805, windowHeight * 0.11,windowWidth * 0.04, windowHeight * 0.08)
  noStroke();
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
  noStroke()
  fill(0)
  text(`Speed: ${floor(bestCar.speed) * 7 }km/h`,windowWidth * 0.85, windowHeight * 0.5)
  stroke(0)
  recycleTraffic(bestCar,windowHeight,bestCar.width * (lane_factor * lane_start))
    
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
  if(bestCar.damaged){
    scenenum++
  }// end of if

}// end of AITest





function recycleTraffic(refCar,buffer,spacing) {

  // Find the highest (smallest y) traffic car
  let topY = Math.min(...traffic.map(c => c.y));

  for (let i = 0; i < traffic.length; i++) {
    let car = traffic[i];
    
    // If car is far below the player
    if (car.y > refCar.y + buffer) {
      car.y = topY - spacing;

      
    }
  }
}






