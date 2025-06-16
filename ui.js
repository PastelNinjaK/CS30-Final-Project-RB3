function button(x,y,w,h,minScene,num,admin = 0,isCarButton = false,carnum){
  rect(x,y,w,h,10);
  fill(0);
  if(mouseIsPressed){
    if(scenenum == minScene){
      let x1 = (mouseX <= x+w);
      let x2 = (mouseX >= x);
      let y1 = (mouseY <= y+h);
      let y2 = (mouseY >= y);
      let adminCondition = (admin != 0);
      
      if(x1 && x2 && y1 && y2){
        scenenum = num;
      }// end of if
      
      if(x1 && x2 && y1 && y2 && adminCondition){
        let message = "Type Your Password: "
        let user_input = window.prompt(message);
        let password_condition = user_input == ("Your Password")
        if(password_condition){
          godMode = 1;
          hasGodMode = true;
        }
        hasGodMode = false;
        scenenum = num;
      }// end of if 
      if(x1 && x2 && y1 && y2 && isCarButton){
        whichCar = carnum
        scenenum = num;

      }
      
    
    }// end of if
  }// end of if
}// end of button


function controlButton(x,y,w,h,type){
  rect(x,y,w,h,10);
  fill(0);
  if(mouseIsPressed){
      let x1 = (mouseX <= x+w);
      let x2 = (mouseX >= x);
      let y1 = (mouseY <= y+h);
      let y2 = (mouseY >= y);
      
      if(x1 && x2 && y1 && y2){
        playerControl = type
      }// end of if
  }// end of if
}// end of button