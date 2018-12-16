const MISSILE_ORIGIN = new Vector2(7.5, 10);
let VELOCITY = 0.01;
const FLAG = 10;

class Missiles {

    constructor() {
        this.position = new Vector2(100, 100);
        this.dimension = new Vector2(15, 20);
        this.rotation = 0;
        this.turn = 1;
        this.vx;
        this.vy;
    }

    draw() {
        Canvas.drawImagePlane(sprites.missile, this.position, this.dimension, MISSILE_ORIGIN, this.rotation);
    }

    update(planeRotation) {

        let targetX = Mouse.position.x - this.position.x;
        let targetY = Mouse.position.y - this.position.y;

        let TAU = Math.PI * 2;
        let angle = Math.atan2(targetY, targetX);

        let theta = 0;

        while (this.rotation !== angle) {

            let turn = this.turn * 180 / Math.PI;
            let delta = angle - this.rotation;

            if (delta > Math.PI) delta -= TAU;
            if (delta < -Math.PI) delta += TAU;

            theta = delta > 0 ? turn : -turn;

            this.rotation += theta;

            if (Math.abs(delta) < turn) {
                this.rotation = angle;
            }
        }

        this.vx = Math.cos(this.rotation);
        this.vy = Math.sin(this.rotation);

        VELOCITY += 0.005;


        this.position.x += this.vx;
        this.position.y += this.vy;

        if (VELOCITY > 4.5) {
            VELOCITY -= 0.05;
        }
    }

}

let missile = new Missiles();
