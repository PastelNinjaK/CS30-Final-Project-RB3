function scene1(){
  background(255,255,0)
  fill(0)
  rect(100,100,100)
}


function scene3(){
  sceneTest();
}


function sceneTest(){
  let score;
  road.draw(-car.y);
  if(-car.y < 0){
    score = 0
  }else{
    score = floor(scoreCalc(-car.y,0.02))
  }
  push();

  scoreboard.draw(score);
  translate(0,-car.y + windowHeight * 0.7);
  car.update(road.borders);
  car.draw();
  pop()
}// end of sceneTest