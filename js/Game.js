let reqAnimationFrame;
let startGame = false;
let gameOver = false;
let collided = false;
let bonus = false;
let volumeOn = true;
let paused = false;
let gameOverTimeOut;
let scoreArray = [];


class Game {
    constructor() {
        this.startMenu();
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

        if (startGame == true) {

            game.gameWorld.drawAfterGameStart();
            game.gameWorld.updateAfterGameStart();

        }

        reqAnimationFrame = requestAnimationFrame(game.mainloop);

        if (collided == true || bonus == true) {
            cancelAnimationFrame(reqAnimationFrame);
            startGame = false;
            gameOver = true;
            gameOverTimeOut = setTimeout(() => {
                game.gameOverMenu();
            }, 1000);
        }
    }


    startMenu() {

        let startMenuContainer = document.getElementById('start-menu');
        let volumeToggle = document.getElementById('v-toggle');
        let playGame = document.getElementById('play');
        let VON = document.getElementById('v-on');
        let VOFF = document.getElementById('v-off');

        playGame.addEventListener('click', () => {
            startGame = true;
            gameOver = false;
            startMenuContainer.style.display = "none";

        });

        volumeToggle.addEventListener('click', () => {

            volumeOn = !volumeOn;

            if (volumeOn == false) {
                VON.style.display = 'none';
                VOFF.style.display = 'block';
            } else if (volumeOn == true) {
                VON.style.display = 'block';
                VOFF.style.display = 'none';
            }
        });

    }

    gameOverMenu() {

        let gameOverMenuContainer = document.getElementById('game-over-menu');
        let gameOverPlayBtn = document.getElementById('game-over-play');
        let pauseBtn = document.getElementById('pause-btn');
        let obtainedScore = document.getElementById('obtained-score');

        gameOverMenuContainer.style.display = "block";
        obtainedScore.innerHTML = this.seconds;

        gameOverPlayBtn.addEventListener('click', () => {
            startGame = true;
            gameOver = false;
            gameOverMenuContainer.style.display = "none";
            clearInterval(gameOverTimeOut);
        });
    }
}

let game = new Game();