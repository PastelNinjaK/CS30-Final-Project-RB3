class Scoreboard{
    constructor(x,y,w){
        this.x = x;
        this.y = y;
        this.w = w;

    }


    

    draw(num){
        strokeWeight(0)
        fill(255,0,0)
        rect(this.x,this.y,this.w)
        fill(0)
        
        text("Score: " + num,this.x + (this.x * 0.025),this.y + (this.y * 0.3))
        strokeWeight(0)
    }
}