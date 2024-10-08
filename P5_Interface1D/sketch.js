/* /////////////////////////////////////

  DESIGN 6397: Design for Physical Interaction
  February 9, 2024
  Marcelo Coelho

*/ /////////////////////////////////////


let displaySize = 30;   // how many pixels are visible in the game
let pixelSize = 30;     // how big each 'pixel' looks on screen
let floorWidth = 6;

let CStone;
let CBroom;
let target;       // and one target for players to catch.

let STONE_POS = 1;
let STONE_COLOR = [250, 208, 34];
let TARGET_POS = 25;
// let TARGET_COLOR = [38, 41, 77];
let INIT_FLOOR_COLOR = [253, 241, 240];
let RED_COLOR = [[245, 146, 193], [255, 122, 154]];
let BLUE_COLOR = [[157, 174, 234], [157, 174, 234]]
let FLOOR_COLOR_NUM = 255;
let DATA;

let display;      // Aggregates our final visual output before showing it on the screen

let SerialCtrl1;
let SerialCtrl2;
let SerialCtrl3;

let controller;   // This is where the state machine and game logic lives

let collisionAnimation;   // Where we store and manage the collision animation

let score;        // Where we keep track of score and winner

  
function setup() {

  createCanvas((displaySize*pixelSize), pixelSize*floorWidth);     // dynamically sets canvas size

  display = new Display(displaySize, pixelSize, null);        //Initializing the display
  
  CStone = new Stone(color(STONE_COLOR), (STONE_POS*pixelSize), (displaySize*pixelSize));
  CBroom = new Broom();

  SerialCtrl1 = new SerialController('/dev/tty.usbmodemHIDPC1')
  // SerialCtrl1 = new SerialController('/dev/tty.usbmodem4')
  SerialCtrl1.init_controller()

  SerialCtrl2 = new SerialController('/dev/tty.usbmodem3')
  // SerialCtrl2 = new SerialController('/dev/tty.usbmodemHIDPC1')
  SerialCtrl2.init_controller()

  SerialCtrl3 = new p5.SerialPort();
  SerialCtrl3.open('/dev/tty.usbmodem2101');  // Replace with your own serial port

  // Optional: Callback for when the serial port is opened
  SerialCtrl3.on('open', () => {
    console.log('Serial Port Open');
  });

  controller = new Controller();            // Initializing controller

  

}

function draw() {

  // start with a blank screen
  // Runs state machine at determined framerate
  controller.update();


}







