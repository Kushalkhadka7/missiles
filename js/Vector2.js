/**
*   this class takes two numbers
*   returns the numbers as object
*   if the given numbers are undefined returns default value 0
*   used for the initiation of position,dimensions
*   @class Vector2
*/
class Vector2 {

    constructor(x = 0, y = 0) {

        this.x = typeof x !== undefined ? x : 0;
        this.y = typeof y !== undefined ? y : 0;
    }
}
