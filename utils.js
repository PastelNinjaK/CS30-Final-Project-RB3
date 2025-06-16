function lerp(a,b,t){
    return a+(b-a)*t
}// end of lerp


function scoreCalc(x, factor){
    if(x < 0){
        return 0
    }else{
        return x * factor
    }

}// end of scoreCalc

function getIntersection(A,B,C,D){ 
    const tTop=(D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
    const uTop=(C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
    const bottom=(D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);
    
    if(bottom!=0){
        const t=tTop/bottom;
        const u=uTop/bottom;
        if(t>=0 && t<=1 && u>=0 && u<=1){
            return {
                x:lerp(A.x,B.x,t),
                y:lerp(A.y,B.y,t),
                offset:t
            }
        }
    }

    return null;
}

function polyIntersect(poly1,poly2){
    for(let i = 0; i< poly1.length; i++){
        for(let j = 0; j<poly2.length; j++){
            let contact = getIntersection(
                poly1[i],poly1[(i+1)%poly1.length],poly2[j],poly2[(j+1)%poly2.length]
            );
            if(contact){
                return true;
            }// end of if
        }// end of for
    }// end of for loop
    return false;
}// end of polyIntersect



function saveBestBrain() {
  if (bestCar?.brain) {
    localStorage.setItem("myNeuralNetData", JSON.stringify(bestCar.brain));
    print("Best brain manually saved!");
  }// end of if
}// end of saveBestBrain

function discardBestBrain() {
  localStorage.clear()
  print("Best brain discarded.");
}// end of discardBestBrain

function makeCars(num, x, y, w, h) {
  let car_arr = [];
  for (let i = 0; i < num; i++) {
    car_arr.push(new Car(x, y, w, h, "AI",false, 8));
  }// end of for
  return car_arr;
}// end of makeCars



function makeTraffic(lanePattern,lane_start,lane_factor){
  let traffic_arr  = []
  for (let i = 0; i < lanePattern.length; i++) {
    let y = -self_driving_cars[0].y - standardHeight * (lane_start + i * lane_factor);

    for (let j = 0; j < lanePattern[i].length; j++) {
      let laneIndex = lanePattern[i][j];
      let x = road.getLaneCenter(laneCodes[laneNames[laneIndex]]);
      traffic_arr.push(new Car(x, y, standardWidth, standardHeight, "TRAFFIC"));
    }
  }
  return traffic_arr

}


function keyPressed() {
  for (let i = 0; i < playerCars.length; i++) {
    playerCars[i].controls.handleKeyPress(key, true);
  }// end of for
}

function keyReleased() {
  for (let i = 0; i < playerCars.length; i++) {
    playerCars[i].controls.handleKeyPress(key, false);
  }
}



function reset(){
  godMode = 0
  self_driving_cars = makeCars(1, road.getLaneCenter(laneCodes["lane 3"]), 0, standardWidth, standardHeight);

  car = new Car(road.getLaneCenter(laneCodes["lane 3"]), 0, standardWidth, standardHeight, "PLAYER", playerControl,20)
  car1 = new Car(road.getLaneCenter(laneCodes["lane 3"]), 0, standardWidth, standardHeight, "PLAYER", playerControl, 14)
  car2 = new Car(road.getLaneCenter(laneCodes["lane 3"]), 0, standardWidth, standardHeight, "PLAYER", playerControl, 13)

  playerCars = [car,car1,car2]
  let lane_start = 2;
  let lane_factor = 3;

  let lanePattern = [
    [1, 0],
    [2, 4, 1],
    [0, 3],
    [1, 2],
    [4, 2],
    [1, 4],
    [3, 1],
    [1, 0],
    [1, 2],
    [1, 3],
    [2, 4],
    [2, 3],
    [1, 3]
  ];

  traffic = makeTraffic(lanePattern,lane_start,lane_factor);

  bestCar = self_driving_cars.find(c => c.y == Math.min(...self_driving_cars.map(c => c.y)));
    // bestCar = self_driving_cars[0]
    if (localStorage.getItem("myNeuralNetData")) {
      let brainData = JSON.parse(localStorage.getItem("myNeuralNetData"));
      for (let i = 0; i < self_driving_cars.length; i++) {
        self_driving_cars[i].brain = JSON.parse(JSON.stringify(brainData));
        if (i !== 0) {
          Network.mutate(self_driving_cars[i].brain,0.2);
        }// end of if
      }// end of for
    }// end of if

}