
class Road{
    constructor(x,width,laneCount = 5){
        this.x = x
        this.width = width
        this.laneCount = laneCount
        this.left = x + width/4
        this.right = windowWidth - this.left 
        const infinity = 10000000000;
        this.top = -infinity
        this.bottom = infinity

    }

    draw(){
        strokeWeight(10)
        stroke("white")
        for(let i = 0; i <= this.laneCount; i++){
            let x = lerp(this.left,this.right,i/this.laneCount) 
            if(i > 0 && i < this.laneCount){
                drawingContext.setLineDash([50,50])
            }else{
                drawingContext.setLineDash([0])
            }
            line(x,this.bottom,x,this.top)

        }
        
    }

    getLaneCenter(laneCode){
        let laneWidth = this.width/this.laneCount;
        return this.left + laneWidth/2+laneCode * laneWidth
    }
}


