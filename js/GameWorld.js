/**
 * starArray = array that holds all the generated stars
 * shieldArray = array that holds all the generated shields
 * missilesArray = array that holds all the generated missiles
 * particlesArray = array that holds all the generated particles in particle system
 */
let starArray = [];
let shieldArray = [];
let missilesArray = [];
let particlesArray = [];

/**
 * handles the components in the game like plane,missiles,backgound,stars,shield
 * this.countFrames = counts the number of frames
 * this.colorRangeIncrease = factor that increases the rgb value
 * this.star = instance of star class
 * this.color = instance of color class
 * @class GameWorld
 */
class GameWorld {

  constructor() {
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
      missilesArray.push(this.missile);

      this.star = new Stars();
      starArray.push(this.star);
    }

    /**generates the shield in certain interval */
    if (this.countFrames % 1000 == 0) {
      this.shield = new Shield();
      shieldArray.push(this.shield);
    }

    /*generates missiles using the missilesArray */
    for (let i = 0; i < missilesArray.length; i++) {

      if (!missilesArray[i].destroyed) {

        missilesArray[i].update(plane.angle);

        /**attach particle system to individual missiles tracked by their index */
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

    /*generates stars form starArray */
    for (let i = 0; i < starArray.length; i++) {
      if (!starArray[i].destroyed) {
        starArray[i].draw();
        starArray[i].update(plane.rotation);
        starArray[i].starCollisonWithPlane();
      }
    }

    /*generates shield form starArray */
    for (let i = 0; i < shieldArray.length; i++) {
      if (!shieldArray[i].destroyed) {
        shieldArray[i].draw();
        shieldArray[i].update(plane.rotation);
        shieldArray[i].shieldCollisonWithPlane();
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

    /**generates particles from particlesArray and removes those particles that have alpha less than 0*/
    for (let index = particlesArray.length - 1; index > -1; --index) {

      let particle = particlesArray[index];

      if (missilesArray[particle.id].destroyed) {
        particlesArray.splice(index, 1);
        continue;
      }
      particle.updatePositionInMissiles();

      if (particle.a <= 0.2) {
        particlesArray.splice(index, 1)[0];
      }

      particle.draw();
    }
  }

}

