class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = 5;
    this.friction = 0.05;
    this.angle = 0;

    this.controls = new Controls();
  }// end of constructor

  update() {
    this.move();
  }//end of update

  move() {
    if (this.controls.forward) {
      this.speed += this.acceleration;
    }// end of if
    
    if (this.controls.reverse) {
      this.speed -= this.acceleration;
    }// end of if
    
    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }// end of if
    
    if (this.speed < -this.maxSpeed / 2) {
      this.speed = -this.maxSpeed / 2;
    }// end of if
    
    if (this.speed > 0) {
      this.speed -= this.friction;
    }// end of if
    
    if (this.speed < 0) {
      this.speed += this.friction;
    }// end of if
    
    if (abs(this.speed) < this.friction) {
      this.speed = 0;
    }// end of if

    if (this.speed != 0) {
      const flip = this.speed > 0 ? 1 : -1;
      if (this.controls.left) {
        this.angle += 0.03 * flip;
      }// end of if
      if (this.controls.right) {
        this.angle -= 0.03 * flip;
      }// end of if
    }// end of if

    this.x -= sin(this.angle) * this.speed;
    this.y -= cos(this.angle) * this.speed;
  }// end of move


  draw() {
    push();
    translate(this.x, this.y);
    rotate(-this.angle);
    
    rectMode(CENTER);
    fill(255, 0, 0);
    noStroke();
    rect(0, 0, this.width, this.height, 5);
    
    // Optional: headlights


    pop();
  }// end of draw

}// of Car



