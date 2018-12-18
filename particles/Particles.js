class Particles {

    constructor(x, y, radius, rgb_string, vx, vy, id = null) {
        this.radius = radius;
        this.reset(x, y, rgb_string, vx, vy);
        this.id = id;
    }

    reset(x, y, rgb_string, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.rgb_string = rgb_string;
        this.a = 1;
    }

    get color() {
        return "rgba(" + this.rgb_string + "," + this.a + ")";
    }

    updatePosition() {
        this.a -= 0.01;
        this.x -= this.vx * 2;
        this.y -= this.vy * 2;
    }

    draw() {
        Canvas.context.beginPath();
        Canvas.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        Canvas.context.fillStyle = this.color;
        Canvas.context.fill();
        Canvas.context.closePath();
    }

    drawPath() {
        Canvas.context.beginPath();
        Canvas.context.fillRect(this.x, this.y, 5, 5);
        Canvas.context.fillStyle = this.color;
        Canvas.context.fill();
        Canvas.context.closePath();
    }

}
let particle = new Particles();
