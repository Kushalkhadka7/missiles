let sprites = {};
let assetStillLoading = 0;

function assetsLoadingLoop(callback) {

    if (assetStillLoading) {
        requestAnimationFrame(assetsLoadingLoop.bind(this, callback));
    } else {
        callback();
    }
}

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
    sprites.background = loadSprites("background1.jpg");
    sprites.plane = loadSprites("plane.png");
    sprites.missile = loadSprites("2.png");
    sprites.pause = loadSprites("menu-assets/pause.png");
    sprites.star = loadSprites("menu-assets/star.png")

    assetsLoadingLoop(callback);
}


