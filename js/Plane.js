/**
 * plane class handles all the plane actions like plane rotation
 * this.radius = radius of the plane
 * this.rotation = angle in radians by wihch the plane rotates
 * this.dimension = width and height of the plane
 * this.position = x and y co-ordinates of the plane center
 * PLANE_ORIGIN = co-ordinates where the plane is drawn
 * indexOfPlane = global varibale that holds the value to choose different planes
 * this.tailX = x co-ordinate of the plane tail
 * this.tailY = y co-ordinate of the plane tail
 * this.angle = random angle which holds the plane to rotate continously
 * this.maxAccel = max acceleration of the plane rotation
 * this.velocity = velocity by which the plane rotates
 * @class Plane
 */

const PLANE_ORIGIN = new Vector2(30, 30);
const VALUE_TO_PLANE_TAIL = 25;
let indexOfPlane = 0;

class Plane {

  constructor() {
    this.radius = 20;
    this.tailX = 170;
    this.tailY = 300;
    this.rotation = 0;
    this.velocity = 0;
    this.maxAccel = 0.04;
    this.dimension = new Vector2(60, 60);
    this.position = new Vector2(200, 300);
    this.angle = Math.random() * Math.PI * 2;
  }

  /**
   * draw plane on canvas using draw method of Canvas2D class
   * checks either shield is activated or not
   * if shield is activated calls drawShield method to draw shield on plane
   * choose the plane image based on the plane index in planes array
   * draws the plane on given orign
   * @memberof Plane
   */
  draw() {

    if (shieldCollected) {
      this.drawShieldOnPlane();
    }

    Canvas.drawPlaneAndMissiles(sprites.plane[indexOfPlane], this.position, this.dimension, PLANE_ORIGIN, this.angle);
  }

  /**
   * handles plane actions like rotation
   * checks the mouse postion if undefined initialize it to (0,0)
   * measure the vector between mouse position and plane position which is used to calculate rotation of plane
   * normalizes the angle to hold the plane rotation
   * calculates the plane rotation using the vector
   * updates the plane rotation based on the mouse movement
   * offset = postion from the origin(0,0) to plane retrived from canvas object
   * radDiff = diff in the rotation angle of the plane
   * @memberof Plane
   */
  update() {

    Mouse.position == undefined ? Mouse.position = new Vector2() : Mouse.position;

    let offset = Canvas.canvas.getBoundingClientRect();

    let opposite = Mouse.position.y - this.position.y;

    let adajcent = Mouse.position.x - this.position.x - offset.left;

    this.rotation = Math.atan2(opposite, adajcent);

    let radDiff = 0;

    if (this.rotation != undefined) {
      radDiff = this.rotation - this.angle;
    }
    if (radDiff > Math.PI) {
      this.angle += 2 * Math.PI;
    } else if (radDiff < -Math.PI) {
      this.angle -= 2 * Math.PI;
    }

    let easing = 0.06;
    let targetVel = radDiff * easing;
    this.velocity = this.clip(targetVel, this.velocity - this.maxAccel, this.velocity + this.maxAccel);
    this.angle += this.velocity;

    this.tailX = this.position.x - VALUE_TO_PLANE_TAIL * Math.cos(this.angle);
    this.tailY = this.position.y - VALUE_TO_PLANE_TAIL * Math.sin(this.angle);
  }

  /**
   *returns the normalize value for the velocity
   *takes target velocity and returns the normalize valud
   * @param {*} x = target velocity
   * @param {*} velocityAccelDiff = difference of velocity and max acceleration
   * @param {*} velocityAccelSum = sum of velocity and max acceleration
   * @returns
   * @memberof Plane
   */
  clip(targetVelocity, velocityAccelDiff, velocityAccelSum) {
    return targetVelocity < velocityAccelDiff ? velocityAccelDiff : targetVelocity > velocityAccelSum ? velocityAccelSum : targetVelocity;
  }

  /**
   * draw the shield outside of the plane on canvas when shield is activated
   * INCREASE_RADIUS_FACTOR = increase the plane radius by the given value
   * BEGIN_ANGLE= starting value of angle form where to draw the arc (usually 0)
   * FINISN_ANGLE= final value of angle  to draw the arc (usually 360)
   * SHIELD_WIDTH = width of the shield drawn on the plane
   * @memberof Plane
   */
  drawShieldOnPlane() {

    const INCREASE_RADIUS_FACTOR = 5;
    const BEGIN_ANGLE = 0;
    const FINISN_ANGLE = 2 * Math.PI;
    const SHIELD_WIDTH = 2;
    const SHIELD_COLOR = 'red';

    Canvas.context.beginPath();
    Canvas.context.lineWidth = SHIELD_WIDTH;
    Canvas.context.strokeStyle = SHIELD_COLOR;
    Canvas.context.arc(
      this.position.x,
      this.position.y,
      this.radius + INCREASE_RADIUS_FACTOR,
      BEGIN_ANGLE, FINISN_ANGLE
    );
    Canvas.context.lineCap = 'round';
    Canvas.context.stroke();
  }

}

let plane = new Plane();
