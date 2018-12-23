/**
 * generates particle system in any given point
 * x and y are the positons where the particles are drawn
 * rgb_string = color string that gives the color value of the particles
 * vx and vy are x and y velocity of the particles respectively
 * id = detects in which missiles the particle is drawn used while destroying the particles and missiles
 * id is optional (can be null)
 * @class Particles
 */

const VELOCITY_FACTOR = 2;

class Particles {

  constructor(x, y, radius, rgb_string, vx, vy, id = null) {
    this.radius = radius;
    this.reset(x, y, rgb_string, vx, vy);
    this.id = id;
  }

  /**
   * reset the value of particles
   * @param {*} x = x co-ordinate where particle is drawn
   * @param {*} y = y co-ordinate where particle is drawn
   * @param {*} rgb_string = color string that gives the color value of the particles
   * @param {*} vx = x velocity of the particles
   * @param {*} vy = y velocity of the particles
   * this.a = the alpha value of the particles used in destroying particles (range 1 = visible to 0 = not visible)
   * @memberof Particles
   */
  reset(x, y, rgb_string, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.rgb_string = rgb_string;
    this.a = 1;
  }

  /**
   * gets the color rgb value and returns it as string by adding alpha to rgb
   * @readonly
   * @memberof Particles
   */
  get color() {
    return "rgba(" + this.rgb_string + "," + this.a + ")";
  }

  /**
   * updates the position of the particles by their respective velocities vx and vy
   * decrease the value of alpha in every frame by 0.01
   * VELOCITY_FACTOR = factor by which velocity of the particles is increased
   * missile.rotation = angle of rotation in radians of missile
   * @memberof Particles
   */
  updatePositionInMissiles() {
    this.a -= 0.02;
    this.x -= this.vx * VELOCITY_FACTOR * missile.rotation;
    this.y -= this.vy * VELOCITY_FACTOR * missile.rotation;
  }

  update() {
    this.a -= 0.01;
    this.x += this.vx * VELOCITY_FACTOR;
    this.y += this.vy * VELOCITY_FACTOR;
  }

  /**
   * draws the particles on the canvas
   * this.x and this.y are values of the position where to draw the particles
   * this.radius = radius of the particles(usually random value)
   * START_ANGLE = starting point to draw the circle
   * FINISN_ANGLE = final point to draw the circle
   * @memberof Particles
   */
  draw() {
    const START_ANGLE = 0;
    const FINISN_ANGLE = 2 * Math.PI;

    Canvas.context.beginPath();
    Canvas.context.arc(this.x, this.y, this.radius, START_ANGLE, FINISN_ANGLE);
    Canvas.context.fillStyle = this.color;
    Canvas.context.fill();
    Canvas.context.closePath();
  }

}
