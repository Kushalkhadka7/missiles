let particlesArray = [];
let interval;
let missilesArray = new Array();
let starArray = new Array();

class GameWorld {

    constructor() {

        this.background = new Background();

        this.plane = new Plane();

        // this.missile = new Missiles();
        // missilesArray.push(this.missile);

        this.color = new Color(0, 0, 0);

        this.direction = 0;

        this.counter = 0;
    }

    draw() {

        this.background.draw();
        this.plane.draw();
    }

    update() {

        this.background.update(this.plane.rotation);
        this.plane.update();
    }

    drawAfterGameStart() {
        this.counter++;

        if (this.counter % 200 == 0) {
            this.missile = new Missiles();
            missilesArray.push(this.missile);

            this.star = new Stars();
            starArray.push(this.star);
        }

        Mouse.position == undefined ? Mouse.position = new Vector2() : Mouse.position;



        for (let i = 0; i < missilesArray.length; i++) {

            this.showParticles(
                missilesArray[i].position.x,
                missilesArray[i].position.y,
                random(1, 3),
                missilesArray[i].vx,
                missilesArray[i].vy
            );

            missilesArray[i].draw();
            missilesArray[i].update();
            missilesArray[i].collisonWithPlane();
        }

        for (let i = 0; i < starArray.length; i++) {
            starArray[i].draw();
            starArray[i].update(this.plane.rotation);
            starArray[i].starCollisonWithPlane();
        }
    }

    showParticles(x, y, radius, vx, vy) {

        this.direction += 0.01;
        this.color.gradualShift(this.direction);

        particlesArray.push(
            new Particles(
                x, y,
                radius,
                this.color.getRGBString(),
                vx,
                vy
            )
        );

        for (let index = particlesArray.length - 1; index > -1; --index) {

            let particle = particlesArray[index];

            particle.updatePosition();

            if (particle.a <= 0) {
                particlesArray.splice(index, 1)[0]
            }

            particle.draw();
        }
    }

    updateAfterGameStart() {

    }
}

let gameWorld = new GameWorld();