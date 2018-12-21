class Stars {

    constructor() {

        this.position = new Vector2(random(100, 400), random(100, 600));
        this.dimension = new Vector2(20, 20);
        this.counter = 0;
        this.velocity = 3;
        this.radius = 5;
        this.destroyed = false;
    }

    draw() {
        Canvas.drawSprites(sprites.star, this.position, this.dimension);
    }

    update(planeRotation) {

        let y = Math.sin(planeRotation);
        let x = Math.cos(planeRotation);

        this.position.x -= x;
        this.position.y -= y;
    }

    starCollisonWithPlane() {
        let planeX = plane.position.x - 20;
        let planeY = plane.position.y - 20;
        let starX = this.position.x;
        let starY = this.position.y;

        let distance = calcDistance(planeX, planeY, starX, starY, plane.radius, this.radius);
        if (distance == true) {
            bonus = true;
            this.destroyed = true;
            // play sound
            starScored++;
        }
    }
}
let star = new Stars();
