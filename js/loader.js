let sounds = {};
let sprites = {};
let assetStillLoading = 0;

/**
 * function to track either all the assets on the game are loaded or not
 * if the assesta are still loading it repeats until all the assets are loaded
 * when the loading process is finished it runs the callback function which is game.start
 * @param {*} callback
 */
let assetsLoadingLoop = (callback) => {

    if (assetStillLoading) {
        requestAnimationFrame(assetsLoadingLoop.bind(this, callback));
    } else {
        callback();
    }
}

/**
 * function to load sprites and sounds in game
 * takes the callback and invokes the assetsLoadingLoop function
 * loads all game assets and makes their corresponding objects
 * @param {*} callback
 */
let loadAssets = (callback) => {

    loadSprites = (fileName) => {
        assetStillLoading++;

        const SPRITE_IMAGE = new Image();
        SPRITE_IMAGE.src = "../assets/" + fileName;

        SPRITE_IMAGE.onload = function () {
            assetStillLoading--;
        }
        return SPRITE_IMAGE;
    }

    loadSounds = id => document.getElementById(id);

    // sprites.background = loadSprites("newbackground.jpg");
    sprites.shieldImage = loadSprites("shield.png");
    sprites.star = loadSprites("menu-assets/star.png");
    sprites.background = loadSprites("background1.jpg");
    sprites.pause = loadSprites("menu-assets/pause.png");
    sprites.plane = [loadSprites("plane1.png"), loadSprites("plane2.svg"), loadSprites("plane2.svg")];
    sprites.missile = [loadSprites("missile2.png"), loadSprites("missile3.png"), loadSprites("missile3.png")];

    sounds.mainSound = loadSounds('main-sound');
    sounds.missileSound = loadSounds('missile-sound');
    sounds.collisonSound = loadSounds('collison-sound');
    sounds.starCollectionSound = loadSounds('star-collection');

    assetsLoadingLoop(callback);
}

