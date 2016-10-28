// TODO: conversion of this file is not yet complete

module LOL {

    /**
     * A Level is an interactive portion of the game. Levels can be infinite, or
     * they can have an end goal. 
     * 
     * Level has two components. One is the part that is visible to the game
     * designer, which involves some limited control over the camera and music,
     * and timers for requesting that custom code run after a fixed amount of
     * time. These timers can also be attached to a specific actor, if desired.
     * Internally, Level is responsible for managing a set of cameras used to
     * display everything that appears on the screen. It is also responsible for
     * keeping track of everything on the screen (Actors, Controls, and
     * Displays), so we can draw the game correctly.
     *
     * Note that everything in Lol is a level... the splash screen, the choosers,
     * the help, and the game levels themselves.
     */
    export class Level {

        /**
         * Any visual entity that we wish to draw on the heads-up display
         */
        public hudSprites: Renderable[] = null;

        /**
         * Any visual entity that exists in the physics world, even if it 
         * doesn't have physics attached to it.
         */
        public worldSprites: Renderable[] = null;

        /**
         * The physics world in which all actors exits
         */
        public world: PhysicsType2d.Dynamics.World = null;

        /**
         * A list of all actors, so that we can update their sprites whenever 
         * the world advances
         */
        public actors: Actor[] = [];

        /**
         * Boundaries on the physics dimensions of the world
         */
        private worldBoundaries: PhysicsType2d.Vector2 = new PhysicsType2d.Vector2(0, 0);

        /**
         * The music, if any
         */
        private music: Howl = null;

        /**
         * Whether the music is playing or not
         */
        private musicPlaying: boolean = false;

        /**
         * Each time the game wants to render the current screen, it needs to
         * request that the level advance the world and update all actors
         * coordinates
         * 
         * @param renderer: The PIXI renderer to use for rendering
         */
        public render(renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer, game: Lol) {
            //         // in debug mode, any click will report the coordinates of the click...
            //         // this is very useful when trying to adjust screen coordinates
            //         if (Lol.sGame.mShowDebugBoxes) {
            //             if (Gdx.input.justTouched()) {
            //                 mHudCam.unproject(mTouchVec.set(Gdx.input.getX(), Gdx.input.getY(), 0));
            //                 Util.message("Screen Coordinates", mTouchVec.x + ", " + mTouchVec.y);
            //                 mGameCam.unproject(mTouchVec.set(Gdx.input.getX(), Gdx.input.getY(), 0));
            //                 Util.message("World Coordinates", mTouchVec.x + ", " + mTouchVec.y);

            //             }
            //         }

            // Make sure the music is playing... Note that we start music before the
            // PreScene shows
            this.playMusic();

            //         // Handle pauses due to pre, pause, or post scenes...
            //         //
            //         // Note that these handle their own screen touches...
            //         //
            //         // Note that win and lose scenes should come first.
            //         if (mWinScene != null && mWinScene.render(mSpriteBatch))
            //             return;
            //         if (mLoseScene != null && mLoseScene.render(mSpriteBatch))
            //             return;
            //         if (mPreScene != null && mPreScene.render(mSpriteBatch))
            //             return;
            //         if (mPauseScene != null && mPauseScene.render(mSpriteBatch))
            //             return;

            //         // handle accelerometer stuff... note that accelerometer is effectively
            //         // disabled during a popup... we could change that by moving this to the
            //         // top, but that's probably not going to produce logical behavior
            //         Lol.sGame.mCurrentLevel.mTilt.handleTilt();

            // Advance the physics world by 1/60 of a second.
            this.world.Step(1.0 / 60.0, 8, 3);
            this.world.ClearForces();

            //         // now handle any events that occurred on account of the world movement
            //         // or screen touches
            //         for (LolAction pe : mOneTimeEvents)
            //             pe.go();
            //         mOneTimeEvents.clear();

            //         // handle repeat events
            //         for (LolAction pe : mRepeatEvents)
            //             pe.go();

            //         // check for end of game
            //         if (mEndGameEvent != null)
            //             mEndGameEvent.go();

            //         // The world is now static for this time step... we can display it!

            //         // clear the screen
            //         Gdx.gl.glClearColor(mBackground.mColor.r, mBackground.mColor.g, mBackground.mColor.b, 1);
            //         Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);

            //         // prepare the main camera... we do it here, so that the parallax code
            //         // knows where to draw...
            //         adjustCamera();
            //         mGameCam.update();

            //         // draw parallax backgrounds
            //         mBackground.renderLayers(mSpriteBatch, delta);

            // Update actor sprite positions
            let n = this.actors.length;
            for (let i = 0; i < n; i++) {
                let actor = this.actors[i];
                if (actor.visible && actor.mVisible) {
                    let body = actor.body;
                    let position = body.GetPosition();
                    let sprite = actor.image;
                    // TODO: mapping will change once game doesn't fit in the 
                    // PIXI container
                    // TODO: need to do some pruning to hide off-screen stuff
                    sprite.position.x = position.x * game.config.PIXELS_PER_METER;
                    sprite.position.y = position.y * game.config.PIXELS_PER_METER;
                    sprite.rotation = body.GetAngle();
                }
            }


            // Render the actors in order from z=-2 through z=2
            let layers: PIXI.Container[] = [null, null, null, null, null];
            for (let i = 0; i < 5; ++i) {
                layers[i] = new PIXI.Container();
            }
            for (let i = 0; i < this.worldSprites.length; ++i) {
                let a = this.worldSprites[i];
                if (a.image !== null) {
                    layers[a.zIndex + 2].addChild(a.image);
                }
            }
            // TODO: this isn't the best way to manage clearBeforeRender...
            renderer.clearBeforeRender = true;
            renderer.backgroundColor = 0xFFFFFF;
            renderer.render(layers[0]);
            renderer.clearBeforeRender = false;
            for (let i = 1; i < 5; ++i) {
                renderer.render(layers[i]);
            }

            //         mSpriteBatch.setProjectionMatrix(mGameCam.combined);
            //         mSpriteBatch.begin();
            //         for (ArrayList<Renderable> a : mRenderables)
            //             for (Renderable r : a)
            //                 r.render(mSpriteBatch, delta);
            //         mSpriteBatch.end();

            //         // draw parallax foregrounds
            //         mForeground.renderLayers(mSpriteBatch, delta);


            //         // DEBUG: draw outlines of physics actors
            //         if (Lol.sGame.mShowDebugBoxes)
            //             mDebugRender.render(mWorld, mGameCam.combined);

            // draw Controls
            //         mHudCam.update();
            //         mSpriteBatch.setProjectionMatrix(mHudCam.combined);
            //         mSpriteBatch.begin();


            let container: PIXI.Container = new PIXI.Container();
            for (let i = 0; i < this.mControls.length; ++i) {
                let c = this.mControls[i];
                if (c.visible) {
                    container.addChild(c.image);
                }
            }
            renderer.render(container);


            //         for (Display d : mDisplays)
            //             d.render(mSpriteBatch);
            //         mSpriteBatch.end();


            // DEBUG: render Controls' outlines in red
            if (game.config.showDebugBoxes) {
                let g = new PIXI.Graphics();
                g.lineStyle(1, 0xFF0000);
                for (let i = 0; i < this.mControls.length; ++i) {
                    // TODO: do we need a check of some sort
                    let c = this.mControls[i];
                    let r = game.config.PIXELS_PER_METER;
                    g.drawRect(c.position.x * r, c.position.y * r, c.dimensions.x * r, c.dimensions.y * r);
                }
                renderer.render(g);
            }
        }

        /**
         * Initialize physics for the current level
         * 
         * @param gravityX: The default force of gravity in the X dimension
         * @param gravityY: The default force of gravity in the Y dimension
         */
        public initPhysics(gravityX: number, gravityY: number) {
            this.world = new PhysicsType2d.Dynamics.World(new PhysicsType2d.Vector2(gravityX, gravityY));
        }

        /**
         * Create a new empty level, and configure its camera
         *
         * @param width  width of the camera
         * @param height height of the camera
         */
        public initialize(width: number, height: number) {
            // set the boundaries of the world, so we know when to stop moving
            // the camera
            this.worldBoundaries.x = width;
            this.worldBoundaries.y = height;

            // reset all variables
            this.worldSprites = [];
            this.hudSprites = [];

            // TODO
            // // When debug mode is on, print the frames per second. This is icky, but
            // // we need the singleton to be set before we call this, so we don't
            // // actually do it in the constructor...
            // if (Lol.sGame.mShowDebugBoxes)
            //     Display.addFPS(800, 15, Lol.sGame.mDefaultFontFace, Lol.sGame.mDefaultFontRed, Lol.sGame.mDefaultFontGreen,
            //         Lol.sGame.mDefaultFontBlue, 12);

        }

        /**
         * Configure physics for the current level
         *
         * @param xGravity The default force moving actors to the left (negative) or right (positive)... Usually zero
         * @param yGravity The default force pushing actors down (positive) or up (negative)... Usually zero or 10
         */
        public setPhysics(gravityX: number, gravityY: number) {
            this.world = new PhysicsType2d.Dynamics.World(new PhysicsType2d.Vector2(gravityX, gravityY));
        }

        //     /**
        //      * Store string/integer pairs that get reset at the end of every level
        //      */
        //     final TreeMap<String, Integer> mLevelFacts;
        //     /**
        //      * Store Actors, so that we can get to them in callbacks
        //      */
        //     final TreeMap<String, Actor> mLevelActors;
        //     /**
        //      * The debug renderer, for printing circles and boxes for each actor
        //      */
        //     private final Box2DDebugRenderer mDebugRender = new Box2DDebugRenderer();
        //     /**
        //      * The debug shape renderer, for putting boxes around Controls and Displays
        //      */
        //     private final ShapeRenderer mShapeRender = new ShapeRenderer();
        //     /**
        //      * We use this to avoid garbage collection when converting screen touches to
        //      * camera coordinates
        //      */
        //     private final Vector3 mTouchVec = new Vector3();
        //     /**
        //      * This camera is for drawing controls that sit above the world
        //      */
        //     public OrthographicCamera mHudCam;
        //     /**
        //      * A reference to the score object, for tracking winning and losing
        //      */
        //     Score mScore = new Score();
        //     /**
        //      * A reference to the tilt object, for managing how tilts are handled
        //      */
        //     Tilt mTilt = new Tilt();
        //     /**
        //      * The set of Parallax backgrounds
        //      */
        //     Background mBackground = new Background();
        //     /**
        //      * The set of Parallax foregrounds
        //      */
        //     Foreground mForeground = new Foreground();
        //     /**
        //      * The scene to show when the level is created (if any)
        //      */
        //     PreScene mPreScene;
        //     /**
        //      * The scene to show when the level is won
        //      */
        //     WinScene mWinScene = new WinScene();
        //     /**
        //      * The scene to show when the level is lost
        //      */
        //     LoseScene mLoseScene = new LoseScene();
        //     /**
        //      * The scene to show when the level is paused (if any)
        //      */
        //     PauseScene mPauseScene;

        /**
         * Input Controls
         */
        public mControls: Control[] = [];

        //     /**
        //      * Output Displays
        //      */
        //     ArrayList<Display> mDisplays = new ArrayList<>();

        /**
         * Controls that have a tap event
         */
        public mTapControls: Control[] = [];

        //     /**
        //      * Controls that have a pan event
        //      */
        //     ArrayList<Control> mPanControls = new ArrayList<>();
        //     /**
        //      * Controls that have a pinch zoom event
        //      */
        //     ArrayList<Control> mZoomControls = new ArrayList<>();
        //     /**
        //      * Toggle Controls
        //      */
        //     ArrayList<Control> mToggleControls = new ArrayList<>();
        //     /**
        //      * Events that get processed on the next render, then discarded
        //      */
        //     ArrayList<LolAction> mOneTimeEvents = new ArrayList<>();
        //     /**
        //      * When the level is won or lost, this is where we store the event that
        //      * needs to run
        //      */
        //     LolAction mEndGameEvent;
        //     /**
        //      * Events that get processed on every render
        //      */
        //     ArrayList<LolAction> mRepeatEvents = new ArrayList<>();
        //     /**
        //      * This camera is for drawing actors that exist in the physics world
        //      */
        //     OrthographicCamera mGameCam;
        //     /**
        //      * This camera is for drawing parallax backgrounds that go in front of or behind the world
        //      */
        //     ParallaxCamera mBgCam;

        //     /**
        //      * This is the Actor that the camera chases
        //      */
        //     Actor mChaseActor;

        //     /**
        //      * When there is a touch of an actor in the physics world, this is how we
        //      * find it
        //      */
        //     Actor mHitActor = null;
        //     /**
        //      * actors may need to set callbacks to run on a screen touch. If so, they
        //      * can use this.
        //      */
        //     ArrayList<GestureAction> mGestureResponders = new ArrayList<>();
        //     /**
        //      * In levels with a projectile pool, the pool is accessed from here
        //      */
        //     ProjectilePool mProjectilePool;
        //     /**
        //      * Code to run when a level is won
        //      */
        //     LolCallback mWinCallback;
        //     /**
        //      * Code to run when a level is lost
        //      */
        //     LolCallback mLoseCallback;
        //     /**
        //      * This callback is used to get a touched actor from the physics world
        //      */
        //     private QueryCallback mTouchCallback;

        //     /**
        //      * Construct a level. This is mostly using defaults, so the main work is in
        //      * camera setup
        //      *
        //      * @param width  The width of the level, in meters
        //      * @param height The height of the level, in meters
        //      */
        //     Level(int width, int height) {
        //         // clear any timers
        //         Timer.instance().clear();

        //         // Set up listeners for touch events. Gestures are processed before
        //         // non-gesture touches, and non-gesture touches are only processed when
        //         // a gesture is not detected.
        //         InputMultiplexer mux = new InputMultiplexer();
        //         mux.addProcessor(new GestureDetector(new LolGestureManager()));
        //         mux.addProcessor(new LolInputManager());
        //         Gdx.input.setInputProcessor(mux);

        //         // reset the per-level object store
        //         mLevelFacts = new TreeMap<>();
        //         mLevelActors = new TreeMap<>();

        //         // save the camera bounds
        //         mCamBoundX = width;
        //         mCamBoundY = height;

        //         // warn on strange dimensions
        //         if (width < Lol.sGame.mWidth / Physics.PIXEL_METER_RATIO)
        //             Util.message("Warning", "Your game width is less than 1/10 of the screen width");
        //         if (height < Lol.sGame.mHeight / Physics.PIXEL_METER_RATIO)
        //             Util.message("Warning", "Your game height is less than 1/10 of the screen height");

        //         // set up the game camera, with 0,0 in the bottom left
        //         mGameCam = new OrthographicCamera(Lol.sGame.mWidth / Physics.PIXEL_METER_RATIO, Lol.sGame.mHeight
        //                 / Physics.PIXEL_METER_RATIO);
        //         mGameCam.position.set(Lol.sGame.mWidth / Physics.PIXEL_METER_RATIO / 2, Lol.sGame.mHeight
        //                 / Physics.PIXEL_METER_RATIO / 2, 0);
        //         mGameCam.zoom = 1;

        //         // set up the heads-up display camera
        //         int camWidth = Lol.sGame.mWidth;
        //         int camHeight = Lol.sGame.mHeight;
        //         mHudCam = new OrthographicCamera(camWidth, camHeight);
        //         mHudCam.position.set(camWidth / 2, camHeight / 2, 0);

        //         // the background camera is like the hudcam
        //         mBgCam = new ParallaxCamera(camWidth, camHeight);
        //         mBgCam.position.set(camWidth / 2, camHeight / 2, 0);
        //         mBgCam.zoom = 1;

        //         // set up the renderables
        //         for (int i = 0; i < 5; ++i)
        //             mRenderables.add(new ArrayList<Renderable>());

        //         // set up the callback for finding out who in the physics world was
        //         // touched
        //         mTouchCallback = new QueryCallback() {
        //             @Override
        //             public boolean reportFixture(Fixture fixture) {
        //                 // if the hit point is inside the fixture of the body we report
        //                 // it
        //                 if (fixture.testPoint(mTouchVec.x, mTouchVec.y)) {
        //                     Actor hs = (Actor) fixture.getBody().getUserData();
        //                     if (hs.mVisible) {
        //                         mHitActor = hs;
        //                         return false;
        //                     }
        //                 }
        //                 return true;
        //             }
        //         };
        //     }


        //     /**
        //      * Identify the actor that the camera should try to keep on screen at all
        //      * times
        //      *
        //      * @param actor The actor the camera should chase
        //      */
        //     public static void setCameraChase(Actor actor) {
        //         Lol.sGame.mCurrentLevel.mChaseActor = actor;
        //     }

        /**
         * Set the background music for this level
         *
         * @param musicName Name of the Music file to play
         */
        public setMusic(musicName: string, game: Lol) {
            this.music = new Howl({ loop: true, src: [game.config.assetFolder + musicName] });
        }

        //     /**
        //      * Specify that you want some code to run after a fixed amount of time
        //      * passes.
        //      *
        //      * @param howLong  How long to wait before the timer code runs
        //      * @param callback The code to run
        //      */
        //     public static void setTimerCallback(float howLong, final LolCallback callback) {
        //         Timer.schedule(new Task() {
        //             @Override
        //             public void run() {
        //                 if (!Lol.sGame.mCurrentLevel.mScore.mGameOver)
        //                     callback.onEvent();
        //             }
        //         }, howLong);
        //     }

        //     /**
        //      * Specify that you want some code to run repeatedly
        //      *
        //      * @param howLong  How long to wait before the timer code runs for the first time
        //      * @param interval The time between subsequent executions of the code
        //      * @param callback The code to run
        //      */
        //     public static void setTimerCallback(float howLong, float interval, final LolCallback callback) {
        //         Timer.schedule(new Task() {
        //             @Override
        //             public void run() {
        //                 if (!Lol.sGame.mCurrentLevel.mScore.mGameOver)
        //                     callback.onEvent();
        //             }
        //         }, howLong, interval);
        //     }

        //     /**
        //      * Turn on scribble mode, so that scene touch events draw circular objects
        //      *
        //      * Note: this code should be thought of as serving to demonstrate, only. If
        //      * you really wanted to do anything clever with scribbling, you'd certainly
        //      * want to change this code.
        //      *
        //      * @param imgName          The name of the image to use for scribbling
        //      * @param width            Width of the individual components of the scribble
        //      * @param height           Height of the individual components of the scribble
        //      * @param interval         Time (in milliseconds) that must transpire between scribble
        //      *                         events... use this to avoid outrageously high rates of
        //      *                         scribbling
        //      * @param onCreateCallback A callback to run in order to modify the scribble behavior.
        //      *                         The obstacle that is drawn in the scribble will be the
        //      *                         "AttachedActor" of the callback.
        //      */
        //     public static void setScribbleMode(final String imgName, final float width,
        //                                        final float height, final int interval, final LolCallback onCreateCallback) {
        //         // we set a callback on the Level, so that any touch to the level (down,
        //         // drag, up) will affect our scribbling
        //         Lol.sGame.mCurrentLevel.mGestureResponders.add(new GestureAction() {
        //             /**
        //              * The time of the last touch event... we use this to prevent high
        //              * rates of scribble
        //              */
        //             long mLastTime;

        //             /**
        //              * On a down press, draw a new obstacle if enough time has
        //              * transpired
        //              *
        //              * @param touchLoc
        //              * The location of the touch
        //              * @param deltaX
        //              *            The change in X since last pan
        //              * @param deltaY
        //              *            The change in Y since last pan
        //              */
        //             @Override
        //             public boolean onPan(final Vector3 touchLoc, float deltaX, float deltaY) {
        //                 // check if enough milliseconds have passed
        //                 long now = System.currentTimeMillis();
        //                 if (now < mLastTime + interval) {
        //                     return true;
        //                 }
        //                 mLastTime = now;

        //                 // make a circular obstacle
        //                 final Obstacle o = Obstacle.makeAsCircle(touchLoc.x - width / 2, touchLoc.y - height / 2, width,
        //                         height, imgName);
        //                 if (onCreateCallback != null) {
        //                     onCreateCallback.mAttachedActor = o;
        //                     onCreateCallback.onEvent();
        //                 }

        //                 return true;
        //             }
        //         });
        //     }

        //     /**
        //      * Manually set the zoom level of the game
        //      *
        //      * @param zoom The amount of zoom (1 is no zoom, &gt;1 zooms out)
        //      */
        //     public static void setZoom(float zoom) {
        //         Lol.sGame.mCurrentLevel.mGameCam.zoom = zoom;
        //         Lol.sGame.mCurrentLevel.mBgCam.zoom = zoom;
        //     }

        //     /**
        //      * Register a callback so that custom code will run when the level is won
        //      *
        //      * @param callback The code to run
        //      */
        //     public static void setWinCallback(LolCallback callback) {
        //         Lol.sGame.mCurrentLevel.mWinCallback = callback;
        //     }

        //     /**
        //      * Register a callback so that custom code will run when the level is lost
        //      *
        //      * @param callback The code to run
        //      */
        //     public static void setLoseCallback(LolCallback callback) {
        //         Lol.sGame.mCurrentLevel.mLoseCallback = callback;
        //     }

        //     /*
        //      * SCREEN (SCREENADAPTER) OVERRIDES
        //      */


        /**
         * If the level has music attached to it, this starts playing it
         */
        private playMusic() {
            if (!this.musicPlaying && this.music != null) {
                this.musicPlaying = true;
                this.music.play();
            }
        }

        /**
         * If the level has music attached to it, this pauses it
         */
        private pauseMusic() {
            if (this.musicPlaying) {
                this.musicPlaying = false;
                this.music.pause();
            }
        }

        /**
         * If the level has music attached to it, this stops it
         */
        private stopMusic() {
            if (this.musicPlaying) {
                this.musicPlaying = false;
                this.music.stop();
            }
        }

        //     /**
        //      * If the camera is supposed to follow an actor, this code will handle
        //      * updating the camera position
        //      */
        //     private void adjustCamera() {
        //         if (mChaseActor == null)
        //             return;
        //         // figure out the actor's position
        //         float x = mChaseActor.mBody.getWorldCenter().x + mChaseActor.mCameraOffset.x;
        //         float y = mChaseActor.mBody.getWorldCenter().y + mChaseActor.mCameraOffset.y;

        //         // if x or y is too close to MAX,MAX, stick with max acceptable values
        //         if (x > mCamBoundX - Lol.sGame.mWidth * mGameCam.zoom / Physics.PIXEL_METER_RATIO / 2)
        //             x = mCamBoundX - Lol.sGame.mWidth * mGameCam.zoom / Physics.PIXEL_METER_RATIO / 2;
        //         if (y > mCamBoundY - Lol.sGame.mHeight * mGameCam.zoom / Physics.PIXEL_METER_RATIO / 2)
        //             y = mCamBoundY - Lol.sGame.mHeight * mGameCam.zoom / Physics.PIXEL_METER_RATIO / 2;

        //         // if x or y is too close to 0,0, stick with minimum acceptable values
        //         //
        //         // NB: we do MAX before MIN, so that if we're zoomed out, we show extra
        //         // space at the top instead of the bottom
        //         if (x < Lol.sGame.mWidth * mGameCam.zoom / Physics.PIXEL_METER_RATIO / 2)
        //             x = Lol.sGame.mWidth * mGameCam.zoom / Physics.PIXEL_METER_RATIO / 2;
        //         if (y < Lol.sGame.mHeight * mGameCam.zoom / Physics.PIXEL_METER_RATIO / 2)
        //             y = Lol.sGame.mHeight * mGameCam.zoom / Physics.PIXEL_METER_RATIO / 2;

        //         // update the camera position
        //         mGameCam.position.set(x, y, 0);
        //     }

        //     /**
        //      * Add an actor to the level, putting it into the appropriate z plane
        //      *
        //      * @param actor  The actor to add
        //      * @param zIndex The z plane. valid values are -2, -1, 0, 1, and 2. 0 is the
        //      *               default.
        //      */
        //     void addActor(Renderable actor, int zIndex) {
        //         assert zIndex >= -2;
        //         assert zIndex <= 2;
        //         mRenderables.get(zIndex + 2).add(actor);
        //     }

        //     /**
        //      * Remove an actor from its z plane
        //      *
        //      * @param actor  The actor to remove
        //      * @param zIndex The z plane where it is expected to be
        //      */
        //     void removeActor(Renderable actor, int zIndex) {
        //         assert zIndex >= -2;
        //         assert zIndex <= 2;
        //         mRenderables.get(zIndex + 2).remove(actor);
        //     }

        //     /**
        //      * A hack for stopping events when a pause screen is opened
        //      *
        //      * @param touchVec The location of the touch that interacted with the pause
        //      *                 screen.
        //      */
        //     public void liftAllButtons(Vector3 touchVec) {
        //         for (Control c : mToggleControls) {
        //             if (c.mIsActive && c.mIsTouchable) {
        //                 c.mGestureAction.toggle(true, touchVec);
        //             }
        //         }
        //         for (GestureAction ga : mGestureResponders) {
        //             ga.onPanStop(mTouchVec);
        //             ga.onUp(mTouchVec);
        //         }
        //     }

        /**
         * Whenever we hide the level, be sure to turn off the music
         * 
         * TODO: do we ever get this lifecycle event?
         */
        public hide() {
            this.pauseMusic();
        }

        /**
         * Whenever we dispose of the level, be sure to turn off the music
         * 
         * TODO: do we ever get this lifecycle event?
         */
        public dispose() {
            this.stopMusic();
        }

    }
}
