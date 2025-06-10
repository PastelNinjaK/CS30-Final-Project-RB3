let car1;
let car2;
let whichCar = 0;
let car;
let road;
let scoreboard;
let laneCodes = {
  "lane 1": -2.75,
  "lane 2": -2.25,
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
let lane_start = 2;
let lane_factor = 3;
let data = {
  levels: [
    {
      inputs: [0.00459787625056618, 0, 0, 0, 0, 0, 0],
      outputs: [0, 0, 0, 1, 0, 0],
      biases: [
        0.08701274297286804,
        0.1839294871514057,
        0.1053360018042766,
        -0.33300873410014065,
        0.34152476444956503,
        0.5214421413034582
      ],
      weights: [
        [0.6050729709716063, -0.6020080360165081, 0.06049732244962151, -0.27357102995336013, 0.3408769460225718, 0.6454503457584174],
        [-0.1726870510772922, -0.11602901082679351, 0.14934689037527335, -0.3207812522352523, 0.6224756067043985, 0.34584700051216355],
        [0.7662474617209827, -0.007921985021234076, 0.05810461695466823, -0.02673399967373688, -0.16322127698659958, 0.5437774663744899],
        [-0.7809362338219022, 0.4165293177217039, -0.49137337089694355, -0.4321348299975531, 0.4061380330486727, -0.036288307532996965],
        [0.6121199671503269, 0.4332943719385385, -0.32817852918857604, 0.07128532153982842, -0.3620147057010532, 0.06556208343212186],
        [0.36793958490246637, 0.5351336195152258, -0.4884274636685654, -0.6805276790629362, -0.444527292157009, 0.24143439520137128],
        [0.22388066830065378, 0.7412720393875544, -0.360888305883136, -0.4124979000718876, 0.4225995864982319, 0.5264242179006944]
      ]
    },
    {
      inputs: [0, 0, 0, 1, 0, 0],
      outputs: [1, 1, 1, 0],
      biases: [
        -0.399984653606494,
        -0.10975398787906901,
        -0.09128738277038466,
        -0.45385078161068726
      ],
      weights: [
        [0.5331837003635429, 0.130824561004058, 0.5207197813550584, -0.6420035405575397],
        [0.28229354385395017, -0.537980974706319, 0.0464767392844076, -0.6336384414481165],
        [-0.6384700433012536, -0.4215799006986302, -0.24686051842840703, 0.5506888719281681],
        [0.3750290698128673, 0.16887417323585505, -0.007604260445100763, -0.7765168807931405],
        [0.3682063968858864, 0.2679973443686595, -0.3074004845379103, 0.4414477722404455],
        [-0.4579145939194848, 0.11803009982197807, -0.3842388205194824, -0.4687829895052246]
      ]
    }
  ]
};// Car brain for AI

let score = 0;
let standardWidth;
let standardHeight;
let gray_car_pic;
let blue_car_pic;
let red_car_pic;
let black_car_pic;
let green_car_pic;
let yellow_car_pic;
let white_car_pic;
let orange_car_pic;
let purple_car_pic;
let startUp_pic;

let scene2_pic;

let car_pics;
let color_names;
let hasGodMode;
let playerControl = 1;
let pause_img;
let play_img;
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


function preload() {
  // title_pic = loadImage("images/title_image.png");
  startUp_pic = loadImage("images/startUp.png")
  scene2_pic = loadImage("images/scene2.png")
  pause_img = loadImage("images/pause.png");
  play_img = loadImage("images/play.png");
  gray_car_pic = loadImage("images/gray_car.png");
  blue_car_pic = loadImage("images/blue_car.png");
  red_car_pic = loadImage("images/red_car.png");
  black_car_pic = loadImage("images/black_car.png");
  green_car_pic = loadImage("images/green_car.png");
  orange_car_pic = loadImage("images/orange_car.png");
  purple_car_pic = loadImage("images/purple_car.png");
  white_car_pic = loadImage("images/white_car.png");
  yellow_car_pic = loadImage("images/yellow_car.png");
  color_names = ['blue','red','gray','yellow','purple','white','green','orange','black']
  
  car_pics = [
    blue_car_pic,
    red_car_pic,
    gray_car_pic,
    black_car_pic,
    green_car_pic,
    orange_car_pic,
    purple_car_pic,
    white_car_pic,
    yellow_car_pic
  ]
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  localStorage.setItem("myNeuralNetData", JSON.stringify(data));

  let roadX = windowWidth / 2;
  let roadWidth = windowWidth * 0.9;
  let proportionalWidth = windowWidth * 0.05;
  let proportionalLength = windowWidth * 0.1;
  standardWidth = proportionalWidth
  standardHeight = proportionalLength
  road = new Road(roadX, roadWidth);
  scoreboard = new Scoreboard(windowWidth * 0.8, windowHeight * 0.3, windowWidth * 0.4, windowHeight * 0.1);

  let num = 1;
  self_driving_cars = makeCars(num, road.getLaneCenter(laneCodes["lane 3"]), 0, proportionalWidth, proportionalLength);
  car = new Car(road.getLaneCenter(laneCodes["lane 3"]), 0, proportionalWidth, proportionalLength, "PLAYER",playerControl, 14)
  car1 = new Car(road.getLaneCenter(laneCodes["lane 3"]), 0, proportionalWidth, proportionalLength, "PLAYER",playerControl, 14)
  car2 = new Car(road.getLaneCenter(laneCodes["lane 3"]), 0, proportionalWidth, proportionalLength, "PLAYER",playerControl, 13)




  traffic = makeTraffic(lanePattern,lane_start,lane_factor);


  playerCars = [car,car1,car2]

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


}// end of setup

function draw() {
  background(220);

  if (scenenum == 0){
    startingScreen();
  }// end of if
  if (scenenum == 1){
    carSelection();
  }// end of if
  if (scenenum == 2){
    background(0,140,0)
    mainGame();
  }// end of if
  if (scenenum == 3) {
    endScreen();
    reset();
  }// end of if
  if(scenenum == 4){
    instructions();
  }// end of if
  if(scenenum == 5){
    AiInstructions();
  }// end of if
    // carSelection();



}// end of draw






