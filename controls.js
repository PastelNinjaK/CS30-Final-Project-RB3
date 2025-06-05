// Controls class using p5.js keyboard events
class Controls {
  constructor(type,controlType = 1) {
    this.forward = true;
    this.forward = false;
    this.left = false;
    this.right = false;
    this.reverse = false;
    this.boost = false;
    this.controlType = controlType;
    switch(type){
      case "TRAFFIC" || "AI":
        this.forward = true;
        break;
      case "PLAYER":
        this.forward = false;
        break;  
    }// end of switch

  }// end of constructor

  handleKeyPress(k, pressed) {
    if(this.controlType == 1){

      switch (k) {
        case "a":
            this.left = pressed;
            break;
        case "d":
            this.right = pressed;
            break;
        case "w":
            this.forward = pressed;
            break;
        case "s":
            this.reverse = pressed;
            break;
        case "b":
            this.boost = pressed;
            break;


      }// end of switch
    }
    if(this.controlType == 2){
      switch (k) {
        case "ARROW_LEFT":
            this.left = pressed;
            break;
        case "ARROW_RIGHT":
            this.right = pressed;
            break;
        case "ARROW_UP":
            this.forward = pressed;
            break;
        case "ARROW_DOWN":
            this.reverse = pressed;
            break;
        case "SPACE":
            this.boost = pressed;
            break;
      }
    }
    

  }// end of handleKeyPress
}// end of controls