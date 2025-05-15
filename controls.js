// Controls class using p5.js keyboard events
class Controls {
  constructor() {
    this.forward = false;
    this.left = false;
    this.right = false;
    this.reverse = false;
  }

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

    }
  }
}

