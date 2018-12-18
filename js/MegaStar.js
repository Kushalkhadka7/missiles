var timeStarted;

class MegaStar {

    constructor() {

        this.position = new Vector2(random(100, 400), random(100, 600));
        this.dimension = new Vector2(25, 25);
        this.counter = 0;
        this.velocity = 3;
        this.radius = 5;
        this.destroyed = false;
    }

    draw() {
        Canvas.drawSprites(sprites.shieldImage, this.position, this.dimension);
    }

    update(planeRotation) {

        let y = Math.sin(planeRotation);
        let x = Math.cos(planeRotation);

        this.position.x -= x;
        this.position.y -= y;
    }

    shieldCollisonWithPlane() {
        let planeX = plane.position.x;
        let planeY = plane.position.y;
        let starX = this.position.x;
        let starY = this.position.y;

        let distance = calcDistance(planeX, planeY, starX, starY, plane.radius, this.radius);
        if (distance == true) {
            this.destroyed = true;
            this.shieldOn();
        }
    }

    shieldOn() {
        shield = true;
        let timeout = setTimeout(() => {
            shield = false;
            clearTimeout(timeout);
        }, 5000);
    }
}
let megStar = new MegaStar();