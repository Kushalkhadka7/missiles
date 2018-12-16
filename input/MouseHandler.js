class MouseHandler {

    constructor() {
        this.left = new ButtonState();
        this.right = new ButtonState();
        this.middle = new ButtonState();

        document.onmousemove = this.handleMouseMove;
        document.onmousedown = this.handleMouseDown;
        document.onmouseup = this.handleMouseUp;
    }

    handleMouseMove(event) {
        let x = event.clientX;
        let y = event.clientY;
        Mouse.position = new Vector2(x, y);
    }

    handleMouseDown(event) {

        Mouse.handleMouseMove(event);
        if (event.which === 1) {
            if (!Mouse.left.down) {
                Mouse.left.pressed = true;
            }
            Mouse.left.down = true;
        } else if (event.which === 2) {
            if (!Mouse.middle.down) {
                Mouse.middle.pressed = true;
            }
            Mouse.middle.down = true;
        } else if (event.which === 3) {
            if (!Mouse.right.down) {
                Mouse.right.pressed = true;
            }
            Mouse.right.down = true;
        }
    }

    handleMouseUp(event) {
        Mouse.handleMouseMove(event);

        if (event.which === 1) {
            Mouse.left.down = false;
        } else if (event.which === 2) {
            Mouse.middle.down = false;
        } else if (event.which === 3) {
            Mouse.right.down = false;
        }
    }

    resetMouse() {
        this.left.pressed = false;
        this.middle.pressed = false;
        this.right.pressed = false;
    }

}

let Mouse = new MouseHandler();
