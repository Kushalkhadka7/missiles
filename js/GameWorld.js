let particlesArray = [];
let interval;
let missilesArray = new Array();
let starArray = new Array();
let megStarArray = new Array();

class GameWorld {

    constructor() {

        this.background = new Background();

        this.plane = new Plane();

        this.color = new Color(225, 225, 225);

        this.star = new Stars();
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

        Mouse.position == undefined ? Mouse.position = new Vector2() : Mouse.position;

        if (this.counter % 200 == 0) {
            this.missile = new Missiles();
            missilesArray.push(this.missile);

            this.star = new Stars();
            starArray.push(this.star);
        }

        if (this.counter % 1000 == 0) {
            this.megStar = new MegaStar();
            megStarArray.push(this.megStar);
        }

        /*for missile generation */
        for (let i = 0; i < missilesArray.length; i++) {

            if (!missilesArray[i].destroyed) {

                missilesArray[i].update(this.plane.rotation);

                this.showParticles(
                    missilesArray[i].position.x,
                    missilesArray[i].position.y,
                    random(1, 2),
                    i,
                    missilesArray[i].vx,
                    missilesArray[i].vy
                );

                missilesArray[i].draw();
                missilesArray[i].collisonWithPlane();

                for (let j = i + 1; j < missilesArray.length; j++) {
                    if (!missilesArray[j].destroyed) {
                        missilesArray[i].collisonWithOtherMissile(missilesArray[j]);
                    }
                }
            }
        }
        /*for star generation */
        for (let i = 0; i < starArray.length; i++) {
            if (!starArray[i].destroyed) {
                starArray[i].draw();
                starArray[i].update(this.plane.rotation);
                starArray[i].starCollisonWithPlane();
            }
        }

        for (let i = 0; i < megStarArray.length; i++) {
            if (!megStarArray[i].destroyed) {
                megStarArray[i].draw();
                megStarArray[i].update(this.plane.rotation);
                megStarArray[i].shieldCollisonWithPlane();
            }
        }
    }

    showParticles(x, y, radius, id = null, vx, vy) {

        // this.direction += 0.01;
        // this.color.gradualShift(this.direction);

        particlesArray.push(
            new Particles(
                x, y,
                radius,
                this.color.getRGBString(),
                vx,
                vy,
                id
            )
        );

        for (let index = particlesArray.length - 1; index > -1; --index) {

            let particle = particlesArray[index];
            // console.log(particle.id);
            if (missilesArray[particle.id].destroyed) {
                particlesArray.splice(index, 1);
                continue;
            }
            particle.updatePosition();

            if (particle.a <= 0.2) {
                particlesArray.splice(index, 1)[0];
            }

            particle.drawPath();
        }
    }

    updateAfterGameStart() {

    }
}

let gameWorld = new GameWorld();