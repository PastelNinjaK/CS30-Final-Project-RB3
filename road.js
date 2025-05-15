
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
        const topLeft={x:this.left,y:this.top};
        const topRight={x:this.right,y:this.top};
        const bottomLeft={x:this.left,y:this.bottom};
        const bottomRight={x:this.right,y:this.bottom};
        this.borders=[
            [topLeft,bottomLeft],
            [topRight,bottomRight]
        ];


    }// end of constructor

    draw(carY) {
        fill(0);
        rect(this.right-30,-30,(this.left-this.right)+60,(windowHeight)+30)
        fill(255);
        strokeWeight(10);
        const visibleTop = carY - height;
        const visibleBottom = carY + height;

        for (let i = 1; i < this.laneCount; i++) {
            let x = lerp(this.left, this.right, i / this.laneCount);
            drawingContext.setLineDash([20, 40]);
            // line(x, this.top, x, this.bottom);
            
            stroke(255, 255, 0);
            line(x, visibleTop, x,this.bottom);

            line(x, visibleBottom, x, this.top);

        }

        drawingContext.setLineDash([]);
        stroke(255)

        // Draw borders within visible range
        this.borders.forEach(border => {
            const x1 = border[0].x;
            const x2 = border[1].x;
            line(x1, this.top, x2, this.bottom);
        });
    }



    getLaneCenter(laneCode){
        let laneWidth = this.width/this.laneCount;
        return this.left + laneWidth/2+laneCode * laneWidth
    }// end ofgetLaneCenter
}


