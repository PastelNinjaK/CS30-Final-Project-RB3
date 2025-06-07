function startingScreen(){
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



function carSelection(){
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