class Game {
    constructor() {

    }

    init() {
        this.gameWorld = new GameWorld();
    }

    start() {
        game.init();
        game.mainloop();
    }

    mainloop(time) {

        Canvas.clear(0, 0, Canvas.canvas.width, Canvas.canvas.height);
        game.gameWorld.draw();
        game.gameWorld.update();
        requestAnimationFrame(game.mainloop)
    }
}

let game = new Game();