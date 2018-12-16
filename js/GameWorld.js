let particlesArray = [];
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


        this.star.draw();

        Mouse.position == undefined ? Mouse.position = new Vector2() : Mouse.position;

        this.direction += 0.01;
        this.color.gradualShift(this.direction);

        particlesArray.push(
            new Particles(
                this.missile.position.x, this.missile.position.y,
                random(1, 3),
                this.color.getRGBString(),
                this.missile.vx,
                this.missile.vy
            )
        );

        for (let index = particlesArray.length - 1; index > -1; --index) {

            let particle = particlesArray[index];

            particle.updatePosition();

            if (particle.a <= 0) {
                particlesArray.splice(index, 1)[0]
            }

            particle.draw();
            particle.updatePosition();

        }
        this.missile.draw();

    }

    updateAfterGameStart() {

        this.star.update(this.plane.rotation);
        this.star.starCollisonWithPlane();
        this.missile.update();
        this.missile.collisonWithPlane();

    }
}