let sprites = {};
let sounds = {};
let chooseMissiles = {};
let assetStillLoading = 0;


/**
 *function to track either all the assets to the game are loaded or not
 *if the assesta are still loading it repeats
 *when the loading process is finished it runs the callback function
 * @param {*} callback
 */
function assetsLoadingLoop(callback) {

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
function loadAssets(callback) {

    function loadSprites(fileName) {
        assetStillLoading++;

        let spriteImage = new Image();
        spriteImage.src = "../assets/" + fileName;

        spriteImage.onload = function () {
            assetStillLoading--;
        }
        return spriteImage;
    }

    function loadSounds(id) {
        return document.getElementById(id)
    }


    sprites.background = loadSprites("background1.jpg");
    // sprites.background = loadSprites("newbackground.jpg");
    sprites.plane = [loadSprites("plane1.png"), loadSprites("plane2.svg")];
    sprites.missile = [loadSprites("missile2.png"), loadSprites("missile3.png")];
    sprites.pause = loadSprites("menu-assets/pause.png");
    sprites.star = loadSprites("menu-assets/star.png");
    sprites.shieldImage = loadSprites("shield.png");

    sounds.mainSound = loadSounds('main-sound');
    sounds.collisonSound = loadSounds('collison-sound');
    sounds.starCollectionSound = loadSounds('star-collection');
    sounds.missileSound = loadSounds('missile-sound');

    assetsLoadingLoop(callback);
}

console.log(sprites)
