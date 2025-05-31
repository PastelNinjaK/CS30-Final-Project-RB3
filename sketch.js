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
let data = {
  levels: [
    {
      inputs: [0.47676978504718615, 0, 0, 0, 0],
      outputs: [1, 0, 0, 1, 0, 1],
      biases: [-0.23837212351574127, -0.06533658736098624, 0.2510259584019449, -0.24276764635288842, -0.05342723535597359, -0.2272349937672982],
      weights: [
        [-0.401323061224962, -0.1419301664485476, -0.11652156960070544, 0.03420847319214124, -0.153267582887417, 0.2572577190101276],
        [-0.05976265084686257, -0.42876969611458615, 0.05132907370112476, 0.2430168927442673, -0.11629831624883669, 0.02665092627697592],
        [0.16076742546135384, -0.3047117117046432, 0.030075383555475885, -0.12043987562043092, 0.005976969728810483, 0.0632712624552218],
        [0.05661219644998848, -0.1341843765917517, 0.1314264171643511, -0.34498052014966474, -0.1473658203235546, 0.23719259684458982],
        [-0.03975312163986444, 0.185050151252877, 0.027268135608227773, -0.2484539624905599, 0.11257368547512604, -0.01981469351038388]
      ]
    },
    {
      inputs: [1, 0, 0, 1, 0, 1],
      outputs: [1, 0, 0, 0],
      biases: [-0.29121950675815045, -0.0896170183121094, 0.06158033334179522, 0.18429833893517886],
      weights: [
        [0.3014857883793844, -0.30711490910025024, -0.01765242541649123, -0.2737644451916729],
        [-0.026508787516313387, 0.08133960945291752, 0.2187127404652729, 0.028546095922321657],
        [-0.037167256883843036, 0.3384873446464215, 0.13260528913633357, 0.0501897205819752],
        [0.05290085777845077, 0.2287742979630921, -0.40016858967111524, -0.12928188295459342],
        [0.12289681378689342, -0.4310079064224802, -0.023436544225730938, -0.02905174212483324],
        [-0.007225524139840622, -0.26895940493344084, 0.26249468514482965, 0.23067572203091855]
      ]
    }
  ]
};


function preload() {
  title_pic = loadImage("images/title_image.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // localStorage.clear()
  // localStorage.setItem("myNeuralNetData", JSON.stringify(data));

  let roadX = windowWidth / 2;
  let roadWidth = windowWidth * 0.9;
  let proportionalWidth = windowWidth * 0.05;
  let proportionalLength = windowWidth * 0.1;

  road = new Road(roadX, roadWidth);
  scoreboard = new Scoreboard(windowWidth * 0.8, windowHeight * 0.3, windowWidth * 0.4, windowHeight * 0.1);

  let num = 200;
  self_driving_cars = makeCars(num, road.getLaneCenter(laneCodes["lane 3"]), 0, proportionalWidth, proportionalLength);

  let lane_start = 2;
  let lane_factor = 3;

  traffic = [
    // Multiple layers of traffic cars for training AI
    // new Car(road.getLaneCenter(laneCodes[laneNames[3]]), -self_driving_cars[0].y - proportionalLength * lane_start, proportionalWidth, proportionalLength, "TRAFFIC"),
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
    new Car(road.getLaneCenter(laneCodes[laneNames[4]]), -self_driving_cars[0].y - proportionalLength * (lane_start + 5 * lane_factor), proportionalWidth, proportionalLength, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[4]]), -self_driving_cars[0].y - proportionalLength * (lane_start + 6 * lane_factor), proportionalWidth, proportionalLength, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[0]]), -self_driving_cars[0].y - proportionalLength * (lane_start + 6 * lane_factor), proportionalWidth, proportionalLength, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[3]]), -self_driving_cars[0].y - proportionalLength * (lane_start + 6 * lane_factor), proportionalWidth, proportionalLength, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[1]]), -self_driving_cars[0].y - proportionalLength * (lane_start + 7 * lane_factor), proportionalWidth, proportionalLength, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[3]]), -self_driving_cars[0].y - proportionalLength * (lane_start + 7 * lane_factor), proportionalWidth, proportionalLength, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[2]]), -self_driving_cars[0].y - proportionalLength * (lane_start + 8 * lane_factor), proportionalWidth, proportionalLength, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[1]]), -self_driving_cars[0].y - proportionalLength * (lane_start + 8 * lane_factor), proportionalWidth, proportionalLength, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[4]]), -self_driving_cars[0].y - proportionalLength * (lane_start + 9 * lane_factor), proportionalWidth, proportionalLength, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[0]]), -self_driving_cars[0].y - proportionalLength * (lane_start + 9 * lane_factor), proportionalWidth, proportionalLength, "TRAFFIC"),
    new Car(road.getLaneCenter(laneCodes[laneNames[1]]), -self_driving_cars[0].y - proportionalLength * (lane_start + 9 * lane_factor), proportionalWidth, proportionalLength, "TRAFFIC"),
    // new Car(road.getLaneCenter(laneCodes[laneNames[3]]), -self_driving_cars[0].y - proportionalLength * (lane_start + 10 * lane_factor), proportionalWidth, proportionalLength, "TRAFFIC"),

  ];

  bestCar = self_driving_cars.find(c => c.y == Math.min(...self_driving_cars.map(c => c.y)));
  // bestCar = self_driving_cars[0]
  if (localStorage.getItem("myNeuralNetData")) {
    let brainData = JSON.parse(localStorage.getItem("myNeuralNetData"));
    for (let i = 0; i < self_driving_cars.length; i++) {
      self_driving_cars[i].brain = JSON.parse(JSON.stringify(brainData));
      if (i !== 0) {
        Network.mutate(self_driving_cars[i].brain,0.2);
      }
    }
  }


}

function draw() {
  background(220);
  if (scenenum == 0){
    scene1();
  }
  if (scenenum == 1){
    scene3();
  }
  if (scenenum == 2) {
    endScreen()
  };
}

function keyPressed() {
  for (let i = 0; i < playerCars.length; i++) {
    playerCars[i].controls.handleKeyPress(key, true);
  }
  if (key === "o" || key === "O") {
    saveBestBrain();
  }
  if (key === "i" || key === "I") {
    discardBestBrain();
  }

  if(key == "p"){
    print(localStorage)
  }
}

function keyReleased() {
  for (let i = 0; i < playerCars.length; i++) {
    playerCars[i].controls.handleKeyPress(key, false);
  }
}

function saveBestBrain() {
  if (bestCar?.brain) {
    localStorage.setItem("myNeuralNetData", JSON.stringify(bestCar.brain));
    print("Best brain manually saved!");
  }
}

function discardBestBrain() {
  localStorage.clear()
  print("Best brain discarded.");
}

function makeCars(num, x, y, w, h) {
  let car_arr = [];
  for (let i = 0; i < num; i++) {
    car_arr.push(new Car(x, y, w, h, "AI", 8));
  }
  return car_arr;
}