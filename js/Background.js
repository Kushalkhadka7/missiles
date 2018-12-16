class Background {

    constructor() {
        this.position = new Vector2(-300, -300);
        this.backgroundDimensions = new Vector2(2000, 2000);
        this.velocity = 3;
    }

    draw() {
        Canvas.drawSprites(sprites.background, this.position, this.backgroundDimensions);
    }

    update(planeRotation) {
        let y = Math.sin(planeRotation);
        let x = Math.cos(planeRotation);

        this.position.x -= x * this.velocity;
        this.position.y -= y * this.velocity;


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
