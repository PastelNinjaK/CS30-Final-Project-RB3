class Car {
  constructor(x, y, width, height,type = "TRAFFIC", maxSpeed = 6) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;

    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = maxSpeed;
    this.maxBoostSpeed = 20;
    this.friction = 0.05;
    this.angle = 0;
    this.damaged = false
    this.gameOver = false;
    this.useBrain = (type == "AI") 

    if(type != "TRAFFIC"){
      this.sensor = new Sensor(this);
      this.brain = new Network(
        [this.sensor.rayCount,6,4]);
    }
    this.controls = new Controls(this.type);
  }// end of constructor

  update(roadBorders,traffic) {
    if(!this.damaged){
      this.move();
      this.polygon = this.createPolygon();
      this.damaged = this.assessDamage(roadBorders,traffic);
      if(this.sensor){
        this.sensor.update(roadBorders,traffic);
        let offset = this.sensor.readings.map(
          s=>s==null?0:1-s.offset
        )
        let outputs = Network.feedForward(offset,this.brain);
        if(this.useBrain){
          this.controls.forward = outputs[0]
          this.controls.left = outputs[1]
          this.controls.right = outputs[2]
          this.controls.reverse = outputs[3]

          // this.controls.forward = 1
          // this.controls.left = outputs[1]
          // this.controls.right = outputs[2]
          // this.controls.reverse = 0
        }
        // print(outputs)
        
      }

    }else{
      this.gameOver = true;
    }

  }//end of update


  assessDamage(roadBorders,traffic){
    // This method checks the if the car is damaged by using an external functions in utils.js
    // if polyIntersect == true, then the car is damaged, else it's not.
    for(let i = 0; i < roadBorders.length; i++){
      if(polyIntersect(this.polygon,roadBorders[i])){
        return true;
      }
    }

    for(let i = 0; i < traffic.length; i++){
      if(polyIntersect(this.polygon,traffic[i].polygon)){
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
    if(!this.controls.boost && this.speed == this.maxBoostSpeed){
      this.speed -= this.speed * 0.1;
    }

    if (this.controls.boost){
      this.speed += 0.5;

    }else if(this.speed > this.maxSpeed){
      this.speed -= this.speed * 0.1;
    }// end of if
    


    if (this.controls.boost){
      if(!this.controls.forward){
        this.speed -= this.speed * 0.1;
      }

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


  draw(colour,drawSensor = false) {


    switch(colour){
      case 'red':
        fill(255,0,0)
        stroke(0)
        break;
      case 'yellow':
        fill(255,255,0)
        stroke(0)
        break;
      case 'blue':
        fill(0,0,255);
        stroke(0)
        break;
      case 'dead':
        fill(0,0,0,0);
        noStroke();
        break;
    }
    beginShape();
    // stroke(0);
    for (let pt of this.polygon) {
      vertex(pt.x, pt.y);
    }
    endShape(CLOSE);
    
    if(this.sensor && drawSensor){
      this.sensor.draw();
  
    }
  }// end of draw
  
}// of Car



