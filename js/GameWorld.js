let particlesArray = [];
let interval;

class GameWorld {

    constructor() {

        this.background = new Background();

        this.star = new Stars();

        this.plane = new Plane();

        this.missile = new Missiles();

        this.color = new Color(0, 0, 0);
        this.direction = 0;

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

        Mouse.position == undefined ? Mouse.position = new Vector2() : Mouse.position;

        this.star.draw();

        this.showParticles(
            this.missile.position.x,
            this.missile.position.y,
            random(1, 3),
            this.missile.vx,
            this.missile.vy
        );

        this.missile.draw();

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

        this.star.update(this.plane.rotation);
        this.star.starCollisonWithPlane();
        this.missile.update();
        this.missile.collisonWithPlane();

    }
}

let gameWorld = new GameWorld();