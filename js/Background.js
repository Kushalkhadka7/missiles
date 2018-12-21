/**
 * game background
 * @class Background
 */
class Background {

    constructor() {
        this.x;
        this.y;
        this.velocity = 3;
        this.a = new Vector2(200, 300);
        this.position = new Vector2(-300, -300);
        this.backgroundDimensions = new Vector2(2000, 2000);

    }

    draw() {
        Canvas.drawSprites(sprites.background, this.position, this.backgroundDimensions);
        Canvas.context.fillRect(this.a.x, this.a.y, 20, 20);
    }

    update(planeRotation) {

        this.y = Math.sin(planeRotation);
        this.x = Math.cos(planeRotation);

        // this.a.x += this.x * this.velocity;
        // this.a.y += this.y * this.velocity;

        this.position.x -= this.x * this.velocity;
        this.position.y -= this.y * this.velocity;

        // console.log(this.position)


        if (this.position.x > -200) {

            this.position.x = -1500;
        }
        if (this.position.x < -1500) {
            this.position.x = -300;
        }

        if (this.position.y > -200) {
            this.position.y = -1500;
        }
        if (this.position.y < -1500) {
            this.position.y = -300;
        }
    }
}

let background = new Background();
