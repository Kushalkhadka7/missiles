class Stars {

    constructor() {

        this.position = new Vector2(random(100, 1500), random(100, 1500))
        this.dimension = new Vector2(25, 25);
        this.counter = 0;
        this.velocity = 3;
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

        let distance = calcDistance(planeX, planeX, starX, starY);

        if (distance == true) {
            bonus = true;
            console.log('collidee')
            setTimeout(() => {
                console.log('a')
            });
        }
    }
}
let star = new Stars();