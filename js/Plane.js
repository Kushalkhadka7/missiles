const PLANE_ORIGIN = new Vector2(30, 30);

let indexOfPlane = 0;

class Plane {

    constructor() {
        this.position = new Vector2(200, 300);
        this.pointPosition = new Vector2(200, 300);
        this.dimension = new Vector2(60, 60);
        this.pointDimension = new Vector2(5, 5);
        this.rotation = 0;
        this.radius = 20;
        this.initialX = 170;
        this.initialY = 300;
    }

    draw() {

        if (shield) {
            this.drawShield();
        }
        // Canvas.context.fillRect(this.position.x, this.position.y, 60, 60);
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
