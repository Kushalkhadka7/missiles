const MISSILE_ORIGIN = new Vector2(7.5, 10);
let VELOCITY = 0.01;
const FLAG = 10;
let explosion;
let pool = new Array();
let pArr = [];

class Missiles {

    constructor() {

        this.position = new Vector2(random(20, 350), random(20, 200));
        this.dimension = new Vector2(15, 20);
        this.rotation = 0;
        this.turn = 1;
        this.vx;
        this.vy;
        this.direction = 0;
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

    collisonWithPlane() {

        let planeX = plane.position.x - 20;
        let planeY = plane.position.y - 20;
        let missileX = this.position.x + 5;
        let missileY = this.position.y + 5;

        let distance = calcDistance(planeX, planeY, missileX, missileY);

        if (distance == true) {
            collided = true;
            this.showParticleEffect(missileX, missileY);
        }
    }

    showParticleEffect(x, y) {

        explosion = setInterval(() => {
            this.direction += 0.01;
            color.gradualShift(this.direction);

            for (let index = 0; index < 2; ++index) {
                let particle = pool.pop();

                if (particle != undefined) {

                    particle.reset(x, y, color.getRGBString());
                    pArr.push(particle);

                } else {

                    pArr.push(
                        new Particles(
                            x, y,
                            Math.floor(Math.random() * 10 + 10),
                            color.getRGBString(),
                            Math.random() * 1 - 0.5,
                            Math.random() * 1 - 0.5
                        )
                    );

                }
            }

            for (let index = pArr.length - 1; index > -1; --index) {

                let particle = pArr[index];

                particle.updatePosition();

                if (particle.a <= 0) pool.push(pArr.splice(index, 1)[0]);

                particle.draw();
            }
        });

        setTimeout(() => {
            clearInterval(explosion);
        }, 2000);
    }
}

let missile = new Missiles();
