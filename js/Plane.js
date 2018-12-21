const PLANE_ORIGIN = new Vector2(30, 30);
const POINT_ORIGIN = new Vector2(-25, -3);
let indexOfImage = 0;

class Plane {

    constructor() {
        console.log(indexOfImage);
        this.position = new Vector2(200, 300);
        this.pointPosition = new Vector2(200, 300);
        this.dimension = new Vector2(60, 60);
        this.pointDimension = new Vector2(5, 5);
        this.rotation = 0;
        this.radius = 20;
    }

    draw() {

        if (shield) {
            this.drawShield();
        }
        // Canvas.context.fillRect(this.position.x, this.position.y, 60, 60);
        Canvas.drawImagePlane(sprites.plane[0], this.position, this.dimension, PLANE_ORIGIN, this.rotation);
        this.referencePoint();
    }

    referencePoint() {
        Canvas.drawPointOnPlane(this.pointPosition, this.pointDimension, POINT_ORIGIN, this.rotation);
    }

    referencePointRotation() {
        Mouse.position == undefined ? Mouse.position = new Vector2() : Mouse.position;

        let opposite = Mouse.position.y - this.position.y;

        let adajcent = (Mouse.position.x - this.position.x);

        this.rotation = Math.atan2(opposite, adajcent);
    }

    update() {

        Mouse.position == undefined ? Mouse.position = new Vector2() : Mouse.position;

        let opposite = Mouse.position.y - this.position.y;

        let adajcent = (Mouse.position.x - this.position.x);

        this.rotation = Math.atan2(opposite, adajcent);

    }

    drawShield() {
        Canvas.context.beginPath();
        Canvas.context.lineWidth = 2;
        Canvas.context.strokeStyle = 'red';
        Canvas.context.arc(this.position.x, this.position.y, this.radius + 5, 0, 2 * Math.PI);
        Canvas.context.lineCap = 'round';
        Canvas.context.stroke();
    }

}

let plane = new Plane();
