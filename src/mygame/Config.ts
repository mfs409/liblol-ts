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

        // The code for building the playable levels
        // this.levelBuilder = 
        // this.splashBuilder =
        // this.chooserBuilder =
        // this.helpBuilder =
        // this.storeBuilder =

        // The images used by this game
        this.imgNames = [
            "assets/audio_off.png",
            "assets/audio_on.png",
            "assets/back.png",
            "assets/backarrow.png",
            "assets/ball.png",
            "assets/blueball.png",
            "assets/box.jpg",
            "assets/chooser.png",
            "assets/colorstar1.png",
            "assets/colorstar2.png",
            "assets/colorstar3.png",
            "assets/colorstar4.png",
            "assets/colorstar5.png",
            "assets/colorstar6.png",
            "assets/colorstar7.png",
            "assets/colorstar8.png",
            "assets/fade.png",
            "assets/fliplegstar1.png",
            "assets/fliplegstar2.png",
            "assets/fliplegstar3.png",
            "assets/fliplegstar4.png",
            "assets/fliplegstar5.png",
            "assets/fliplegstar6.png",
            "assets/fliplegstar7.png",
            "assets/fliplegstar8.png",
            "assets/flystar1.png",
            "assets/flystar2.png",
            "assets/front.png",
            "assets/greenball.png",
            "assets/greyball.png",
            "assets/leftarrow.png",
            "assets/legstar1.png",
            "assets/legstar2.png",
            "assets/legstar3.png",
            "assets/legstar4.png",
            "assets/legstar5.png",
            "assets/legstar6.png",
            "assets/legstar7.png",
            "assets/legstar8.png",
            "assets/leveltile.png",
            "assets/mid.png",
            "assets/msg1.png",
            "assets/msg2.png",
            "assets/mustardball.png",
            "assets/purpleball.png",
            "assets/red.png",
            "assets/redball.png",
            "assets/rightarrow.png",
            "assets/splash.png",
            "assets/starburst1.png",
            "assets/starburst2.png",
            "assets/starburst3.png",
            "assets/starburst4.png",
        ];

        // The sounds used by this game
        this.soundNames = [
            "assets/fwapfwap.ogg",
            "assets/hipitch.ogg",
            "assets/losesound.ogg",
            "assets/lowpitch.ogg",
            "assets/slowdown.ogg",
            "assets/tune.ogg",
            "assets/winsound.ogg",
            "assets/woowoowoo.ogg",
        ];
    }
}
