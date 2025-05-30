// Controls class using p5.js keyboard events
class Controls {
  constructor(type) {
    this.forward = true;
    this.forward = false;
    this.left = false;
    this.right = false;
    this.reverse = false;
    this.boost = false;
    switch(type){
      case "TRAFFIC":
        this.forward = true;
        break;
      case "PLAYER":
        this.forward = false;
        break;  
    }

  }// end of constructor

  handleKeyPress(k, pressed) {
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
  }// end of handleKeyPress
}// end of controls