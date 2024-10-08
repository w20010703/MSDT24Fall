
// This holds some player information, like color and position.
// It also has some player methods for managing how a player moves.

class Stone {
    constructor(_color, _position, _displaySize, _time) {
        this.playerColor = _color ? _color : color(255, 0, 0);
        this.position = _position ? _position : 0;
        this.displaySize = _displaySize ? _displaySize : 30;
        this.time = _time ? _time : 0;

        this.weight = 19.96; // kg
        
    }

    init_pos(_pos) {
        this.position = _pos ? _pos : this.position;
    }

    // Move player based on keyboard input
    move(_direction) {
        // increments or decrements player position
        this.position = this.position + _direction;
      
        // if player hits the edge of display, loop around
        if (this.position == -1) {
            this.position = this.displaySize - 1;
        } else if (this.position == this.displaySize) {
            this.position = 0;
        } 
         
    } 
}

class Broom {
    constructor(_color, _ColorPosition, _displayColor) {
        this.playerColor = _color ? _color : color(255, 0, 0);
        this.position = _ColorPosition ? _ColorPosition : 0;
        this.displayColor = _displayColor ? _displayColor : color(179,245,255);
    }
}




