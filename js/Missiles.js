/**
 * missiles class that handles all missiles action like movements,collison
 * MISSILE_ORIGIN = co-ordinates to draw the missiles images
 * this.explosion = interval that runs after the missile is collided with plane
 * this.pool = array that collects all the destroyed particles
 * this.pArr = array that holds all the particles of particle system
 * collided = boolean that checks either missile is collided with plane or not(also used in Game class)
 * indexOfMissiles = variable that holds the index of missile images in missiles array(inGame Class)
 * @class Missiles
 */

const TIMER = 1000;
let collided = false;
let indexOfMissiles = 0;
const MISSILE_ORIGIN = new Vector2(7.5, 10);

class Missiles {

  constructor() {
    this.vx = 0;
    this.vy = 0;
    this.length;
    this.turn = 1;
    this.pArr = [];
    this.pool = [];
    this.explosion;
    this.radius = 7.5;
    this.rotation = 0;
    this.velocity = 2;
    this.destroyed = false;
    this.dimension = new Vector2(15, 20);
    this.position = new Vector2(100, 100);
  }

  /**
   * draw missiles on canvas using drawImageAndMissiles method of Canvas2D class
   * choose the missiles image based on the missile index in missiles array
   * draws the missiles on given orign
   * this.rotation = angle in radians by which the missile rotates
   * @memberof Plane
   */
  draw() {
    Canvas.drawPlaneAndMissiles(sprites.missile[indexOfMissiles], this.position, this.dimension, MISSILE_ORIGIN, this.rotation);
  }

  update(planeRotation) {

    let targetX = plane.tailX - this.position.x;
    let targetY = plane.tailY - this.position.y;

    this.length = Math.sqrt((targetX * targetX + (targetY * targetY)));

    if (this.length) {
      targetX = targetX / this.length;
      targetY = targetY / this.length
    }

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

    this.rotation += planeRotation;

    this.vx = Math.cos(this.rotation);
    this.vy = Math.sin(this.rotation);

    this.position.x += this.vx * this.velocity;
    this.position.y += this.vy * this.velocity;

    if (this.position.y >= 300 || this.position.x <= 200) {
      this.position.x += this.vx * 2;
      this.position.y += this.vy * 2;
    } else {
      this.position.x += this.vx;
      this.position.y += this.vy;
    }
  }

  // updateMissile(){

  // let targetX = Mouse.position.x;//plane.initialX;
  // let targetY = Mouse.position.y;//plane.initialY;
  //     // let maxVelocity = 2;
  //     // let maxForce = 4;
  //     // let mass = 2;
  //     // let maxSpeed = 2;

  //     // let velocity = targetX * maxVelocity;

  //     // let desired_velocity = targetX * maxVelocity;

  //     // let steering = desired_velocity - velocity;

  //     // steering = Math.trunc(steering, maxForce);
  //     // steering = steering / mass;

  //     // velocity = Math.trunc(velocity + steering, maxSpeed);

  //     // this.position.x += velocity;

  //     // this.lastX = targetX;
  //     // this.lastY = targetY;
  //     // let desired_velocityX = this.normalize((targetX - this.position.x), 400, 0) * 2;//max_velocity
  //     // let desired_velocityY = this.normalize((targetY - this.position.y), 600, 0) * 2;//max_velocity
  //     // console.log('desired', desired_velocityX, desired_velocityY);
  //     // let steeringX = desiredVX - this.vx;
  //     // let steeringY = desiredVY - this.vy;

  //     // if (steeringX < 0.3 && steeringY < 0.3) {
  //     //     this.position.x += this.vx;
  //     //     this.position.y += this.vy;

  //     //     return;
  //     // }
  //     // console.log('Steering', steeringX, steeringY);

  //     // steeringX = Math.trunc(steeringX, 2);
  //     // steeringY = Math.trunc(steeringY, 1);
  //     // steering = steering / mass
  //     // this.vx += steeringX;// Math.trunc(this.meroVx + steeringX, 5);
  //     // this.vy += steeringY;// Math.trunc(this.meroVy + steeringY, 5);

  //     // this.position.x = this.position.x + this.vx - this.vx / 5;// / Math.abs(this.vx);// this.meroVx - this.meroVx / 2;
  //     // this.position.y = this.position.y + this.vy - this.vy / 5;// / Math.abs(this.vy);//this.meroVy - this.meroVy / 2;
  //     // // console.log(this.vx, this.vy);
  //     // this.lastVx = this.vx;
  //     // this.lastVy = this.vy;
  // }

  /**
   * check the missile and plane collison
   * planeX = x co-ordinate of the plane
   * planeY = y co-ordinate of the plane
   * missileX = x co-ordinate of the missile
   * missileY = y co-ordinate of the missile
   * shieldCollected = detects either shield is activated on plane or not
   * this.destroyed = checks either the is in screen or not
   * collided = checks either the missile is collided with plane or not
   * @memberof Missiles
   */
  collisonWithPlane() {

    let planeX = plane.position.x;
    let planeY = plane.position.y;
    let missileX = this.position.x;
    let missileY = this.position.y;

    let distance = calcDistance(planeX, planeY, missileX, missileY, plane.radius, this.radius);

    if (distance == true) {
      if (shieldCollected) {
        this.showParticleEffect(missileX, missileY);
        this.destroyed = true;
        collided = false;
      } else if (!shieldCollected) {
        this.showParticleEffect(missileX, missileY);
        if (volumeOn) { sounds.collisonSound.play(); }
        this.destroyed = true;
        collided = true;
      }
    }
  }

  /**
   * initialize particle system in given position
   * @param {*} x = x co-ordinate where particle system is generated
   * @param {*} y = y co-ordinate where particle system is generated
   * radius = radius of the particles generated (usually 0 to 15 random numbers)
   * vx = x velocity to particles
   * vy = y velocity to particles
   * this.explosion = interval that runs for certain time
   * @memberof Missiles
   */
  showParticleEffect(x, y) {

    this.explosion = setInterval(() => {
      for (let index = 0; index < 2; ++index) {
        let particle = this.pool.pop();

        if (particle != undefined) {

          particle.reset(x, y, color.getRGBString());
          this.pArr.push(particle);

        } else {

          this.pArr.push(
            new Particles(
              x, y,
              Math.floor(Math.random() * 10 + 15),
              color.getRGBString(),
              Math.random() * 1 - 0.6,
              Math.random() * 1 - 0.6
            )
          );

        }
      }

      for (let index = this.pArr.length - 4; index > -1; --index) {

        let particle = this.pArr[index];

        particle.update();

        if (particle.a <= 0.5) this.pool.push(this.pArr.splice(index, 1)[0]);

        particle.draw();
      }
    });

    let timeOut = setTimeout(() => {
      clearInterval(this.explosion);
      clearTimeout(timeOut)
    }, TIMER);
  }

  /**
   * check the missile is collided with other missile
   * otherMissileX = x co-ordinate of the other missile
   * otherMissileY = y co-ordinate of the other missile
   * missileX = x co-ordinate of the missile
   * missileY = y co-ordinate of the missile
   * this.destroyed = checks either the missile is in screen or not
   * this.destroyed = checks either the pther missile is in screen or not
   * @memberof Missiles
   */
  collisonWithOtherMissile(other) {

    let otherMissileX = other.position.x;
    let otherMissileY = other.position.y;
    let thisMissileX = this.position.x;
    let thisMissileY = this.position.y;

    let distance = calcDistance(otherMissileX, otherMissileY, thisMissileX, thisMissileY, other.radius, this.radius);

    if (distance == true) {

      this.showParticleEffect(thisMissileX, thisMissileY);
      if (volumeOn) { sounds.collisonSound.play(); }
      let timeOut = setTimeout(() => {
        this.destroyed = true;
        other.destroyed = true;
        clearTimeout(timeOut)
      }, TIMER);

      return true;
    }
    return false;
  }
}

let missile = new Missiles();
