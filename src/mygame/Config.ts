// TODO: conversion of this file is not yet complete

/**
 * GameConfig gives us a mechanism for telling the framework how it should
 * configure and run our game.
 */
class GameConfig extends LOL.Config {
    /**
     * Set the configuration of the game
     */
    public configure() {
        this.width = 960;
        this.height = 640;
        this.numLevels = 93;
        this.enableVibration = true;
        this.unlockAllLevels = true;
        this.showDebugBoxes = true;
        this.defaultFontFace = "arial";
        this.defaultFontSize = 32;
        this.defaultFontColor = [0, 0, 0];
        this.defaultWinText = "Good Job";
        this.defaultLoseText = "Try Again";
        this.gameTitle = "My Lol Game";
        this.enableChooser = true;
        this.assetFolder = "assets/";

        // The images used by this game
        this.imgNames = [
            "audio_off.png",
            "audio_on.png",
            "back.png",
            "backarrow.png",
            "blueball.png",
            "chooser.png",
            "colorstar1.png",
            "colorstar2.png",
            "colorstar3.png",
            "colorstar4.png",
            "colorstar5.png",
            "colorstar6.png",
            "colorstar7.png",
            "colorstar8.png",
            "fade.png",
            "fliplegstar1.png",
            "fliplegstar2.png",
            "fliplegstar3.png",
            "fliplegstar4.png",
            "fliplegstar5.png",
            "fliplegstar6.png",
            "fliplegstar7.png",
            "fliplegstar8.png",
            "flystar1.png",
            "flystar2.png",
            "front.png",
            "greenball.png",
            "greyball.png",
            "leftarrow.png",
            "legstar1.png",
            "legstar2.png",
            "legstar3.png",
            "legstar4.png",
            "legstar5.png",
            "legstar6.png",
            "legstar7.png",
            "legstar8.png",
            "leveltile.png",
            "mid.png",
            "msg1.png",
            "msg2.png",
            "mustardball.png",
            "purpleball.png",
            "red.png",
            "redball.png",
            "rightarrow.png",
            "splash.png",
            "starburst1.png",
            "starburst2.png",
            "starburst3.png",
            "starburst4.png",
        ];

        // The sounds used by this game
        this.soundNames = [
            "fwapfwap.ogg",
            "hipitch.ogg",
            "losesound.ogg",
            "lowpitch.ogg",
            "slowdown.ogg",
            "tune.ogg",
            "winsound.ogg",
            "woowoowoo.ogg",
        ];

        // The code for building the playable levels
        // this.levelBuilder = 
        this.splashBuilder = new Splash();
        this.chooserBuilder = new Chooser();
        // this.helpBuilder =
        // this.storeBuilder =
    }
}

// This line of code is really important.  It instructs the liblol-ts framework
// to actually start running, using the configuration that we provided above
document.addEventListener("DOMContentLoaded", function () {
    new LOL.Lol(new GameConfig());
});
