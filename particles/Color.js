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

    /**
     * takes the rgb color value
     * @returns the value as string
     * @memberof Color
     */
    getRGBString() {
        return String(this.r + "," + this.g + "," + this.b);
    }

    /**
     *generates gradient color
     * @param {*} increaseParticleValue = factor to increase the value of rgb
     * @memberof Color
     */
    gradualShift(increaseParticleValue) {
        const COLOR_INCREASE_FACTOR = 225;

        this.r = Math.floor(Math.abs(Math.cos(increaseParticleValue * 0.75) * COLOR_INCREASE_FACTOR));
        this.g = Math.floor(Math.abs(Math.sin(increaseParticleValue * 0.25) * COLOR_INCREASE_FACTOR));
        this.b = Math.floor(Math.abs(Math.sin(increaseParticleValue * 0.5) * COLOR_INCREASE_FACTOR));
    }
}

let color = new Color(255, 255, 255);
