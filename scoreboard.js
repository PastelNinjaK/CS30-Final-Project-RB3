class Scoreboard{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h

    }


    

    draw(num){
        strokeWeight(0)
        fill(255,0,0)
        rect(this.x,this.y,this.w,this.h)
        fill(0)
        textSize(windowWidth * 0.025)
        textAlign(LEFT)
        // text("Score: " + num,this.x + (this.x * 0.025),this.y + (this.y * 0.3),this.x + (this.x * 0.025)* 0.005,this.y + (this.y * 0.3))
        text("Score: " + num,windowWidth * 0.85, this.y + (windowHeight * 0.08))
        strokeWeight(0)
    }
}