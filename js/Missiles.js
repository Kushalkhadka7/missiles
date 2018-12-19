const MISSILE_ORIGIN = new Vector2(7.5, 10);
let VELOCITY = 0.01;
const FLAG = 10;
let explosion;
let pool = new Array();
let pArr = [];
let collided = false;
let vectorArray = [];

class Missiles {

    constructor() {

        this.position = new Vector2(random(200, 300), random(0, 100));
        this.dimension = new Vector2(15, 20);
        this.rotation = 0;
        this.turn = 1;
        this.vx;
        this.vy;
        this.velocity = 2;
        this.direction = 0;
        this.radius = 7.5;
        this.destroyed = false;
        // this.missileRotation = null;
        this.curveX = 0;
        this.curveIndex = 0;
        this.planeRotation;
        this.deltaRotation = 1;
        this.handleUpdate();
    }

    draw() {

        Canvas.drawImagePlane(sprites.missile[2], this.position, this.dimension, MISSILE_ORIGIN, this.rotation);
    }

    easeIn(a, b, percent) {
        return a + (b - a) * Math.pow(percent, 2);
    }

    easeOut(a, b, percent) {
        return a + (b - a) * (1 - Math.pow(1 - percent, 2));
    }

    easeInOut(a, b, percent) {
        return a + (b - a) * ((-Math.cos(percent * Math.PI) / 2) + 0.5);
    }


    handleUpdate() {
        this.curves = [];
        let n;
        let curve = 10;
        for (n = 0; n < 20; n++) {
            let tempCurve = this.easeIn(0, curve, n / 20);
            this.curves.push(tempCurve);
            // this.addSegment(tempCurve, this.easeInOut(startY, endY, n/total));
        }
        for (n = 0; n < 20; n++) {
            let tempCurve = this.easeInOut(curve, 0, n / 20);
            this.curves.push(tempCurve);
            // this.addSegment(tempCurve, this.easeInOut(startY, endY, (enter+hold+n)/total));
        }
        // return curves;
    }


    update(planeRotation) {

        this.planeRotation = planeRotation;

        let targetX = plane.pointPosition.x - this.position.x;
        let targetY = plane.pointPosition.y - this.position.y;


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

                this.curveX = 0;
                this.curveIndex = 0;
                this.rotation = angle;

            }
        }

        let diff = Math.abs(this.planeRotation) - Math.abs(this.rotation);

        // if (Math.abs(diff) <= 1) {
        //     console.log('he')
        //     if (this.rotation != this.planeRotation) {
        //         this.rotation += this.deltaRotation;
        //         this.rotation = planeRotation;
        //     }

        // }

        this.rotation = planeRotation;
        this.vx = Math.cos(this.rotation);
        this.vy = Math.sin(this.rotation);


        // let y = Math.sin(planeRotation);
        // let x = Math.cos(planeRotation);

        this.position.x += this.vx;
        this.position.y += this.vy;

        // console.log(this.vx, this.vy)

        VELOCITY += 0.005;
        // console.log(this.rotation, planeRotation);
        // this.position.x += x;
        // this.position.y += y;

        this.curveX += this.curves[this.curveIndex];
        this.curveIndex++;

        if (VELOCITY > 4.5) {
            VELOCITY -= 0.05;
        }
    }

    // updatePosition() {

    // }

    collisonWithPlane() {

        let planeX = plane.position.x;
        let planeY = plane.position.y;
        let missileX = this.position.x;
        let missileY = this.position.y;

        let distance = calcDistance(planeX, planeY, missileX, missileY, plane.radius, this.radius);

        if (distance == true) {
            if (shield) {
                this.showParticleEffect(missileX, missileY);
                this.destroyed = true;
                collided = false;

            } else if (!shield) {
                this.showParticleEffect(missileX, missileY);
                this.destroyed = true;
                collided = true;
            }
        }
    }

    showParticleEffect(x, y) {

        explosion = setInterval(() => {
            this.direction += 0.9;
            color.gradualShift(this.direction);
            for (let index = 0; index < 1; ++index) {
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
                            Math.random() * 1 - 0.6,
                            Math.random() * 1 - 0.6
                        )
                    );

                }
            }

            for (let index = pArr.length - 2; index > -1; --index) {

                let particle = pArr[index];

                particle.updatePosition();

                if (particle.a <= 0.5) pool.push(pArr.splice(index, 1)[0]);

                particle.draw();
            }
        });

        setTimeout(() => {
            clearInterval(explosion);
        }, 1000);
    }

    collisonWithOtherMissile(other) {

        let otherMissileX = other.position.x;
        let otherMissileY = other.position.y;
        let thisMissileX = this.position.x;
        let thisMissileY = this.position.y;

        let distance = calcDistance(otherMissileX, otherMissileY, thisMissileX, thisMissileY, other.radius, this.radius);

        if (distance == true) {
            this.showParticleEffect(thisMissileX, thisMissileY);

            this.destroyed = true;
            other.destroyed = true;
            // play sound
        }
    }
}

let missile = new Missiles();
