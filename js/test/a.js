// import { timingSafeEqual } from "crypto";

const MISSILE_ORIGIN = new Vector2(7.5, 10);
let explosion;
let pool = new Array();
let pArr = [];
let collided = false;
let vectorArray = [];
let indexOfMissiles = 0;

class Missiles {

    constructor() {

        this.position = new Vector2(100, 100);
        this.dimension = new Vector2(15, 20);
        this.rotation = 0;
        this.turn = 1;
        this.vx = 0;
        this.vy = 0;
        this.velocity = 4;
        this.direction = 0;
        this.radius = 7.5;
        this.destroyed = false;
        // this.missileRotation = null;
        this.curveX = 0;
        this.curveIndex = 0;
        this.planeRotation;
        this.deltaRotation = 1;
        this.length;
        this.rotationCounter = 0;
        this.previousRotaion;

        this.meroVx = 0;
        this.meroVy = 0;
    }

    draw() {
        Canvas.drawImagePlane(sprites.missile[indexOfMissiles], this.position, this.dimension, MISSILE_ORIGIN, this.rotation);
    }

    update(planeRotation) {

        let targetX = Mouse.position.x;//plane.initialX;
        let targetY = Mouse.position.y;//plane.initialY;
        let a = Mouse.position.x - this.position.x;
        let b = Mouse.position.y - this.position.y;
        // this.length = Math.sqrt((targetX * targetX + (targetY * targetY)));
        // if (this.length) {
        // targetX = targetX / this.length;
        // targetY = targetY / this.length
        // }

        // console.log('target', targetX, targetY);
        // this.rotation = Math.atan2(targetY, targetX);

        let TAU = Math.PI * 2;

        let angle = Math.atan2(b, a);

        let theta = 0;

        while (this.rotation !== angle) {

            let turn = this.turn * 180 / Math.PI;
            let delta = angle - this.rotation;

            if (delta > Math.PI) delta -= TAU;
            if (delta < -Math.PI) delta += TAU; theta = delta > 0 ? turn : -turn;

            this.rotation += theta;

            if (Math.abs(delta) < turn) { this.rotation = angle; }
        } // this.vx=Math.cos(this.rotation); // this.vy=Math.sin(this.rotation);
        // this.position.x +=this.vx * this.velocity; // this.position.y +=this.vy * this.velocity; // let maxVelocity=2;
        // let maxForce=4; // let mass=2; // let maxSpeed=2; // let velocity=targetX * maxVelocity; // let
        desired_velocity = targetX * maxVelocity; // let steering=desired_velocity - velocity; // steering=Math.trunc(steering,
        maxForce); // steering=steering / mass; // velocity=Math.trunc(velocity + steering, maxSpeed); //
        this.position.x += velocity; this.rotation += planeRotation; let desiredVX = this.velocity *
            Math.cos(this.rotation); let desiredVY = this.velocity * Math.sin(this.rotation); this.v1 = Math.cos(this.rotation);
        this.v2 = Math.sin(this.rotation); // let acc_angle=Math.atan2( // this.position.x + vx - plane.position.x, //
        this.position.y + vy - plane.position.y // ); // this.rotation +=acc_angle * planeRotation; // if
            (this.position.y >= 300 || this.position.x <= 200) { // this.position.x +=this.vx * 2; // this.position.y +=this.vy
            * 2; // } else { // this.position.x +=this.vx; // this.position.y +=this.vy; // } // this.lastX=targetX; //
            this.lastY = targetY; // let desired_velocityX=this.normalize((targetX - this.position.x), 400, 0) * 2;//max_velocity
            // let desired_velocityY=this.normalize((targetY - this.position.y), 600, 0) * 2;//max_velocity //
            console.log('desired', desired_velocityX, desired_velocityY); let steeringX = desiredVX - this.vx; let
                steeringY = desiredVY - this.vy; // if (steeringX < 0.3 && steeringY < 0.3) { // this.position.x +=this.vx;
            // this.position.y +=this.vy; // return; // } // console.log('Steering', steeringX, steeringY); //
            steeringX = Math.trunc(steeringX, 2); // steeringY=Math.trunc(steeringY, 1); // steering=steering / mass
            this.vx += steeringX;// Math.trunc(this.meroVx + steeringX, 5); this.vy +=steeringY;//
            Math.trunc(this.meroVy + steeringY, 5); this.position.x = this.position.x + this.vx - this.vx / 5;// /
            Math.abs(this.vx);// this.meroVx - this.meroVx / 2; this.position.y=this.position.y + this.vy - this.vy /
            5;// / Math.abs(this.vy);//this.meroVy - this.meroVy / 2; // console.log(this.vx, this.vy); this.lastVx=this.vx;
            this.lastVy = this.vy;
        } collisonWithPlane() {
            let planeX = plane.position.x; let planeY = plane.position.y; let
                missileX = this.position.x; let missileY = this.position.y; let distance = calcDistance(planeX, planeY, missileX,
                    missileY, plane.radius, this.radius); if (distance == true) {
                        if (shieldCollected) {
                            this.showParticleEffect(missileX, missileY); this.destroyed = true; collided = false;
                        } else if
                            (!shieldCollected) {
                            this.showParticleEffect(missileX, missileY); this.destroyed = true; collided = true; //
                            console.log('sssss');
                        }
                    }
        } showParticleEffect(x, y) {
            explosion = setInterval(() => {

                // console.log(x, y)
                // this.direction += 0.9;
                // color.gradualShift(this.direction);
                for (let index = 0; index < 1; ++index) {
                    let particle = pool.pop(); if (particle != undefined) {
                        particle.reset(x, y, color.getRGBString()); pArr.push(particle);
                    } else {
                        pArr.push(new Particles(x,
                            y, Math.floor(Math.random() * 10 + 10), color.getRGBString(), Math.random() * 1 - 0.6, Math.random() *
                            1 - 0.6));
                    }
                } for (let index = pArr.length - 3; index > -1; --index) {

                    let particle = pArr[index];
                    if (collided) {
                        break;
                    }
                    particle.update();

                    if (particle.a <= 0) pool.push(pArr.splice(index, 1)[0]); particle.draw();
                } if (collided) { // while
                    (particle.length > 0) {
                        for (let index = pArr.length - 3; index > -1; --index) {

                            let particle = pArr[index];
                            if (index < 10) {
                                let color = new Color(255, 255, 255); particle.rgb_string = color.getRGBString();
                                particle.removeOpacityFactor = 0.08;
                            } particle.update(); // if (particle.a <=0.5) //
                            pArr.splice(index, 1) particle.draw(); console.log(index, particle.rgb_string, particle.x,
                                particle.y);
                        } // } // clearInterval(explosion); } }, 5); setTimeout(()=> {
                        clearInterval(explosion);
                    }, 1000);
        }

        collisonWithOtherMissile(other) {

            let otherMissileX = other.position.x;
            let otherMissileY = other.position.y;
            let thisMissileX = this.position.x;
            let thisMissileY = this.position.y;

            let distance = calcDistance(otherMissileX, otherMissileY, thisMissileX, thisMissileY,
                other.radius, this.radius);

            if (distance == true) {

                this.showParticleEffect(thisMissileX, thisMissileY);
                this.destroyed = true;
                other.destroyed = true;
                // play sound
                console.log('missss');
            }
        }

        normalize(val, max, min) {
            return (val - min) / (max - min);
        }
    }

                        let missile = new Missiles();
