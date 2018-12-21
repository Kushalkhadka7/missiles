/**
 * generates color for particle system
 * takes the value of rgb
 * increase the rgb value with certain given amount direction which helps to generate gradient color
 * @class Color
 */
class Color {

    constructor(r, g, b) {
        this.r = r; this.g = g; this.b = b;
    }

    getRGBString() {
        return String(this.r + "," + this.g + "," + this.b);
    }

    /**
     *generates gradient color
     * @param {*} direction=factor to increase the value of rgb
     * @memberof Color
     */
    gradualShift(direction) {
        this.r = Math.floor(Math.abs(Math.cos(direction * 0.75) * 225));
        this.g = Math.floor(Math.abs(Math.sin(direction * 0.25) * 225));
        this.b = Math.floor(Math.abs(Math.sin(direction * 0.5) * 225));
    }
}

let color = new Color(255, 255, 255);
