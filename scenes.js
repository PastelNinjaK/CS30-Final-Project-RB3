function scene1(){
  background(253, 218, 13);
  // line(windowWidth/2,0,windowWidth/2,windowHeight)
  
  
  
  
  fill(0);
  textAlign(CENTER)
  textFont("ROBOTO");
  fill(0)
  image(title_pic,windowWidth * 0.2775,-windowHeight * 0.1,windowWidth * 0.457)
  // Normal Button
  fill(128, 128, 128)
  button(windowWidth * 0.3,windowHeight * 0.4,windowWidth * 0.4,windowHeight*0.2,0,1)
  strokeWeight(20)
  textSize(35)
  text("Normal Mode",windowWidth * 0.5,windowHeight * 0.5)
  fill(128, 128, 128)
  // fill(255)
  // God Mode Button
  button(windowWidth * 0.3,windowHeight * 0.7,windowWidth * 0.4,windowHeight*0.2,0,1,1)
  fill(0)
  strokeWeight(20)
  textSize(35)
  text("God Mode",windowWidth * 0.5,windowHeight * 0.8)
}// end of scene1




function scene2(){
  if(godMode == 1){
    background(255)
  }else{
    background(0)
  };

}// end of scene2

function scene3(){
  if(godMode == 1){
    AITest();
  }else{
    trafficSim()
  }// end of if
}// end of scene 3


function endScreen(){
  background(255);
  rect(windowWidth * 0.3,windowHeight * 0.4,windowWidth * 0.4,windowHeight*0.2)
}// end of endScreen


function trafficSim(){
  for(let i = 0; i < traffic.length ; i++){
    traffic[i].update(road.borders,[])
  }//end of for  
  road.draw(-car.y);
  car.update(road.borders,traffic)
  push();

  translate(0, -car.y + windowHeight * 0.7);
  
  for(let i = 0; i < traffic.length; i++){
    traffic[i].draw('blue');
  }// end of for
  car.draw('red')
  pop()


}// end of trafficSim

function AITest(){
  for(let i = 0; i < traffic.length ; i++){
    traffic[i].update(road.borders,[])
  }// end of for

  bestCar = self_driving_cars[0];
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

  bestCar.draw('red', true);

  pop();
  

}// end of AITest