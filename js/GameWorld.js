/**
 * this.starArray = array that holds all the generated stars
 * this.shieldArray = array that holds all the generated shields
 * this.missilesArray = array that holds all the generated missiles
 * this.particlesArray = array that holds all the generated particles in particle system
 * handles the components in the game like plane,missiles,backgound,stars,shield
 * this.countFrames = counts the number of frames
 * this.colorRangeIncrease = factor that increases the rgb value
 * this.star = instance of star class
 * this.color = instance of color class
 * @class GameWorld
 */
class GameWorld {

  constructor() {

    this.starArray = [];
    this.shieldArray = [];
    this.missilesArray = [];
    this.particlesArray = [];
    this.countFrames = 0;
    this.previouscounter = 0
    this.colorRangeIncrease = 0;
    this.previousPlaneRotation = 0;

    this.star = new Stars();
    this.background = new Background();
    this.color = new Color(255, 255, 255);
  }

  /**
   * draw all the components that are required before game begins
   * draw the background (backgound  = instance of backgound class)
   * draw the plane (plane  = instance of plane class)
   * @memberof GameWorld
   */
  draw() {
    this.background.draw();
    plane.draw();
  }

  /**
   * updates all the components that are required before game
   * updates the background
   * updates the plane
   * pass plane rotation to backgound class
   * @memberof GameWorld
   */
  update() {
    this.background.update(plane.angle);
    plane.update();
  }

  /**
   * draw components that are required after game starts like missiles,stars,shields
   * increase the counter every frame
   * reset mouse posiiton if undefined
   * calculate the counter and generates stars,shields,missiles in certain interval only
   * generates and updates stars,missiles,shields using respective arrays
   * attach particle system to missiles by calling this.showParticleEffect funciton
   * collisonWithPlane() = checks either the plane and missile are collided or not
   * collisonWithOtherMissile = checks the collison of one missile with other missile
   * shieldCollisonWithPlane = checks the collison of one missile with shield
   * starCollisonWithPlane = checks the collison of one missile with stars
   * draws those components olny if they are not destroyed
   * @memberof GameWorld
   */
  drawAfterGameStart() {

    this.countFrames++;

    Mouse.position == undefined ? Mouse.position = new Vector2() : Mouse.position;

    /**generates the missiles and stars in certain interval */
    if (this.countFrames % 300 == 0) {

      this.missile = new Missiles();
      this.missilesArray.push(this.missile);

      this.star = new Stars();
      this.starArray.push(this.star);
    }

    /**generates the shield in certain interval */
    if (this.countFrames % 1000 == 0) {
      this.shield = new Shield();
      this.shieldArray.push(this.shield);
    }

    /*generates missiles using the this.missilesArray */
    for (let i = 0; i < this.missilesArray.length; i++) {

      if (!this.missilesArray[i].destroyed) {

        this.missilesArray[i].update(plane.angle);

        /**attach particle system to individual missiles tracked by their index */
        this.showParticles(
          this.missilesArray[i].position.x,
          this.missilesArray[i].position.y,
          random(1, 2),
          i,
          this.missilesArray[i].vx,
          this.missilesArray[i].vy
        );

        this.missilesArray[i].draw();
        this.missilesArray[i].collisonWithPlane();

        for (let j = i + 1; j < this.missilesArray.length; j++) {
          if (!this.missilesArray[j].destroyed) {
            this.missilesArray[i].collisonWithOtherMissile(this.missilesArray[j]);
          }
        }
      }
    }

    /*generates stars form this.starArray */
    for (let i = 0; i < this.starArray.length; i++) {
      if (!this.starArray[i].destroyed) {
        this.starArray[i].draw();
        this.starArray[i].update(plane.rotation);
        this.starArray[i].starCollisonWithPlane();
      }
    }

    /*generates shield form this.starArray */
    for (let i = 0; i < this.shieldArray.length; i++) {
      if (!this.shieldArray[i].destroyed) {
        this.shieldArray[i].draw();
        this.shieldArray[i].update(plane.rotation);
        this.shieldArray[i].shieldCollisonWithPlane();
      }
    }
  }

  /**
   * initialize particle system in given position
   * @param {*} x = x co-ordinate where particle system is generated
   * @param {*} y = y co-ordinate where particle system is generated
   * @param {*} radius = radius of the particles generated (usually 0 to 15 random numbers)
   * @param {*} [id=null] = id of missile in to track particular missile and its particle system
   * @param {*} vx = x velocity to particles
   * @param {*} vy = y velocity to particles
   * id can be null (optional)
   * this.colorRangeIncrease = rate at which the rgb value changes
   * @memberof GameWorld
   */
  showParticles(x, y, radius, id = null, vx, vy) {

    // this.colorRangeIncrease += 0.01;
    // this.color.gradualShift(this.colorRangeIncrease);

    this.particlesArray.push(
      new Particles(
        x, y,
        radius,
        this.color.getRGBString(),
        vx,
        vy,
        id
      )
    );

    /**generates particles from this.particlesArray and removes those particles that have alpha less than 0*/
    for (let index = this.particlesArray.length - 1; index > -1; --index) {

      let particle = this.particlesArray[index];

      if (this.missilesArray[particle.id].destroyed) {
        this.particlesArray.splice(index, 1);
        continue;
      }
      particle.updatePositionInMissiles();

      if (particle.a <= 0.2) {
        this.particlesArray.splice(index, 1)[0];
      }

      particle.draw();
    }
  }

}

