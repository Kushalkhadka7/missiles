/**
 * shield class
 * generets a protective shield outside the plane to protect if from missiles
 * when shield is activated missiles cannot destroy the plane
 * remains active for 5 seconds
 * SHIELD_RADIUS = radius of the shield
 * SHIELD_VELOCITY = velocity by which the shield moves
 * DEACTIVATE_SHIELD = removes the shield (5000 miliseconds  = 5 seconds)
 * @class MegaStar
 */

const SHIELD_RADIUS = 5;
const SHIELD_VELOCITY = 1;
const DEACTIVATE_SHIELD = 5000;

class Shield {

  constructor() {
    this.radius = SHIELD_RADIUS;
    this.velocity = SHIELD_VELOCITY;
    this.destroyed = false;
    this.dimension = new Vector2(25, 25);
    this.position = new Vector2(random(100, 400), random(100, 600));
  }

  /**
   * draws shield on the game by calling Canvas2D class drawSprites method
   * arguments are shield sprite source,random position where the shield is to be drawn and
     dimensions are width & height of shield
   * @memberof Shield
   */
  draw() {
    Canvas.drawSprites(sprites.shield, this.position, this.dimension);
  }

  /**
   * calculates the vecotr between shield and plane position using plane rotation
   * x and y are the vectors that calculates the direction of shield to plane
   * updates the position of shield by using the plane rotation angle
   * @param {*} planeRotation = angle in radians by which the plane is rotationg
   * @memberof Shield
   */
  update(planeRotation) {

    let y = Math.sin(planeRotation);
    let x = Math.cos(planeRotation);

    this.position.x -= x * this.velocity;
    this.position.y -= y * this.velocity;
  }

  /**
    * check the collison between plane and the shield
    * calculate the distance between the plane and the shield and detect collison by comparing
       the distance with the sum of their radii
    * if shields are collided marks them as collected by this.destroyed = true
    * shieldcored = golbal variable from Game class that detects either shield is collided with plane or not
    * shieldX,shieldY co-ordinates of shield
    * planeX ,planeY co-ordinates of plane
    * @memberof shield
    */
  shieldCollisonWithPlane() {
    let shieldX = this.position.x;
    let shieldY = this.position.y;
    let planeX = plane.position.x;
    let planeY = plane.position.y;

    let distance = calcDistance(planeX, planeY, shieldX, shieldY, plane.radius, this.radius);

    if (distance === true) {
      this.destroyed = true;
      this.shieldOn();
    }
  }

  /**
   * runs when shield collides with the plane
   * activates the shield for 5 seconds
   * @memberof Shield
   */
  shieldOn() {
    shieldCollected = true;
    let timeout = setTimeout(() => {
      shieldCollected = false;
      clearTimeout(timeout);
    }, DEACTIVATE_SHIELD);
  }
}

