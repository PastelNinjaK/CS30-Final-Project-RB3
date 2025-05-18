class Sensor{
    constructor(car){
        this.car = car;
        this.rayCount = 30;
        this.rayLength = car.width + 30;
        this.raySpread = Math.PI * 2;
        this.rays = [];
        this.readings = [];

    }// end of constructor

    update(roadBorders){
        this.castRays();
        this.readings = [];
        for(let i = 0; i < this.rays.length; i++){
            this.readings.push(
                this.getReadings(this.rays[i],roadBorders)
            )
        }        
    }//end of update
    castRays(){
        this.rays = [];
        for(let i = 0; i < this.rayCount; i++){
            let rayAngle = lerp(
                -this.raySpread/2,
                this.raySpread/2,
                i/(this.rayCount - 1)
            ) + this.car.angle;

            let start = {x:this.car.x, y:this.car.y};
            let end = {
                x:this.car.x - Math.sin(rayAngle) * this.rayLength,
                y:this.car.y - Math.cos(rayAngle) * this.rayLength
            };
            this.rays.push([start,end]);
        }// end of for
    }// end of castRays
    
    
    
    

    getReadings(ray, borders) {
        let touches = [];
        for (let i = 0; i < borders.length; i++) {
            let touch = getIntersection(
                ray[0],
                ray[1],
                borders[i][0],
                borders[i][1]
            );
            if (touch) {
                touches.push(touch);
            }
        }

        if (touches.length === 0) {
            return null;
        } else {
            const offsets = touches.map(e => e.offset);
            const minOffset = Math.min(...offsets);
            return touches.find(e => e.offset === minOffset);
        }
    }
    draw(){
        for(let i = 0; i < this.rayCount; i++){
            let end = this.rays[i][1]
            if(this.readings[i]){
                end = this.readings[i];
            }
            strokeWeight(2);
            stroke(255,255,0);
            line(
                this.rays[i][0].x,
                this.rays[i][0].y,
                end.x,
                end.y
            );
            stroke(0);

            strokeWeight(2);
            stroke(0);
            line(
                end.x,
                end.y,
                this.rays[i][1].x,
                this.rays[i][1].y,
            );
            stroke(0);
        }

    }
}