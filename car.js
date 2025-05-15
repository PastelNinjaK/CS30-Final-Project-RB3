class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = 3;
    this.friction = 0.05;
    this.angle = 0;

    this.controls = new Controls();
  }

  update() {
    this.move();
  }

  move() {
    if (this.controls.forward) {
      this.speed += this.acceleration;
    }
    if (this.controls.reverse) {
      this.speed -= this.acceleration;
    }
    
    // if(this.x - this.width < roadX ){
    //   this.speed *= -this.speed
    // }
    // if(this.y < 0){
    //   this.speed -= 100
    // }


    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }
    if (this.speed < -this.maxSpeed / 2) {
      this.speed = -this.maxSpeed / 2;
    }

    if (this.speed > 0) {
      this.speed -= this.friction;
    }
    if (this.speed < 0) {
      this.speed += this.friction;
    }
    if (abs(this.speed) < this.friction) {
      this.speed = 0;
    }

    if (this.speed != 0) {
      const flip = this.speed > 0 ? 1 : -1;
      if (this.controls.left) {
        this.angle += 0.03 * flip;
      }
      if (this.controls.right) {
        this.angle -= 0.03 * flip;
      }
    }

    this.x -= sin(this.angle) * this.speed;
    this.y -= cos(this.angle) * this.speed;
  }

  // draw() {
  //   push();
  //   translate(this.x, this.y);
  //   rotate(-this.angle);

  //   rectMode(CENTER);
  //   fill(255,0,0);
  //   noStroke();
  //   rect(0, 0, this.width, this.height,5);

  //   pop();
  // }
  draw() {
    push();
    translate(this.x, this.y);
    rotate(-this.angle);

    fill(255, 0, 0);
    noStroke();
    
    // Shift the rectangle so that rotation pivots around its center
    rect(-this.width / 2, -this.height / 2, this.width, this.height, 5);

    pop();
  }
}