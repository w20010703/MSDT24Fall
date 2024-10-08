// This is used to aggregrate visual information from all objects before we display them. 
// First we populate display and then we show it to user.
// This is particularly helpful once you start outputting your game to an LED strip, of if you want to have two separate 'screens'


class Display {

    constructor(_displaySize, _pixelSize, _initColor) {
  
      this.displaySize = _displaySize;
      this.pixelSize = _pixelSize;
      this.initColor = _initColor;      // black color
  
    }

    displayTarget(_tval) {
        noStroke();
        fill(color(RED_COLOR[0]));
        circle(parseInt(_tval*this.pixelSize + this.pixelSize / 2), parseInt(this.pixelSize * floorWidth / 2), pixelSize*6)

        fill(color(INIT_FLOOR_COLOR));           // white ring
        circle(parseInt(_tval*this.pixelSize + this.pixelSize / 2), parseInt(this.pixelSize * floorWidth / 2), pixelSize*4)

        fill(color(BLUE_COLOR[0]));
        circle(parseInt(_tval*this.pixelSize + this.pixelSize / 2), parseInt(this.pixelSize * floorWidth / 2), pixelSize*3)

        fill(color(INIT_FLOOR_COLOR));           // white circle
        circle(parseInt(_tval*this.pixelSize + this.pixelSize / 2), parseInt(this.pixelSize * floorWidth / 2), pixelSize)
    }

    displayStone(_tval, _color) {
        
        for (var i = _tval; i < _tval + 1; i++ ) {
          noStroke();
          fill(_color);
          circle(parseInt(_tval + this.pixelSize / 2), parseInt(this.pixelSize * floorWidth / 2), pixelSize)
        }
    }

    displayCurrentTarget(_tval) {
      noStroke();
      fill(255, 205, 108, 255);
      circle(parseInt(_tval + this.pixelSize / 2), parseInt(this.pixelSize * floorWidth / 2), pixelSize)
    }

    setCountFloor(_tval) {
      // background(255, 255, 255);
      noStroke();
      fill(255, 205, 108, 100);
      rect(0, parseInt(this.pixelSize * floorWidth / 2 - this.pixelSize / 2), _tval, pixelSize);
      
    }

    setFloor(_tval) {
      // background(255, 255, 255);
      noStroke();
      fill(255, 205, 108, FLOOR_COLOR_NUM);
      rect(0, parseInt(this.pixelSize * floorWidth / 2 - this.pixelSize / 2), (_tval + this.pixelSize / 2), pixelSize);
      
    }

    displayLose() {
      noStroke();
      fill(60, 60, 60, 100);
      rect(0, 0, (displaySize*pixelSize), pixelSize * floorWidth);
    }

    displayWord(_w) {
      textFont('Courier New');
      fill(0, 0, 0);
      textSize(20);
      text(_w, 100, parseInt(this.pixelSize * floorWidth / 2 + 10));
      
    }


    // Now write it to screen
    // This is the only function in the entire software that writes something directly to the screen. I recommend you keep it this way.
    init() {
      background(INIT_FLOOR_COLOR);
      this.displayTarget(TARGET_POS);
      this.displayStone(CStone.position, CStone.playerColor)
      
    }


    
    // Let's empty the display before we start adding things to it again
    clear() {
    }
    

  }