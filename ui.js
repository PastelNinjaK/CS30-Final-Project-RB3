function button(x,y,w,h,minScene,num){
  fill(255);
  rect(x,y,w,h);
  fill(0);
  if(mouseIsPressed){
    if(sceneNum == minScene){
      
      let x1 = (mouseX <= x+w);
      let x2 = (mouseX >= x);
      let y1 = (mouseY <= y+h);
      let y2 = (mouseY >= y);
      
      if(x1 && x2 && y1 && y2){
        scenenum = num;
      }// end of if
    }// end of if
  }// end of if
}// end of button