let reqAnimationFrame;
let startGame = false;
let gameOver = false;
let collided = false;
let bonus = false;
let starScored = 0;
let volumeOn = true;
let paused = false;
let gameOverTimeOut;
let scoreArray = [];

class Game {
    constructor() {

        this.startMenu();
        this.frameCount = 0;
        this.seconds = 0;

    }

    init() {

        this.gameWorld = new GameWorld();
    }

    start() {

        game.init();
        game.mainloop();
    }

    mainloop(time) {

        time == undefined ? time = 0 : time;

        Canvas.clear(0, 0, Canvas.canvas.width, Canvas.canvas.height);
        game.gameWorld.draw();
        game.gameWorld.update();

        if (startGame == true && gameOver == false) {

            game.gameWorld.drawAfterGameStart();
            game.gameWorld.updateAfterGameStart();

            game.drawControls();
            game.clacHighScore();

        }

        Mouse.resetMouse();

        reqAnimationFrame = requestAnimationFrame(game.mainloop);

        if (collided == true) {

            cancelAnimationFrame(reqAnimationFrame);
            startGame = false;
            gameOver = true;

            let pauseBtn = document.getElementById('pause-btn');
            pauseBtn.style.display = "none";

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
        let pauseBtn = document.getElementById('pause-btn');
        pauseBtn.style.display = "none";

        playGame.addEventListener('click', () => {
            startGame = true;
            gameOver = false;
            startMenuContainer.style.display = "none";
            pauseBtn.style.display = "block";
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
        let obtainedScore = document.getElementById('obtained-score');
        let yourTime = document.getElementById('scored-content-time');
        let yourStar = document.getElementById('scored-content-star');

        gameOverMenuContainer.style.display = "block";
        obtainedScore.innerHTML = this.seconds;
        yourStar.innerHTML = `+${starScored}`;
        yourTime.innerHTML = `${this.seconds}`;

        gameOverPlayBtn.addEventListener('click', () => {
            startGame = true;
            gameOver = false;
            gameOverMenuContainer.style.display = "none";
            clearInterval(gameOverTimeOut);
        });
    }

    drawControls() {

        this.frameCount++;

        if (this.frameCount % 50 == 0) {
            this.seconds++;
        }

        Canvas.context.fillStyle = "#000"
        Canvas.context.fillText(this.seconds, 10, 30);
        Canvas.context.font = "20px Arial";
        Canvas.context.fillText(starScored, 320, 30);
        Canvas.drawSprites(sprites.star, { x: 350, y: 10 }, { x: 25, y: 25 });
    }

    clacHighScore() {

        if (this.seconds > this.highScore) {
            window.localStorage.setItem('highScore', this.seconds);
        }
    }
}

let game = new Game();