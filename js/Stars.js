/**
 * generates stars in the game play
 * this.radius =  radius of the star
 * this.position = random position of the stars
 * this.dimension = width and height of the stars
 * this.velocity = speed by which the stars are moving
 * this.destroyed = checks either the stars are collected by the plane or not
 * DISTANCE_FORM_PLANE_CENTER  = distance from plane center to the outer border more than its radius
 * @class Stars
 */

const RADIUS_OF_STARS = 5;
const DISTANCE_FORM_PLANE_CENTER = 20;

class Stars {

    constructor() {
        this.radius = RADIUS_OF_STARS;
        this.velocity = 1;
        this.destroyed = false;
        this.dimension = new Vector2(20, 20);
        this.position = new Vector2(random(100, 400), random(100, 600));
    }

    /**
     * draws stars to the canvas by calling canvas drawSprites method
     * arguments are src of image,position where image to be drawn,width and height of the star image
     * @memberof Stars
     */
    draw() {
        Canvas.drawSprites(sprites.star, this.position, this.dimension);
    }

    /**
     * updates the stars in each request animation frame
     * calculates the vector between the angle of plane rotation(x and y)
     * moves the stars opposite to the plane heading
     * @param {*} planeRotation=angle by which the plane is rotating (paramater from GameWorld )
     * @memberof Stars
     */
    update(planeRotation) {

        let y = Math.sin(planeRotation);
        let x = Math.cos(planeRotation);

        this.position.x -= x * this.velocity;
        this.position.y -= y * this.velocity;
    }

    /**
     * check the collison between plane and the stars
     * calculate the distance between the plane and the stars and detect collison by comparing
        the distance with the sum of their radii
     * if star are collided marks them as collected by this.destroyed = true
     * increase the score based on how many stars are collected
     * starScored = golbal variable from game class
     * bonus = to find out that star are collected,global variable from game class
     * @memberof Stars
     */
    starCollisonWithPlane() {
        let starX = this.position.x;
        let starY = this.position.y;
        let planeX = plane.position.x - DISTANCE_FORM_PLANE_CENTER;
        let planeY = plane.position.y - DISTANCE_FORM_PLANE_CENTER;

        let distance = calcDistance(planeX, planeY, starX, starY, plane.radius, this.radius);

        if (distance == true) {
            bonus = true;
            this.destroyed = true;
            starScored++;
        }
    }
}
let star = new Stars();
