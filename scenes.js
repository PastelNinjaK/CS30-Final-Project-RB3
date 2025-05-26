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
  road.draw(-car.y);
  if(-car.y < 0){
    score = 0
  }else{
    score = floor(scoreCalc(-car.y,0.02))
  }
  push();
  print(car.speed)
  scoreboard.draw(score);
  translate(0,-car.y + windowHeight * 0.7);
  car.update(road.borders,traffic);
  car.draw();
  for(let i = 0; i < traffic.length; i++){
    traffic[i].draw()
  }

  pop()
  if(car.gameOver){
    scenenum++
  }
}// end of sceneTest