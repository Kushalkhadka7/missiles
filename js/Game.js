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


class Game {

    constructor() {

        this.startMenu();
        this.frameCount = 0;
        this.seconds = 0;
        this.highScore = 0;
        this.pauseBtn = document.getElementById('pause-btn');
        this.initial = true;
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
        game.playGameSound();

        if (!paused) {

            time == undefined ? time = 0 : time;

            //Canvas.clear(0, 0, Canvas.canvas.width, Canvas.canvas.height);
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
            if (collided || missile.destroyed) { sounds.collisonSound.play(); }
            if (starScored) { sounds.starCollectionSound.play(); }

            let distance = calcDistance(
                plane.position.x,
                plane.position.y,
                missile.position.x,
                missile.position.y,
                100, 5
            );
            if (distance) { sounds.missileSound.play(); }
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
            this.pauseBtn.style.display = "none";
        });

        resumeBtn.addEventListener('click', () => {
            paused = !paused;
            resumeBtn.style.display = "none";
            this.pauseBtn.style.display = "block";
        });
    }

    startMenu() {

        let startMenuContainer = document.getElementById('start-menu');
        let displayHighScore = document.getElementById('high-score-display-startmenu');
        let volumeToggle = document.getElementById('v-toggle');
        let playGame = document.getElementById('play');
        let VON = document.getElementById('v-on');
        let VOFF = document.getElementById('v-off');
        let settings = document.getElementById('settings');
        let model = document.getElementById('model');
        let cancelModel = document.getElementById('cancel-image');
        let immages = document.getElementsByClassName('content');

        displayHighScore.innerHTML = `${localStorage.getItem('highScore') == null ? 0 : localStorage.getItem('highScore')}`

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
                if (i <= 2) { indexOfPlane = 1 }
                indexOfMissiles = i;
            });
        }
    }

    gameOverMenu() {

        let gameOverMenuContainer = document.getElementById('game-over-menu');
        let gameOverPlayBtn = document.getElementById('game-over-play');
        let obtainedScore = document.getElementById('obtained-score');
        let yourScoreText = document.getElementById('your-score');
        let yourTime = document.getElementById('scored-content-time');
        let yourStar = document.getElementById('scored-content-star');
        let homeIcon = document.getElementById('home-icon');
        let scoreTotal = document.getElementById('score-total');
        let bestScore = document.getElementById('best-score-banner');

        game.clacHighScore(yourScoreText, bestScore);

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

        let min = Math.floor(this.seconds / 60);
        let sec = this.seconds - min * 60;

        Canvas.context.fillStyle = "#000"
        Canvas.context.fillText(`${min}:${sec}`, 10, 30);
        Canvas.context.font = "20px Arial";
        Canvas.context.fillText(starScored, 320, 30);
        Canvas.drawSprites(sprites.star, { x: 350, y: 10 }, { x: 25, y: 25 });
    }

    clacHighScore(yourScoreText, bestScore) {
        if (this.seconds > localStorage.getItem('highScore')) {
            localStorage.setItem('highScore', this.seconds);
            let savedScore = localStorage.getItem('highScore');
            yourScoreText.style.display = 'none';
            bestScore.style.display = 'block';
        }
    }
}

let game = new Game();
