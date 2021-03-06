// TODO: conversion of this file is not yet complete

/**
 * Splash encapsulates the code that will be run to configure the opening screen
 * of the game. Typically this has buttons for playing, getting help, and
 * quitting.
 */
class Splash implements LOL.ScreenManager {

    /**
     * There is usually only one splash screen. However, the ScreenManager
     * interface requires display() to take a parameter.  We ignore it.
     * 
     * @param which: the splash screen index.  Should always be 1.  ignore it
     * @param game: the game into which we are creating this splash screen
     */
    public display(which: number, game: LOL.Lol) {
        // set up a simple level. We could make interesting things happen, since
        // we've got a physics world, but we won't.
        game.activeLevel.initialize(48, 32);
        game.activeLevel.setPhysics(0, 0);

        // draw the background. Note that "Play", "Help", and "Quit" are part of
        // this background image.
        LOL.Util.drawPicture(0, 0, 48, 32, "splash.png", 0, game);

        // start the music
        // TODO: this API needs some work...
        game.activeLevel.setMusic("tune.ogg", game);

        // This is the Play button... it switches to the first screen of the
        // level chooser. You could jump straight to the first level by using
        // "doLevel(1)", but check the configuration in MyLolGame... there's a
        // field you should change if you don't want the 'back' button to go
        // from that level to the chooser.
        let cb = new LOL.LolCallback(function () { game.doChooser(1); });
        LOL.Control.addCallbackControl(384, 352, 190, 115, "", cb, game);

        // This is the Help button... it switches to the first screen of the
        // help system
        LOL.Control.addCallbackControl(96, 186, 160, 80, "", new LOL.LolCallback(function () { game.doHelp(1); }), game);

        // This is the Quit button
        LOL.Control.addCallbackControl(726, 186, 138, 78, "", new LOL.LolCallback(function () { game.doQuit(); }), game);

        // Mute button is a tad tricky... we'll do it as an obstacle
        let o = LOL.Obstacle.makeAsBox(45, 29, 3, 3, "", game);
        //         // figure out which image to use for the obstacle based on the current
        //         // volume state
        //         if (Lol.getVolume()) {
        //             o.setImage("audio_off.png", 0);
        //         } else {
        //             o.setImage("audio_on.png", 0);
        //         }
        //         // when the obstacle is touched, change the mute and then update the
        //         // picture for the obstacle
        //         o.setTouchCallback(0, 0, 0, 0, false, new LolCallback() {
        //             public void onEvent() {
        //                 Lol.toggleMute();
        //                 if (Lol.getVolume()) {
        //                     mAttachedActor.setImage("audio_off.png", 0);
        //                 } else {
        //                     mAttachedActor.setImage("audio_on.png", 0);
        //                 }
        //             }
        //         });
    }
}
