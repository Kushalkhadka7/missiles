let reqAnimationFrame;
let startGame = false;
let gameOver = false;
let bonus = false;
let starScored = 0;
let volumeOn = true;
let paused = false;
let gameOverTimeOut;
let scoreArray = [];
let shield = false;
let collisonSound;
let mainSound;
// let choosePlanes = {};
// let chooseMissiles = {};

class Game {

    constructor() {

        this.startMenu();
        this.frameCount = 0;
        this.seconds = 0;
        this.highScore = 0;
        this.pauseBtn = document.getElementById('pause-btn');
        this.initial = true;
        this.indexOfImage = indexOfImage;
    }

    init() {

        this.gameWorld = new GameWorld();

        game.pauseMenu();

        // sounds.starCollection.play();

        // collisonSound = document.getElementById('collison-sound');
        // collisonSound.volume = 0.1;

        // mainSound = document.getElementById('main-sound');
        // mainSound.volume = 0.1;

    }

    start() {
        // console.log(game.initial);
        game.init();
        game.mainloop();
    }

    mainloop(time) {

        // game.playGameSound();

        if (!paused) {

            time == undefined ? time = 0 : time;

            Canvas.clear(0, 0, Canvas.canvas.width, Canvas.canvas.height);
            game.gameWorld.draw();
            game.gameWorld.update();

            if (startGame == true && gameOver == false) {

                game.gameWorld.drawAfterGameStart();
                game.gameWorld.updateAfterGameStart();

                game.drawControls();

            }

            Mouse.resetMouse();
        }

        reqAnimationFrame = requestAnimationFrame(game.mainloop);

        if (collided == true) {
            cancelAnimationFrame(reqAnimationFrame);
            startGame = false;
            gameOver = true;

            gameOverTimeOut = setTimeout(() => {
                game.gameOverMenu();
            }, 1000);
            return;
        }

    }

    playGameSound() {

        if (volumeOn && !paused) {
            sounds.mainSound.play();
            if (collided) { sounds.collisonSound.play(); }
            if (starScored) { sounds.starCollectionSound.play(); }
        }
        else {
            sounds.mainSound.pause();
            sounds.collisonSound.pause();
            sounds.starCollectionSound.pause();
        }
    }

    pauseMenu() {
        let resumeBtn = document.getElementById('resume-btn');

        this.pauseBtn.addEventListener('click', () => {
            paused = !paused;
            resumeBtn.style.display = "block";
        });

        resumeBtn.addEventListener('click', () => {
            paused = !paused;
            resumeBtn.style.display = "none";
        });
    }

    startMenu() {

        let startMenuContainer = document.getElementById('start-menu');
        let volumeToggle = document.getElementById('v-toggle');
        let playGame = document.getElementById('play');
        let VON = document.getElementById('v-on');
        let VOFF = document.getElementById('v-off');
        let settings = document.getElementById('settings');
        let model = document.getElementById('model');
        let cancelModel = document.getElementById('cancel-image');
        let immages = document.getElementsByClassName('content');

        playGame.addEventListener('click', () => {
            startMenuContainer.style.display = "none";
            this.pauseBtn.style.display = "block";
            game.resetGame();
            if (!game.initial) {
                game.start();
            }
            game.initial = false;
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

        settings.addEventListener('click', () => {
            startMenuContainer.style.opacity = '0.5';
            model.style.display = 'block';
        });

        cancelModel.addEventListener('click', () => {
            model.style.display = 'none';
            startMenuContainer.style.opacity = '1';
        });

        for (let i = 0; i < immages.length; i++) {
            immages[i].addEventListener('click', (e) => {
                indexOfImage = i;
            });
        }
    }

    setIndexofImage(i) {
        indexOfImage = i;
    }

    gameOverMenu() {

        let gameOverMenuContainer = document.getElementById('game-over-menu');
        let gameOverPlayBtn = document.getElementById('game-over-play');
        let obtainedScore = document.getElementById('obtained-score');
        let yourTime = document.getElementById('scored-content-time');
        let yourStar = document.getElementById('scored-content-star');
        let homeIcon = document.getElementById('home-icon');
        let scoreTotal = document.getElementById('score-total');

        game.clacHighScore();

        this.pauseBtn.style.display = 'none';
        gameOverMenuContainer.style.display = "block";
        obtainedScore.innerHTML = this.seconds;
        yourStar.innerHTML = `+${starScored}`;
        yourTime.innerHTML = `+${this.seconds}`;
        scoreTotal.innerHTML = `+${this.seconds + starScored}`;

        gameOverPlayBtn.addEventListener('click', () => {
            gameOverMenuContainer.style.display = "none";
            clearTimeout(gameOverTimeOut);
            cancelAnimationFrame(reqAnimationFrame);
            game.resetGame();
            game.start();
        });

        homeIcon.addEventListener('click', () => {
            gameOverMenuContainer.style.display = 'none';
            document.getElementById('start-menu').style.display = 'block';
        });
    }

    resetGame() {

        startGame = true;
        gameOver = false;
        collided = false;
        bonus = false;
        paused = false;
        shield = false;
        missilesArray = [];
        particlesArray = [];
        pArr = [];
        megStarArray = [];
        starArray = [];
        this.seconds = 0;
        starScored = 0;

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
        // this.highScore = localStorage.getItem("highscore");

        // if (this.highscore !== null) {
        //     if (this.seconds > this.highscore) {
        //         localStorage.setItem("highscore", this.seconds);
        //     }
        // }
        // else {
        //     localStorage.setItem("highscore", this.seconds);
        // }

        if (this.seconds > this.highScore) {
            window.localStorage.setItem('highScore', this.seconds);
        }

        console.log(window.localStorage.getItem('highScore'));
    }
}

let game = new Game();
