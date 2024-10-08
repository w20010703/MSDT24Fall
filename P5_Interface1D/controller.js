
// This is where your state machines and game logic lives

class SerialController {
    constructor(_pName) {
        this.serial = null;
        this.portName = _pName;
        this.data = 0;
        this.lastData = 0;
        this.P1Flag = false;

        this.gotData = this.gotData.bind(this);
    }

    init_controller() {
        this.serial = new p5.SerialPort();
        this.serial.list();
        this.serial.open(this.portName);
        this.serial.on('connected', this.serverConnected);
        this.serial.on('list', this.gotList);
        this.serial.on('data', this.gotData);
        this.serial.on('error', this.gotError);
        this.serial.on('open', this.gotOpen);
        this.serial.on('close', this.gotClose);
    }

    clear_data() {
        this.data = 0;
        this.lastData = 0;
        this.P1Flag = false;
    }

    serverConnected() {
        print("Connected to Server");
    }

    gotList(thelist) {
        print("List of Serial Ports:");

        for (let i = 0; i < thelist.length; i++) {
            print(i + " " + thelist[i]);
        }
    }

    gotOpen() {
        print("Serial Port is Open");
    }

    gotClose(){
        print("Serial Port is Closed");
        DATA = "Serial Port is Closed";
    }

    gotError(theerror) {
        print(theerror);
    }

    gotData() {
        // console.log("test gotData")
        let currentString = this.serial.readLine();
        trim(currentString);
        if (!currentString) return;
        // this.P1Flag = (parseInt(this.data) - parseInt(currentString)) > 100;
        this.data = parseInt(currentString) > parseInt(this.data) ? parseInt(currentString) : parseInt(this.data);
        this.lastData = parseInt(currentString);
        
    }
}

class Controller {

    // This is the state we start with.
    constructor() {
        this.init_ctrl()
    }

    init_ctrl() {
        this.gameState = "PLAY";
        this.p1InitStep = 0;
        this.p1Step = 0;
        this.gameStartFlag = true;
        this.startTime = 0;
        this.delay = 0;
        this.speed = 5;
        this.p2count = 0;
        this.p2countFlag = true;
        this.currentTargetFlag = true;
        this.floor_c_count = 0;
        this.countdownpixel = displaySize * pixelSize;
        this.bonus = 1;
        this.score = 0;
        this.losecountdown = displaySize * pixelSize;
        this.handlebonus()
        FLOOR_COLOR_NUM = 255;
        INIT_FLOOR_COLOR = [253*this.bonus, 241*this.bonus, 240];
        console.log("b: ", this.bonus)
        SerialCtrl1.clear_data();
        SerialCtrl2.clear_data();
        SerialCtrl3.write('F');
        SerialCtrl3.write('X');
        CStone.init_pos(STONE_POS*pixelSize);
    }

    handleValtoForce(_val) {
        var _estep = (1024 / displaySize);                     // val for each step
        this.p1Step = (parseInt((_val * this.bonus) / _estep) - 1) * pixelSize;
        this.p1InitStep = this.p1Step + pixelSize;
    }

    handleFloorColor() {
        var _estep = (255 / (displaySize * pixelSize));                      // val for each step
        FLOOR_COLOR_NUM = 255 - parseInt((this.p1InitStep) * (_estep + this.floor_c_count / 50));
    }

    handleLed() {
        // console.log(Math.abs(CStone.position - TARGET_POS))
        if (Math.abs(CStone.position / displaySize - TARGET_POS) > 2 && Math.abs(CStone.position / displaySize - TARGET_POS) <= 3) {
            this.score = 60
            SerialCtrl3.write('D');
        }

        if (Math.abs(CStone.position / displaySize - TARGET_POS) == 2) {
            this.score = 70
            SerialCtrl3.write('B');
        }

        if (Math.abs(CStone.position / displaySize - TARGET_POS) >= 1 && Math.abs(CStone.position / displaySize - TARGET_POS) < 2) {
            this.score = 80
            SerialCtrl3.write('C');
        }

        if (Math.abs(CStone.position / displaySize - TARGET_POS) == 0) {
            this.score = 100
            SerialCtrl3.write('A');
        }
    }

    handleLose() {
        console.log("1, 2: ", this.p1InitStep, (displaySize * pixelSize))
        this.gameState = this.p1InitStep >= (displaySize * pixelSize) ? "LOSE" : "GOSTONE";
    }

    handlebonus() {
        this.bonus = Math.random()
        if (this.bonus < 0.5) {
            this.bonus += 0.5
        }
    }
    
    // This is called from draw() in sketch.js with every frame
    update() {
        console.log(this.gameState)
        // STATE MACHINE ////////////////////////////////////////////////
        // This is where your game logic lives
        /////////////////////////////////////////////////////////////////
        switch(this.gameState) {

            // This is the main game state, where the playing actually happens
            case "PLAY":

                // clear screen at frame rate so we always start fresh      
                display.clear();
                display.init();

                // Blink 2 times to start the game
                SerialCtrl3.write('L');
                SerialCtrl3.write('L');
                SerialCtrl3.write('O');
                this.gameState = "BPLAY";

                break;
            case "BPLAY":
                this.gameState = (SerialCtrl1.lastData != 0) ? "STARTP1" : "BPLAY";
                break

            case "STARTP1":
                this.gameState = SerialCtrl1.P1Flag ? "GOSTONE" : "STARTP1";
                console.log("SerialCtrl1.lastData: ", SerialCtrl1.lastData)

                this.countdownpixel -= 30;
                display.init();
                display.setCountFloor(this.countdownpixel);

                if (this.countdownpixel == 0) {
                    SerialCtrl1.P1Flag = true;
                }


                if (SerialCtrl1.lastData > 1000) {
                    SerialCtrl3.write('5');
                    SerialCtrl3.write('4');
                    SerialCtrl3.write('3');
                    SerialCtrl3.write('2');
                    SerialCtrl3.write('1');
                }
                else if (SerialCtrl1.lastData > 800) {
                    SerialCtrl3.write('4');
                    SerialCtrl3.write('3');
                    SerialCtrl3.write('2');
                    SerialCtrl3.write('1');
                }
                else if (SerialCtrl1.lastData > 600) {
                    SerialCtrl3.write('3');
                    SerialCtrl3.write('2');
                    SerialCtrl3.write('1');
                }
                else if (SerialCtrl1.lastData > 400) {
                    SerialCtrl3.write('2');
                    SerialCtrl3.write('1');
                }
                else if (SerialCtrl1.lastData > 200) {
                    SerialCtrl3.write('1');
                }
                break;

            case "GOSTONE":
                // these are for stone
                if (this.gameStartFlag) {
                    SerialCtrl3.write('X');
                    SerialCtrl3.write('F');
                    this.startTime = Date.now();
                    this.gameStartFlag = false;
                    this.handleValtoForce(SerialCtrl1.data); 
                    this.handleFloorColor();
                }

                if (Date.now() - this.startTime > this.delay) {
                    this.startTime = Date.now();

                    if (this.p1Step > 0) {
                        CStone.move(this.speed);
                        this.p1Step -= this.speed;
                    }
                }
                

                // these are for broom
                if (SerialCtrl2.lastData > 500 && this.p2countFlag) {
                    this.p2countFlag = false;
                    this.p2count += 1;
                    if (this.p2count >= 3) {
                        // console.log("t: ", this.p2count, SerialCtrl2.lastData, this.p1Step)
                        this.p2count = 0;
                        this.p1Step += 1 * pixelSize;
                        this.p1InitStep += 1 * pixelSize;
                    }
                    this.floor_c_count += 0.1;
                    // console.log("fc: ", this.floor_c_count);
                    this.handleFloorColor();

                }
                if (SerialCtrl2.lastData < 500) {
                    this.p2countFlag = true;
                }

                // console.log("SerialCtrl2.lastData: ", SerialCtrl2.lastData)
                
                display.init();
                display.setFloor(CStone.position)
                if (this.currentTargetFlag) {
                    this.currentTargetFlag = false
                    display.displayCurrentTarget(this.p1InitStep)
                }
                else {
                    this.currentTargetFlag = true
                }
                display.displayStone(CStone.position, CStone.playerColor);

                // End Game
                if (this.p1Step <= 0) {
                    if (Math.abs(CStone.position / displaySize - TARGET_POS) > 3) {
                        this.gameState = "LOSE"
                    }
                    else {
                        this.gameState = "SCORE";
                        this.handleLed();
                    }
                }
                else {
                    this.handleLose()
                }
                console.log("this.p1Step: ", this.p1Step, this.p1Step <= 0)
                

                break;

            // Game is over. Show winner and clean everything up so we can start a new game.
            case "SCORE":      
                console.log("SCORE", this.score) 
                // display.displayWord("SCORE: " + this.score);
                this.gameState = "END";
                break;  
            case "LOSE":
                if (SerialCtrl1.lastData == 0) {
                    this.init_ctrl();
                }
                display.init();
                display.displayLose(this.losecountdown);
                break
            case "END":
                if (SerialCtrl1.lastData == 0) {
                    this.init_ctrl();
                }
                break

            // Not used, it's here just for code compliance
            default:
                break;
        }
    }
}



function getInitForce(_timer) {
    // return (1100 - (sin(_timer / 50) * _timer ^ 2 / 10)) / 2
    return 50
}

function setFraction(_timer, _w) {
    return _timer * 1.1
}


function setFloorColor(_step, _color, _pos) {
    var _s = (255 / TARGET_POS) * int(_step / 6)
    // console.log("floor: ", _color)
    _color = _step < 0 ? 255 : parseInt(_color + _s);
    console.log("floor: ", _color)
    return _color
}










