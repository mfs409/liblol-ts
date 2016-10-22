// TODO: conversion of this file is not yet complete

///<reference path="../../typings/Pixi.d.ts" />
///<reference path="../../typings/PhysicsType2d.v0_9.d.ts" />
///<reference path="../../typings/howler.d.ts" />
///<reference path="../../typings/hammer.d.ts" />

// Keep typescript happy:
interface Window {
    webkitRequestAnimationFrame: number;
    mozRequestAnimationFrame: any;
    oRequestAnimationFrame: any;
    msRequestAnimationFrame: any;
};

module LOL {

    /**
     * Provide configuration for a game.  The configuration takes three parts.  
     * First, there are the default values for things like screen size, 
     * on-screen text, etc.  Second, there are the names of any media files to 
     * load.  Third, there are a few ScreenManager objects, which explain how to
     * build the interactive parts of the game.
     */
    export abstract class Config {
        /**
         * The number of pixels per meter.  You probably don't want to change 
         * this  
         */
        public PIXELS_PER_METER: number = 20;

        /**
         * The width of the screen
         */
        public width: number = 0;

        /**
         * The height of the screen
         */
        public height: number = 0;

        /**
         * The names of all images to load
         */
        public imgNames: string[] = null;

        /**
         * The names of all sound files to load
         */
        public soundNames: string[] = null;

        /**
         * The total number of levels.  We need this in order to know what to
         * do when the last level is completed.
         */
        public numLevels: number = 1;

        /**
         * Should the phone vibrate on certain events?
         */
        public enableVibration: boolean = true;

        /**
         * Should all levels be unlocked?
         */
        public unlockAllLevels: boolean = false;

        /**
         * This is a debug feature, to help see the physics behind every Actor
         */
        public showDebugBoxes: boolean = true;

        /**
         * When drawing text, this is the default font to use
         */
        public defaultFontFace: string = "arial";

        /**
         * When drawing text, this is the default font size to use
         */
        public defaultFontSize: number = 32;

        /**
         * When drawing text, this is the default font color.  Colors consist
         * of three integers between 0 and 255, corresponding to red, green, and
         * blue components of the color.
         */
        public defaultFontColor: number[] = [0, 255, 0];

        /**
         * Default text to display when the level is won.
         */
        public defaultWinText: string = "Default Win Text";

        /**
         * Default text to display when the level is lost
         */
        public defaultLoseText: string = "Default Lose Text";

        /**
         * Title of the game (for desktop mode)
         * 
         * TODO: do we still need this?
         */
        public gameTitle: string = "Game Title";

        /**
         * Should the level chooser be activated?
         */
        public enableChooser: boolean = true;

        /**
         * The ScreenManager that will be used to draw the levels of the game
         */
        public levelBuilder: ScreenManager = null;

        /**
         * The level chooser is drawn by this object
         */
        public chooserBuilder: ScreenManager = null;

        /**
         * The help screen is drawn by this object
         */
        public helpBuilder: ScreenManager = null;

        /**
         * The opening (splash) screen is drawn by this object
         */
        public splashBuilder: ScreenManager = null;

        /**
         * The store is drawn by this object
         */
        public storeBuilder: ScreenManager = null;

        /**
         * The folder in which assets are stored
         */
        public assetFolder: string = "";

        /**
         * The configure() function is called to set the game configuration
         */
        public abstract configure();
    }

    /**
     * Modes of the game: we can be showing the main splash screen, the help
     * screens, the level chooser, the store, or a playable level
     */
    enum MODES {
        SPLASH = 0,
        HELP,
        CHOOSER,
        STORE,
        PLAY
    }

    /**
     * A Lol object is the outermost container for all of the functionality of
     * the game.  Its main role is to run a state machine, so we know which 
     * ScreenManager is active, and what state it is in.  Splash screens, 
     * Choosers, Help, and playable Levels each implement Screen, so that they 
     * can do the real work.
     */
    export class Lol {
        /**
         * The current mode of the program (from among the above choices)
         */
        private mode: number = 0;

        /**
         * The mode state is used to represent the current level within a mode
         * (i.e., 3rd help screen, or 5th page of the store). Tracking state
         * separately for each mode makes going between a level and the chooser much
         * easier.
         */
        private modeStates: number[] = [0, 0, 0, 0, 0];

        /**
         * inputManager is responsible for routing touch events into events that 
         * get processed correctly by the game
         */
        private inputManager: InputManager = null;

        /**
         * The current level being shown
         * 
         * TODO: this is public for now, but we should not keep it so
         */
        public activeLevel: Level = null;

        /**
         * All configuration information for this game
         */
        public config: Config = null;

        /**
         * The renderer, who is responsible for drawing everything on the screen.
         */
        private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer = null;

        /**
         * Use this to load the splash screen
         */
        public doSplash(): void {
            // when we move to splash, all other screens get reset
            for (let i = 0; i < 5; ++i) {
                this.modeStates[i] = 1;
            }
            // update the state machine, show the screen
            this.mode = MODES.SPLASH;
            // TODO: we probably need to shut down the previous level first...
            this.config.splashBuilder.display(1, this);
        }

        /**
         * Use this to load the level-chooser screen. Note that when the chooser is
         * disabled, we jump straight to level 1.
         *
         * @param whichChooser The chooser screen to create
         */
        public doChooser(whichChooser: number) {
            // if chooser disabled, then we either called this from splash, or from
            // a game level

            // TODO: we probably need to shut down the previous level first...

            if (!this.config.enableChooser) {
                if (this.mode === MODES.PLAY) {
                    // TODO: we probably need to shut down the previous level first...
                    this.doSplash();
                } else {
                    // TODO: we probably need to shut down the previous level first...
                    this.doLevel(this.modeStates[MODES.PLAY]);
                }
                return;
            }
            // the chooser is not disabled... save the choice of level, configure
            // it, and show it.
            this.mode = MODES.CHOOSER;
            this.modeStates[MODES.CHOOSER] = whichChooser;
            // TODO: we probably need to shut down the previous level first...
            this.config.chooserBuilder.display(whichChooser, this);
        }

        /**
         * Use this to load a playable level.
         *
         * @param which The index of the level to load
         */
        public doLevel(which: number) {
            this.modeStates[MODES.PLAY] = which;
            this.mode = MODES.PLAY;
            // TODO: we probably need to shut down the previous level first...
            this.config.levelBuilder.display(which, this);
        }

        /**
         * Use this to load a help level.
         *
         * @param which The index of the help level to load
         */
        public doHelp(which: number) {
            this.modeStates[MODES.HELP] = which;
            this.mode = MODES.HELP;
            // TODO: we probably need to shut down the previous level first...
            this.config.helpBuilder.display(which, this);
        }

        /**
         * Use this to load a screen of the store.
         *
         * @param which The index of the help level to load
         */
        public doStore(which: number) {
            this.modeStates[MODES.STORE] = which;
            this.mode = MODES.STORE;
            // TODO: we probably need to shut down the previous level first...
            this.config.storeBuilder.display(which, this);
        }

        /**
         * Use this to quit the game
         */
        public doQuit() {
            // TODO: we probably need to shut down the previous level first...
            window.alert("The quit button only works for the mobile app");
            // TODO: need to put a cordova hook in here to actually close when we're mobile
            window.close();
        }

        /**
         * Initialize and launch the game.  This code should be called by the
         * programmer, and it will initiate the sequence of loading assets and
         * then running the code to display the splash screen.
         * 
         * @param cfg: A Config object, for describing how to build the game
         */
        constructor(cfg: Config) {
            // Step 1: Normalize for differences in browsers.  In particular, 
            // make sure we have a requestAnimationFrame() function on the window  
            if (!window.requestAnimationFrame) {
                window.requestAnimationFrame =
                    window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
                    function (callback) {
                        window.setTimeout(callback, 1000 / 60);
                    };
            }

            // Update the game configuration
            cfg.configure();
            this.config = cfg;

            // Set up the level object, for managing whatever Level is active
            this.activeLevel = new Level();

            // Put a renderer into the HTML
            // TODO: we should have a parameter for the name of the DOM element
            // into which we should put the renderer
            this.renderer = PIXI.autoDetectRenderer(cfg.width, cfg.height);
            // TODO: when we put this onto a phone, where we expect a reasonable
            // guaranteed screen ratio, we probably want to add these two lines:
            // this.renderer.view.style.width = window.innerWidth + "px";
            // this.renderer.view.style.height = window.innerHeight + "px";
            document.body.appendChild(this.renderer.view);

            // Configure touch and gesture input for the renderer
            this.inputManager = new InputManager();
            this.inputManager.configure(this.renderer.view, this);

            // Step 3: load graphics assets... this will trigger the next step once assets are loaded
            let that = this;
            PIXI.loader.baseUrl = this.config.assetFolder;
            PIXI.loader.add(this.config.imgNames).load(function () { that.onLoadAssets(); });

            // TODO: is there a way to pre-load audio assets?
        }

        /**
         * After the assets are loaded, we can go ahead and start building a 
         * level
         */
        private onLoadAssets() {
            // When the assets get loaded, we should start showing the splash
            // screen
            this.doSplash();

            // TODO: depending on how we ultimately decide to do the rendering,
            // we might need to kick off rendering here
            this.render();

            // TODO: depending on how we ultimately decide to implement an 
            // input controller, we might need to kick off input handling here
        }

        /**
         * Handle input and timers, and then render the next screen of the game
         */
        private render() {
            // schedule next render (that is, schedule next call to this 
            // function)
            let that = this;
            requestAnimationFrame(function () { that.render(); });

            // Prepare the world for rendering
            this.activeLevel.render(this.renderer, this);
        }
    }
}

// public abstract class Lol extends Game {

//     /**
//      * Store string/integer pairs that get reset whenever we restart the program
//      */
//     final TreeMap<String, Integer> mSessionFacts = new TreeMap<>();

//     /**
//      * A per-game string, to use for storing information on an Android device
//      */
//     protected String mStorageKey;

//     /**
//      * This variable lets us track whether the user pressed 'back' on an
//      * android, or 'escape' on the desktop. We are using polling, so we swallow
//      * presses that aren't preceded by a release. In that manner, holding 'back'
//      * can't exit all the way out... you must press 'back' repeatedly, once for
//      * each screen to revert.
//      */
//     boolean mKeyDown;
//     /**
//      * Store all the images, sounds, and fonts for the game
//      */
//     Media mMedia;

//     /*
//      * APPLICATIONLISTENER (GAME) OVERRIDES
//      */



//     /*
//      * PUBLIC INTERFACE
//      */

//     /**
//      * Use this to manage the state of Mute
//      */
//     public static void toggleMute() {
//         // volume is either 1 or 0
//         if (Facts.getGameFact("volume", 1) == 1) {
//             // set volume to 0, set image to 'unmute'
//             Facts.putGameFact("volume", 0);
//         } else {
//             // set volume to 1, set image to 'mute'
//             Facts.putGameFact("volume", 1);
//         }
//         // update all music
//         Media.resetMusicVolume();
//     }

//     /**
//      * Use this to determine if the game is muted or not. True corresponds to
//      * not muted, false corresponds to muted.
//      */
//     public static boolean getVolume() {
//         return Facts.getGameFact("volume", 1) == 1;
//     }

//     /**
//      * Report whether all levels should be treated as unlocked. This is useful
//      * in Chooser, where we might need to prevent some levels from being played.
//      */
//     public static boolean getUnlockMode() {
//         return sGame.mUnlockAllLevels;
//     }

//     /**
//      * Vibrate the phone for a fixed amount of time. Note that this only
//      * vibrates the phone if the configuration says that vibration should be
//      * permitted.
//      *
//      * @param millis The amount of time to vibrate
//      *
//      * TODO: see https://www.sitepoint.com/use-html5-vibration-api/
//      */
//     void vibrate(int millis) {
//         if (mEnableVibration)
//             Gdx.input.vibrate(millis);
//     }

//     /**
//      * We can call this method from the render loop to poll for back presses
//      */
//     private void handleKeyDown() {
//         // if neither BACK nor ESCAPE is being pressed, do nothing, but
//         // recognize future presses
//         if (!Gdx.input.isKeyPressed(Keys.BACK) && !Gdx.input.isKeyPressed(Keys.ESCAPE)) {
//             mKeyDown = false;
//             return;
//         }
//         // if they key is being held down, ignore it
//         if (mKeyDown)
//             return;
//         // recognize a new back press as being a 'down' press
//         mKeyDown = true;
//         handleBack();
//     }

//     /**
//      * When the back key is pressed, or when we are simulating the back key
//      * being pressed (e.g., a back button), this code runs.
//      */
//     public void handleBack() {
//         // clear all timers, just in case...
//         Timer.instance().clear();
//         // if we're looking at main menu, then exit
//         if (mMode == SPLASH) {
//             dispose();
//             Gdx.app.exit();
//         }
//         // if we're looking at the chooser or help, switch to the splash
//         // screen
//         else if (mMode == CHOOSER || mMode == HELP || mMode == STORE) {
//             doSplash();
//         }
//         // ok, we're looking at a game scene... switch to chooser
//         else {
//             doChooser(sGame.mModeStates[CHOOSER]);
//         }
//     }

//     /**
//      * This is an internal method for initializing a game. User code should
//      * never call this.
//      */
//     @Override
//     public void create() {
//         // save instance
//         sGame = this;

//         // set current mode states
//         for (int i = 0; i < 5; ++i)
//             mModeStates[i] = 1;

//         // for handling back presses
//         Gdx.input.setCatchBackKey(true);

//         // Load Resources
//         mMedia = new Media();
//         loadResources();

//         // configure the volume
//         if (Facts.getGameFact("volume", 1) == 1)
//             Facts.putGameFact("volume", 1);

//         // show the splash screen
//         doSplash();
//     }

//     /**
//      * This is an internal method for drawing game levels. User code should
//      * never call this.
//      */
//     @Override
//     public void render() {
//         // Check for back press
//         handleKeyDown();
//         // Draw the current scene
//         super.render();
//     }

// }
