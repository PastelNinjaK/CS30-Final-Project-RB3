// Controls class using p5.js keyboard events
class Controls {
  constructor(type) {
    this.forward = true;
    this.forward = false;
    this.left = false;
    this.right = false;
    this.reverse = false;
    this.boost = false;
    this.controlType = 1;
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
    if(this.controlType === 1){

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
    }else if(this.controlType === 2){
      switch (k) {
        case "j":
            this.left = pressed;
            break;
        case "l":
            this.right = pressed;
            break;
        case "i":
            this.forward = pressed;
            break;
        case "k":
            this.reverse = pressed;
            break;
        case "b":
            this.boost = pressed;
            break;
      }
    }else if(this.controlType === 3){
      switch (k) {
        case "ArrowLeft":
            this.left = pressed;
            break;
        case "ArrowRight":
            this.right = pressed;
            break;
        case "ArrowUp":
            this.forward = pressed;
            break;
        case "ArrowDown":
            this.reverse = pressed;
            break;
        case "b":
            this.boost = pressed;
            break;
      }      
    }
    

  }// end of handleKeyPress
}// end of controls