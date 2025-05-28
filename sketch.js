let car;
let road;
let scoreboard;
let laneCodes = {
  "lane 1": -2.75,
  "lane 2": -2.275,
  "lane 3": -1.75,
  "lane 4": -1.25,
  "lane 5": -0.75
};
let laneNames = Object.keys(laneCodes);
let scenenum = 0;
let godMode = 0;
let title_pic;
let playerCars = [];
let traffic = [];
let self_driving_cars = [];
let bestCar;

// Autosave best brain on window close
window.onbeforeunload = () => {
  try {
    if (bestCar?.brain) {
      localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
      print("Best brain autosaved.");
    }
  } catch (e) {
    console.warn("Failed to autosave brain:", e);
  }
};

function preload() {
  title_pic = loadImage("images/title_image.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  let roadX = windowWidth / 2;
  let roadWidth = windowWidth * 0.9;
  let proportionalWidth = windowWidth * 0.05;
  let proportionalLength = windowWidth * 0.1;

  road = new Road(roadX, roadWidth);
  scoreboard = new Scoreboard(windowWidth * 0.8, windowHeight * 0.3, windowWidth * 0.4, windowHeight * 0.1);

  let num = 1;
  self_driving_cars = makeCars(num, road.getLaneCenter(laneCodes["lane 3"]), 0, proportionalWidth, proportionalLength);

  let lane_start = 2;
  let lane_factor = 3;

  traffic = [
    // Multiple layers of traffic cars
    new Car(road.getLaneCenter(laneCodes[laneNames[1]]), -self_driving_cars[0].y - proportionalLength * lane_start, proportionalWidth, proportionalLength, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[0]]), -self_driving_cars[0].y - proportionalLength * lane_start, proportionalWidth, proportionalLength, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[2]]), -self_driving_cars[0].y - proportionalLength * (lane_start + lane_factor), proportionalWidth, proportionalLength, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[4]]), -self_driving_cars[0].y - proportionalLength * (lane_start + lane_factor), proportionalWidth, proportionalLength, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[1]]), -self_driving_cars[0].y - proportionalLength * (lane_start + lane_factor), proportionalWidth, proportionalLength, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[0]]), -self_driving_cars[0].y - proportionalLength * (lane_start + 2 * lane_factor), proportionalWidth, proportionalLength, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[3]]), -self_driving_cars[0].y - proportionalLength * (lane_start + 2 * lane_factor), proportionalWidth, proportionalLength, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[1]]), -self_driving_cars[0].y - proportionalLength * (lane_start + 2 * lane_factor), proportionalWidth, proportionalLength, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[2]]), -self_driving_cars[0].y - proportionalLength * (lane_start + 3 * lane_factor), proportionalWidth, proportionalLength, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[4]]), -self_driving_cars[0].y - proportionalLength * (lane_start + 3 * lane_factor), proportionalWidth, proportionalLength, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[1]]), -self_driving_cars[0].y - proportionalLength * (lane_start + 3 * lane_factor), proportionalWidth, proportionalLength, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[3]]), -self_driving_cars[0].y - proportionalLength * (lane_start + 4 * lane_factor), proportionalWidth, proportionalLength, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[4]]), -self_driving_cars[0].y - proportionalLength * (lane_start + 4 * lane_factor), proportionalWidth, proportionalLength, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[0]]), -self_driving_cars[0].y - proportionalLength * (lane_start + 4 * lane_factor), proportionalWidth, proportionalLength, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[1]]), -self_driving_cars[0].y - proportionalLength * (lane_start + 5 * lane_factor), proportionalWidth, proportionalLength, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[2]]), -self_driving_cars[0].y - proportionalLength * (lane_start + 5 * lane_factor), proportionalWidth, proportionalLength, "TRAFFIC"),


  ];

  
  bestCar = self_driving_cars[0]
  if (localStorage.getItem("bestBrain")) {
    const brainData = JSON.parse(localStorage.getItem("bestBrain"));
    for (let i = 0; i < self_driving_cars.length; i++) {
      self_driving_cars[i].brain = JSON.parse(JSON.stringify(brainData));
      if (i !== 0) {
        Network.mutate(self_driving_cars[i].brain,0.2);
      }
    }
  }

  // bestCar = self_driving_cars.find(c => c.y == Math.min(...self_driving_cars.map(c => c.y)));

}

function draw() {
  background(220);
  if (scenenum == 0) scene1();
  if (scenenum == 1) scene3();
  if (scenenum == 2) endScreen();
}

function keyPressed() {
  for (let i = 0; i < playerCars.length; i++) {
    playerCars[i].controls.handleKeyPress(key, true);
  }
  if (key === "s" || key === "S") {
    saveBestBrain();
  }
  if (key === "d" || key === "D") {
    discardBestBrain();
  }
}

function keyReleased() {
  for (let i = 0; i < playerCars.length; i++) {
    playerCars[i].controls.handleKeyPress(key, false);
  }
}

function saveBestBrain() {
  if (bestCar?.brain) {
    localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
    print("Best brain manually saved!");
  }
}

function discardBestBrain() {
  localStorage.removeItem("bestBrain");
  print("Best brain discarded.");
}

function makeCars(num, x, y, w, h) {
  let car_arr = [];
  for (let i = 0; i < num; i++) {
    car_arr.push(new Car(x, y, w, h, "AI", 8));
  }
  return car_arr;
}
