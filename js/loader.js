let sounds = {};       //sound object which holds all sounds
let sprites = {};      //sprites object which holds all images
let assetsCounter = 0; //countet that detects either all assets are loaded or not

/**
 * function to track either all the assets on the game are loaded or not
 * if the assests are still loading it repeats until all the assets are loaded
 * when the loading process is finished it runs the callback function (game.start)
 * @param {*} callback
 */
let assetsLoadingLoop = (callback) => {

  if (assetsCounter) {
    requestAnimationFrame(assetsLoadingLoop.bind(this, callback));
  } else {
    callback();
  }
}

/**
 * function to load sprites and sounds in the game
 * takes the callback and invokes the assetsLoadingLoop function
 * loads all game assets and makes their corresponding objects
 * @param {*} callback
 */
let loadAssets = (callback) => {

  loadSprites = (fileName) => {
    assetsCounter++;

    const SPRITE_IMAGE = new Image();
    SPRITE_IMAGE.src = './assets/' + fileName;

    SPRITE_IMAGE.onload = function () {
      assetsCounter--;
    }
    return SPRITE_IMAGE;
  }

  loadSounds = id => document.getElementById(id);

  sprites.shield = loadSprites('shield.png');
  sprites.star = loadSprites('menu-assets/star.png');
  sprites.background = loadSprites("background1.jpg");
  sprites.pause = loadSprites("menu-assets/pause.png");
  sprites.plane = [
    loadSprites("plane1.png"),
    loadSprites("plane2.svg"),
    loadSprites("plane2.svg")
  ];
  sprites.missile = [
    loadSprites("missile2.png"),
    loadSprites("missile3.png"),
    loadSprites("missile3.png")
  ];

  sounds.mainSound = loadSounds('main-sound');
  sounds.missileSound = loadSounds('missile-sound');
  sounds.collisonSound = loadSounds('collison-sound');
  sounds.starCollectionSound = loadSounds('star-collection');

  assetsLoadingLoop(callback);
}



