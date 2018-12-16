const PLANE_ORIGIN = new Vector2(30, 30);

class Plane {

    constructor() {

        this.position = new Vector2(200, 300);
        this.dimension = new Vector2(60, 60);
        this.rotation = 0;
        this.radius = 20;
    }

    draw() {

        Canvas.drawImagePlane(sprites.plane, this.position, this.dimension, PLANE_ORIGIN, this.rotation)
    }

    update() {

        Mouse.position == undefined ? Mouse.position = new Vector2() : Mouse.position;

        let opposite = Mouse.position.y - this.position.y;

        let adajcent = (Mouse.position.x - this.position.x);

        this.rotation = Math.atan2(opposite, adajcent);

    }

}

let plane = new Plane();