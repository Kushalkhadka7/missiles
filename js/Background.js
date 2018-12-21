/**
 * game background
 * this.velocity = velocity by which the background is movieng
 * this.position = points where the background to be drawn
 * this.backgroundDimensions = widht and height of the background image
 * this.x and this.y are vectors
 * @class Background
 */
class Background {

    constructor() {
        this.x;
        this.y;
        this.velocity = 3;
        this.position = new Vector2(-300, -300);
        this.backgroundDimensions = new Vector2(2000, 2000);
    }

    /**
     * draw background
     * call to the canvas2D method drawSprites
     * sprites.background = src of the background image
     * this.position = position of the background image
     * this.dimension= width and height of the background image
     * @memberof Background
     */
    draw() {
        Canvas.drawSprites(sprites.background, this.position, this.backgroundDimensions);
    }

    /**
     * update the background image actions
     * calculates the vector between the angel of rotation of plane
     * moves the background opposite to the direciton of plane heading
     * swaps the backgorund when it ends
     * updates the background positon
     * @param {*} planeRotation=angle by which the plane is rotating
     * @memberof Background
     */
    update(planeRotation) {

        this.y = Math.sin(planeRotation);
        this.x = Math.cos(planeRotation);

        this.position.x -= this.x * this.velocity;
        this.position.y -= this.y * this.velocity;

        if (this.position.x > -200) { this.position.x = -1500; }
        if (this.position.x < -1500) { this.position.x = -300; }
        if (this.position.y > -200) { this.position.y = -1500; }
        if (this.position.y < -1500) { this.position.y = -300; }
    }
}

let background = new Background();
