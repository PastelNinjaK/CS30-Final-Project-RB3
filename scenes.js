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
}




function scene2(){
  if(godMode == 1){
    background(255)
  }else{
    background(0)
  };

}

function scene3(){
  sceneTest();
}


function endScreen(){
  background(255);
  rect(windowWidth * 0.3,windowHeight * 0.4,windowWidth * 0.4,windowHeight*0.2)
}




function sceneTest(){
  for(let i = 0; i < traffic.length ; i++){
    traffic[i].update(road.borders,[])
  }

  let score;
  bestCar = self_driving_cars[0];
  for(let i = 1; i < self_driving_cars.length; i++){
    if(self_driving_cars[i].y < bestCar.y){
      bestCar = self_driving_cars[i];
    }

  }

  // if (localStorage.getItem("myNeuralNetData")) {
  //   let brainData = JSON.parse(localStorage.getItem("myNeuralNetData"));
  //   for (let i = 0; i < self_driving_cars.length; i++) {
  //     self_driving_cars[i].brain = JSON.parse(JSON.stringify(brainData));
  //     if (i !== 0) {
  //       Network.mutate(self_driving_cars[i].brain,0.1);
  //     }
  //   }
  // }
  

  road.draw(-bestCar.y);

  // if(-self_driving_cars[0].y < 0){
  //   score = 0;
  // }else{
  //   score = floor(scoreCalc(-self_driving_cars[0].y, 0.02));
  // }

  for(let i = 0; i < self_driving_cars.length; i++){
    self_driving_cars[i].update(road.borders, traffic);
  }

  push();
  // print(self_driving_cars.speed)
  // scoreboard.draw(score);

  translate(0, -bestCar.y + windowHeight * 0.7);

  for(let i = 0; i < traffic.length; i++){
    traffic[i].draw('blue');
  }

  for(let i = 0; i < self_driving_cars.length; i++){
    
    if(self_driving_cars[i]!= bestCar){
      self_driving_cars[i].draw('red');
          
    }
    if(!self_driving_cars[i].damaged){
      self_driving_cars[i].draw('dead');
    }

  }

  bestCar.draw('red', true);

  pop();
  
  // if(self_driving_cars.gameOver){
  //   scenenum++
  // }
}// end of sceneTest