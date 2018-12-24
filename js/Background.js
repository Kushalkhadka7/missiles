/**
 * game background
 * this.velocity = velocity by which the background is moving
 * this.position = points where the background to be drawn
 * this.backgroundDimensions = widht and height of the background image
 * this.x and this.y are vectors by which the direction of background is calculated
 * @class Background
 */
class Background {

  constructor() {
    this.x;
    this.y;
    this.velocity = 3;
    this.position = new Vector2(-1000, -1000);
    this.backgroundDimensions = new Vector2(5000, 5000);
  }

  /**
   * draw background
   * call to the canvas2D class drawSprites method to draw the background
   * sprites.background = source of the background image
   * this.position = position of the background image(x and y)
   * this.dimension= width and height of the background image
   * @memberof Background
   */
  draw() {
    Canvas.drawSprites(sprites.background, this.position, this.backgroundDimensions);
  }

  /**
   * update the background image movements
   * calculates the vector using the angel of rotation of the plane to calculate the background movement direction
   * moves the background opposite to the direciton of plane heading
   * swaps the backgorund when it ends
   * updates the background positon in each interval
   * @param {*} planeRotation=angle by which the plane is rotating
   * @memberof Background
   */
  update(planeRotation) {

    this.x = Math.cos(planeRotation);
    this.y = Math.sin(planeRotation);

    this.position.x -= this.x * this.velocity;
    this.position.y -= this.y * this.velocity;

    if (this.position.x > -800) { this.position.x = -4000; }
    if (this.position.x < -4000) { this.position.x = -800; }
    if (this.position.y > -800) { this.position.y = -4000; }
    if (this.position.y < -4000) { this.position.y = -800; }
  }
}

