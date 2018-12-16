class Canvas2D {

    constructor() {

        this.canvas = document.getElementById('screen');
        this.context = this.canvas.getContext('2d', { alpha: false });
    }

    clear(x, y, height, width) {
        this.context.clearRect(x, y, width, height);
    }

    drawSprites(image, position, dimension) {

        position == undefined ? position = new Vector2() : position;

        this.context.drawImage(image, position.x, position.y, dimension.x, dimension.y);

    }

    drawImagePlane(image, position, dimension, origin, rotation = 0) {

        position == undefined ? position = new Vector2() : position;

        origin == undefined ? origin = new Vector2() : origin

        this.context.save();
        this.context.translate(position.x, position.y);
        this.context.rotate(rotation);
        this.context.drawImage(image, -origin.x, -origin.y, dimension.x, dimension.y);
        this.context.restore();
    }
}

let Canvas = new Canvas2D();
