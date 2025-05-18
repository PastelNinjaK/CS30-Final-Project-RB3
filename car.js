class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = 10;
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
    for(let i = 0; i < roadBorders.length; i++){
      if(polyIntersect(this.polygon,roadBorders[i])){
        return true;
      }
    }
    return false;
  }


  createPolygon() {
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
    if (this.controls.forward) {
      this.speed += this.acceleration;
    }// end of if
    
    if (this.controls.reverse) {
      this.speed -= this.acceleration;
    }// end of if

    if (this.controls.boost){
      this.speed *= 2;
    }
    
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



