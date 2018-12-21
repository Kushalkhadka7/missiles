const PLANE_ORIGIN = new Vector2(30, 30);
let indexOfPlane = 0;

/**
 * plane class handles all the plane actions like plane rotation
 * this.radius = radius of the plane
 * this.rotation = angle in radians by wihch the plane rotates
 * this.dimension = width and height of the plane
 * this.position = x and y co-ordinates of the plane center
 * PLANE_ORIGIN = co-ordinates where the plane is drawn
 * indexOfPlane = global varibale that holds the value to choose between planes selection
 * @class Plane
 */
class Plane {

    constructor() {
        this.radius = 20;
        this.rotation = 0;
        this.initialX = 170;
        this.initialY = 300;
        this.dimension = new Vector2(60, 60);
        this.position = new Vector2(200, 300);
    }

    /**
     * draw plane on canvas using draw method of canvas class
     * checks either shield is activated or not
     * if shield is activated calls drawShield method to draw shield on plane
     * choose the plane image based on the plane index in planes array
     * draws the plane on given orign
     * @memberof Plane
     */
    draw() {

        if (shieldCollected) {
            this.drawShieldOnPlane();
        }

        Canvas.drawImagePlane(sprites.plane[indexOfPlane], this.position, this.dimension, PLANE_ORIGIN, this.rotation);
    }

    // referencePoint() {

    //     Canvas.drawPointOnPlane(this.pointPosition, this.pointDimension, POINT_ORIGIN, this.rotation);
    // }

    // referencePointRotation() {
    //     Mouse.position == undefined ? Mouse.position = new Vector2() : Mouse.position;

    //     let opposite = Mouse.position.y - this.pointPosition.y;

    //     let adajcent = (Mouse.position.x - this.pointPosition.x);

    //     this.rotation = Math.atan2(opposite, adajcent);
    //     var initialX = this.pointPosition.x + 30 + Math.cos(this.rotation);
    //     var initialY = this.pointPosition.y + 30 + Math.cos(this.rotation);
    //     console.log(initialX, initialY);
    //     Canvas.context.fillStyle = 'green';
    //     Canvas.context.fillRect(initialX, initialY, 100, 100);

    // }

    /**
     * handles plane actions like rotation
     * checks the mouse postion if undefined initialize it to (0,0)
     * measure the vector between mouse position and plane position
     * calculates the plane rotation using the vector
     * updates the plane rotation based on the mouse movement
     * offset = postion from the origin(0,0) to plane retrived from canvas object
     * @memberof Plane
     */
    update() {

        Mouse.position == undefined ? Mouse.position = new Vector2() : Mouse.position;

        let offset = Canvas.canvas.getBoundingClientRect();

        let opposite = Mouse.position.y - this.position.y;

        let adajcent = Mouse.position.x - this.position.x;

        this.rotation = Math.atan2(opposite, adajcent);

        // this.initialX = this.position.x + Math.cos(this.rotation) * 10 + 30;
        // this.initialY = this.position.y + Math.sin(this.rotation) * 10 + 15;

        // console.log(this.initialX, this.initialY)

        // Canvas.context.fillRect(this.initialX, this.initialY, 10, 10);
    }

    /**
     * draw the shield outside of the plane on canvas when shield is activated
     * INCREASE_RADIUS_FACTOR = increase the plane radius by the given value
     * BEGIN_ANGLE= starting value of angle form where to draw the arc (usually 0)
     * FINISN_ANGLE= final value of angle  to draw the arc (usually 360)
     * SHIELD_WIDTH = width of the shield drawn on the plane
     * @memberof Plane
     */
    drawShieldOnPlane() {

        const INCREASE_RADIUS_FACTOR = 5;
        const BEGIN_ANGLE = 0;
        const FINISN_ANGLE = 2 * Math.PI;
        const SHIELD_WIDTH = 2;

        Canvas.context.beginPath();
        Canvas.context.lineWidth = SHIELD_WIDTH;
        Canvas.context.strokeStyle = 'red';
        Canvas.context.arc(
            this.position.x,
            this.position.y,
            this.radius + INCREASE_RADIUS_FACTOR,
            BEGIN_ANGLE, FINISN_ANGLE
        );
        Canvas.context.lineCap = 'round';
        Canvas.context.stroke();
    }

}

let plane = new Plane();
