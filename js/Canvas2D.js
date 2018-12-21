/**
 * access the HTML5 canvas element
 * access the context of the canvas
 * @class Canvas2D
 */
class Canvas2D {

    constructor() {
        this.canvas = document.getElementById('screen');
        this.context = this.canvas.getContext('2d', { alpha: false });
    }


    /**
     * clear the canvas
     * @param {*} x = x coordinate from where the clearing starts
     * @param {*} y= y coordinate from where the clearing starts
     * @param {*} height=height of the area to be clear
     * @param {*} width=width of the area to be clear
     * @memberof Canvas2D
     */
    clear(x, y, height, width) {

        this.context.clearRect(x, y, width, height);
    }


    /**
     * draw sprites on canvas
     * detects the given position is undefined or not
     * @param {*} image=src of image to be drawn
     * @param {*} position=positon where to draw the image
     * @param {*} dimension=width and height of the image
     * @memberof Canvas2D
     */
    drawSprites(image, position, dimension) {

        position == undefined ? position = new Vector2() : position;

        this.context.drawImage(image, position.x, position.y, dimension.x, dimension.y);

    }


    /**
     * draw sprites on canvas
     * detects the given position is undefined or not
     * translates the canvas on the given points
     * draws the image on given origin
     * detects either the position and origin are undefined if undefined resets them to 0
     * @param {*} image= src of image to be drawn on canvas
     * @param {*} position=coordinates to translate the current origin of canvas to the given point
     * @param {*} dimension=width and height of the image
     * @param {*} origin=positon where to draw the image
     * @param {number} [rotation=0]=angle in radians by which the canvas image is roatated
     * @memberof Canvas2D
     */
    drawImagePlane(image, position, dimension, origin, rotation = 0) {

        position == undefined ? position = new Vector2() : position;

        origin == undefined ? origin = new Vector2() : origin

        this.context.save();
        this.context.translate(position.x, position.y);
        this.context.rotate(rotation);
        this.context.drawImage(image, -origin.x, -origin.y, dimension.x, dimension.y);
        this.context.restore();
    }

    drawPointOnPlane(position, dimension, origin, rotation = 0) {

        position == undefined ? position = new Vector2() : position;

        origin == undefined ? origin = new Vector2() : origin

        this.context.save();
        this.context.translate(position.x, position.y);
        this.context.rotate(rotation);
        this.context.fillRect(origin.x, origin.y, dimension.x, dimension.y);
        this.context.restore();
    }
}

let Canvas = new Canvas2D();
