class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = 10;
    this.maxBoostSpeed = 20;
    this.friction = 0.05;
    this.angle = 0;
    this.damaged = false
    this.gameOver = false;

    this.sensor = new Sensor(this);
    this.controls = new Controls();
  }// end of constructor

  update(roadBorders) {
    if(!this.damaged){
      this.move();
      this.polygon = this.createPolygon();
      this.damaged = this.assessDamage(roadBorders);
      this.sensor.update(roadBorders);
    }else{
      this.gameOver = true;
    }

  }//end of update


  assessDamage(roadBorders){
    // This method checks the if the car is damaged by using an external functions in utils.js
    // if polyIntersect == true, then the car is damaged, else it's not.
    for(let i = 0; i < roadBorders.length; i++){
      if(polyIntersect(this.polygon,roadBorders[i])){
        return true;
      }
    }
    return false;
  }// end of assessDamage


  createPolygon() {
    // this method is used to calcullate  the 4 points of the car.
    // It finds the distance from the center of the car to each corner
    // using the Pythagorean theorem and calculates the angle between the y axis and the diagonal to a corner. 
    // This method helps the car to drawn accurately and to help detect collisions.
    
    let points = [];
    let rad = Math.hypot(this.width, this.height) / 2;
    let alpha = Math.atan2(this.width, this.height);

    points.push({
      x: this.x - sin(this.angle - alpha) * rad,
      y: this.y - cos(this.angle - alpha) * rad
    });

    points.push({
      x: this.x - sin(this.angle + alpha) * rad,
      y: this.y - cos(this.angle + alpha) * rad
    });

    points.push({
      x: this.x - sin(PI + this.angle - alpha) * rad,
      y: this.y - cos(PI + this.angle - alpha) * rad
    });

    points.push({
      x: this.x - sin(PI + this.angle + alpha) * rad,
      y: this.y - cos(PI + this.angle + alpha) * rad
    });

    return points;
  }

  move() {
    // this method has the car controls and most of the car physics, except for collision detection
    if (this.controls.forward) {
      this.speed += this.acceleration;
    }// end of if
    
    if (this.controls.reverse) {
      this.speed -= this.acceleration;
    }// end of if

    if (this.controls.boost){
      this.speed += 0.5;
      if(!this.controls.boost){
        this.speed -= 0.2;

      }
    }// end of if
    
    if (this.controls.boost){
      if(this.speed > this.maxBoostSpeed){
        this.speed = this.maxBoostSpeed;  
      }// end of if
    }// end of if

    if (this.speed > this.maxSpeed && !this.controls.boost) {
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

    if(this.damaged){
      fill(0)
    }else{
      fill(255, 0, 0);
    }
    stroke(255, 0, 0);
    beginShape();
    for (let pt of this.polygon) {
      vertex(pt.x, pt.y);
    }
    endShape(CLOSE);

    this.sensor.draw();
  }// end of draw

}// of Car



