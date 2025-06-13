function startingScreen(){
  background(253, 218, 13);  
  fill(0);
  textAlign(CENTER)
  textFont("IMPACT");
  fill(0)
  // image(title_pic,windowWidth * 0.2775,-windowHeight * 0.1,windowWidth * 0.457)
  
  image(startUp_pic,0,0,windowWidth,windowHeight)
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
  textFont("IMPACT")
  background(253, 218, 13);
  image(scene2_pic,0,0,windowWidth,windowHeight)
  
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
    // denny
    fill(255)
    button(windowWidth * 0.7,windowHeight * 0.3,windowWidth * 0.05,windowHeight*0.1,1,2,0,true,0)
    // Car 1 button
    fill(255)
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
  if(hasGodMode == false){
    fill(255)
    rect(windowWidth * 0.3,windowHeight * 0.045,windowWidth * 0.2,windowHeight*0.1,5)
    noStroke()
    fill(0)
    text("Access Denied!", windowWidth * 0.4, windowHeight * 0.1)
    stroke(0)
  }
  if(godMode == 1){
    fill(255)
    rect(windowWidth * 0.3,windowHeight * 0.045,windowWidth * 0.2,windowHeight*0.1,5)
    noStroke()
    fill(0)
    text("Welcome to God Mode", windowWidth * 0.4, windowHeight * 0.1)
    stroke(0)
  }
  noStroke()
  fill(0)
  text('Press to pick Gray Car',windowWidth * 0.15,windowHeight * 0.66)
  text('Press to pick Red Car',windowWidth * 0.15,windowHeight * 0.36)
  
  
  text(`Top Speed: 91 km/h`, windowWidth * 0.4, windowHeight * 0.4)
  text("Downforce/Grip: 8", windowWidth * 0.4, windowHeight * 0.45)
  
  text(`Top Speed: 84 km/h`, windowWidth * 0.4, windowHeight * 0.6)
  text("Downforce/Grip: 10", windowWidth * 0.4, windowHeight * 0.65)  
  stroke(0)

}// end of scene2