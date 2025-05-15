
class Road{
    constructor(x,width,laneCount = 5){
        this.x = x
        this.width = width
        this.laneCount = laneCount
        this.left = x / 3
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
            line(x,this.bottom,x,this.top)
            // line(this.x,this.bottom,this.right,this.top)
        }


        

    }
}


function lerp(a,b,t){
    return a+(b-a)*t
}