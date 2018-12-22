/**
 * shield class
 * generets a protective shield outside the plane to protect if from missiles
 * when shield is activated missiles cannot destroy the plane
 * remains active for 5 seconds
 * @class MegaStar
 */
class Shield {

    constructor() {
        this.radius = 5;
        this.velocity = 1;
        this.destroyed = false;
        this.dimension = new Vector2(25, 25);
        this.position = new Vector2(random(100, 400), random(100, 600));
    }

    /**
     * draws shield on the game by calling canvas drawSprites method
     * arguments are shield sprite,random position whre the shield is to be drawn and
        width & height of shield
     * @memberof Shield
     */
    draw() {
        Canvas.drawSprites(sprites.shieldImage, this.position, this.dimension);
    }

    /**
     * calculates the vecotr between shield and plane position using plane rotation
     * updates the position of shield by using the plane rotation angle
     * @param {*} planeRotation=angle in radians by which the plane is rotationg
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
      * shieldcored = golbal variable from game class
      * bonus = to find out that star are collected,global variable from game class
      * @memberof shield
      */
    shieldCollisonWithPlane() {
        let starX = this.position.x;
        let starY = this.position.y;
        let planeX = plane.position.x;
        let planeY = plane.position.y;

        let distance = calcDistance(planeX, planeY, starX, starY, plane.radius, this.radius);

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
        }, 5000);
    }
}
let shield = new Shield();
