let paused = false;          //checks the state either the game is paused or not
let volumeOn = true;         //checks  the volume of the game (initially on )
let starCollected = 0;       //holds the number of stars that the player collected
let shieldCollected = false; //checks either shield is active or not

/**
 * Main class to run the game handels all events in the game
 * this.score = time which the player plays the game
 * this.initial = checks either the game is opened for the first time or it have been played more
 * this.startMenu = function that calls start menu (it happens before game play begins)
 * @class Game
 */
class Game {

  constructor() {
    this.score = 0;
    this.highScore = 0;
    this.initial = true;
    this.frameCount = 0;
    this.gameOver = false;
    this.reqAnimationFrame;
    this.startGame = false;
    this.startMenuContainer;
    this.gameOverTimeOut;
    this.gameOverMenuContainer;
    this.pauseButton = document.getElementById('pause-btn');
    this.chooseAssetsMenu = document.getElementById('model');
  }

  /**
   *function that initializes the game
   *loads all the components requires for the game from GameWorld
   *also handles the state of pause button
   * @memberof Game
   */
  init() {
    game.startMenu();
    game.pauseMenu();
    this.gameWorld = new GameWorld();
  }

  /**
   * starts the game by calling the game main loop
   * fist funciton to run after loading all assets
   * also handles init function
   * @memberof Game
   */
  start(sprites) {
    game.init();
    game.mainloop();
  }

  /**
   * main funciton that keeps the game running
   * time = handels the main functionality of the game
   * check when to pause the game ,when to stop the game
   * also checks which components to draw when
   * like backgound,plane is drawn earlier than missiles and stars are drawn after gameStart
   * @param {*} time = value given by requestAnimationFrame(its a current time in which the game is running)
   * @returns
   * @memberof Game
   */
  mainloop(time) {
    game.playGameSound();

    if (!paused) {

      time == undefined ? time = 0 : time;

      Canvas.clear(0, 0, Canvas.canvas.width, Canvas.canvas.height);
      game.gameWorld.draw();
      game.gameWorld.update();

      if (game.startGame == true && game.gameOver == false) {

        game.gameWorld.drawAfterGameStart();
        game.drawScoreContents();

      }

      Mouse.resetMouse();
    }

    /**runs the game loop */
    game.reqAnimationFrame = requestAnimationFrame(game.mainloop);

    if (collided == true) {
      cancelAnimationFrame(game.reqAnimationFrame);
      game.startGame = false;
      game.gameOver = true;
      sounds.mainSound.pause();

      game.gameOverTimeOut = setTimeout(() => {
        game.gameOverMenu();
      }, 1000);
      return;
    }

  }

  /**
   * handles the sound of the game
   * checks which sound to play whend
   * generally sound playing is done on the basic of events like start,volumeOn,collided
   * also calculates the distance between plane and missiles and plays missiles sound when it is near the plane only
   * @memberof Game
   */
  playGameSound() {
    if (volumeOn && !paused && !game.gameOver) {
      sounds.mainSound.play();
    }
    else {
      sounds.mainSound.pause();
    }
  }

  /**
   *play pause the game based on boolean paused
   *handles which elements to display when the game is pause or resumed
   * @memberof Game
   */
  pauseMenu() {
    let resumeButton = document.getElementById('resume-btn');

    this.pauseButton.addEventListener('click', () => {
      paused = !paused;
      resumeButton.style.display = "block";
      this.pauseButton.style.display = "none";
    });

    resumeButton.addEventListener('click', () => {
      paused = !paused;
      resumeButton.style.display = "none";
      this.pauseButton.style.display = "block";
    });
  }

  /**
   * main menu of the game
   * handels the events like starting the game while start button is pressed
   * handles volume events
   * handles events like choosing the plane and missiles
   * access the start menu html elements and add functionality to them
   * @memberof Game
   */
  startMenu() {

    this.startMenuContainer = document.getElementById('start-menu');
    let displayHighScore = document.getElementById('high-score-display-startmenu');
    let volumeToggle = document.getElementById('v-toggle');
    let playGame = document.getElementById('play');
    let VON = document.getElementById('v-on');
    let VOFF = document.getElementById('v-off');
    let settings = document.getElementById('settings');
    let cancelModel = document.getElementById('cancel-image');
    let characters = document.getElementsByClassName('content');
    let home = document.getElementById('home-icon');

    displayHighScore.innerHTML = `${localStorage.getItem('highScore') == null ? 0 : localStorage.getItem('highScore')}`

    playGame.addEventListener('click', () => {
      this.startMenuContainer.style.display = "none";
      this.pauseButton.style.display = "block";

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

    home.addEventListener('click', () => {
      this.startMenuContainer.style.display = 'none';
      location.reload();
    });

    settings.addEventListener('click', () => {
      this.startMenuContainer.style.opacity = '0.5';
      this.chooseAssetsMenu.style.display = 'block';
    });

    cancelModel.addEventListener('click', () => {
      this.chooseAssetsMenu.style.display = 'none';
      this.startMenuContainer.style.opacity = '1';
      this.gameOverMenuContainer.style.opacity = '1';
    });

    for (let i = 0; i < characters.length; i++) {
      characters[i].addEventListener('click', () => {
        if (i <= 2) {
          indexOfPlane = i;
        } else if (i >= 2) {
          let index = i - 3;
          indexOfMissiles = index;
        }
        this.chooseAssetsMenu.style.display = 'none';
        this.startMenuContainer.style.opacity = '1';
        this.gameOverMenuContainer.style.opacity = '1';
      });
    }
  }

  /**
   * menu displayed after the game is over
   * access html elements and add functionality to them
   * resets the game by calling resetGame function
   * disply score,highscore to player
   * redirect to start menu
   * @memberof Game
   */
  gameOverMenu() {

    this.gameOverMenuContainer = document.getElementById('game-over-menu');
    let gameOverPlayBtn = document.getElementById('game-over-play');
    let obtainedScore = document.getElementById('obtained-score');
    let yourScoreText = document.getElementById('your-score');
    let yourTime = document.getElementById('scored-content-time');
    let yourStar = document.getElementById('scored-content-star');
    let homeIcon = document.getElementById('gameover-home-icon');
    let scoreTotal = document.getElementById('score-total');
    let bestScore = document.getElementById('best-score-banner');
    let settings = document.getElementById('game-over-settings');

    game.clacHighScore(yourScoreText, bestScore);

    this.pauseButton.style.display = 'none';
    this.gameOverMenuContainer.style.display = "block";
    obtainedScore.innerHTML = this.score;
    yourStar.innerHTML = `+${starCollected}`;
    yourTime.innerHTML = `+${this.score}`;
    scoreTotal.innerHTML = `+${this.score + starCollected}`;

    gameOverPlayBtn.addEventListener('click', () => {
      this.gameOverMenuContainer.style.display = "none";

      clearTimeout(game.gameOverTimeOut);
      cancelAnimationFrame(this.reqAnimationFrame);

      game.resetGame();
      game.start();
    });

    homeIcon.addEventListener('click', () => {
      this.gameOverMenuContainer.style.display = 'none';
      this.startMenuContainer.style.display = 'block';
      location.reload();
    });

    settings.addEventListener('click', () => {
      this.gameOverMenuContainer.style.opacity = '0.5';
      this.chooseAssetsMenu.style.display = 'block';
    });
  }

  /**
   *reset all game events
   *generally runs after game is over
   * @memberof Game
   */
  resetGame() {
    paused = false;
    this.score = 0;
    plane.pArr = [];
    collided = false;
    starCollected = 0;
    game.gameOver = false;
    this.startGame = true;
    shieldCollected = false;
    game.gameWorld.starArray = [];
    game.gameWorld.shieldArray = [];
    game.gameWorld.missilesArray = [];
    game.gameWorld.particlesArray = [];
  }

  /**
   * draws the content on the canvas
   * count score or time the player have played
   * show time played,stars collected in canvas
   * @memberof Game
   */
  drawScoreContents() {

    this.frameCount++;

    if (this.frameCount % 50 == 0) {
      this.score++;
    }

    let min = Math.floor(this.score / 60);
    let sec = this.score - min * 60;

    Canvas.context.fillStyle = "#000"
    Canvas.context.fillText(`${min}:${sec}`, 10, 30);
    Canvas.context.font = "20px cursive";
    Canvas.context.fillText(starCollected, 320, 30);
    Canvas.drawSprites(sprites.star, { x: 350, y: 10 }, { x: 25, y: 25 });
  }

  /**
   *calculate highscore of the game
   *save the highscore in browser localstorage
   * @param {*} yourScoreText = html element displayed after the game is over
   * @param {*} bestScore = html element thai is displayed when player score highscore
   * checks the value in localstorage and current score and calculates highscore
   * @memberof Game
   */
  clacHighScore(yourScoreText, bestScore) {

    if (this.score > localStorage.getItem('highScore')) {
      localStorage.setItem('highScore', this.score);
      let savedScore = localStorage.getItem('highScore');
      yourScoreText.style.display = 'none';
      bestScore.style.display = 'block';
    }
  }
}

let game = new Game();
