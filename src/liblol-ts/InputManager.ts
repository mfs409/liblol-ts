// TODO: conversion of this file is not yet complete

module LOL {
    export class InputManager {
        private game: Lol = null;

        public configure(elt: HTMLElement, game: Lol) {
            this.game = game;
            // Set up hammer.js on the element
            let hammertime: Hammer = new Hammer(elt);
            // configure the gestures
            hammertime.get("pan").set({ direction: Hammer.DIRECTION_ALL });
            hammertime.get("swipe").set({ direction: Hammer.DIRECTION_ALL });
            hammertime.get("pinch").set({ enable: true });
            hammertime.get("rotate").set({ enable: true });
            // set the listeners
            let that = this;
            hammertime.on("pan", function (ev) { console.log("PAN"); });
            hammertime.on("tap", function (ev) { that.tap(ev, that.game); });
            hammertime.on("press", function (ev) { console.log("PRESS"); });
            hammertime.on("swipe", function (ev) { console.log("SWIPE"); });
            hammertime.on("pinch", function (ev) { console.log("PINCH"); });
            hammertime.on("rotate", function (ev) { console.log("ROTATE"); });

            elt.addEventListener("touchstart", function (e) { Util.message("Screen Coordinates", e.changedTouches[0].clientX + ", " + e.changedTouches[0].clientY, that.game); e.preventDefault(); });
            elt.addEventListener("touchend", function (e) { console.log("screen release"); e.preventDefault(); });
            elt.addEventListener("mousedown", function (e) { Util.message("Screen Coordinates", e.clientX + ", " + e.clientY, that.game); e.preventDefault(); });
        }


        /**
         * When the screen is tapped, this code forwards the tap to the
         * appropriate GestureAction
         *
         * @param x      X coordinate of the tap
         * @param y      Y coordinate of the tap
         * @param count  1 for single click, 2 for double-click
         * @param button The mouse button that was pressed
         */
        public tap(e: any, game: Lol /*x: number, y: number, count: number, button: number*/) {
            //             // if any pop-up scene is showing, forward the tap to the scene and
            //             // return true, so that the event doesn't get passed to the Scene
            //             if (mWinScene != null && mWinScene.mVisible) {
            //                 mWinScene.onTap(x, y);
            //                 return true;
            //             } else if (mLoseScene != null && mLoseScene.mVisible) {
            //                 mLoseScene.onTap(x, y);
            //                 return true;
            //             } else if (mPreScene != null && mPreScene.mVisible) {
            //                 mPreScene.onTap(x, y);
            //                 return true;
            //             } else if (mPauseScene != null && mPauseScene.mVisible) {
            //                 mPauseScene.onTap(x, y);
            //                 return true;
            //             }

            // check if we tapped a control
            for (let i = 0; i < this.game.activeLevel.mTapControls.length; ++i) {
                let c = this.game.activeLevel.mTapControls[i];
                // Translate the tap coordinates into world coordinates
                // TODO: this needs work once the camera can move
                let x = e.center.x / game.config.PIXELS_PER_METER;
                let y = e.center.y / game.config.PIXELS_PER_METER;
                if (c.isTouchable && c.mIsActive && c.contains(x, y)) {
                    c.gestureAction.onTap(e);
                    return;
                }
            }

            //             // check if we tapped an actor
            //             mHitActor = null;
            //             mGameCam.unproject(mTouchVec.set(x, y, 0));
            //             mWorld.QueryAABB(mTouchCallback, mTouchVec.x - 0.1f, mTouchVec.y - 0.1f, mTouchVec.x + 0.1f,
            //                     mTouchVec.y + 0.1f);
            //             if (mHitActor != null && mHitActor.onTap(mTouchVec))
            //                 return true;

            //             // is this a raw screen tap?
            //             for (GestureAction ga : mGestureResponders)
            //                 if (ga.onTap(mTouchVec))
            //                     return true;
            //             return false;
        }




    }
}

        //     /**
        //      * To properly handle gestures, we need to provide the code to run on each
        //      * type of gesture we care about.
        //      */
        //     class LolGestureManager extends GestureAdapter {

        //         /**
        //          * Handle fling events
        //          *
        //          * @param velocityX X velocity of the fling
        //          * @param velocityY Y velocity of the fling
        //          * @param button    The mouse button that caused the fling
        //          */
        //         @Override
        //         public boolean fling(float velocityX, float velocityY, int button) {
        //             // we only fling at the whole-level layer
        //             mGameCam.unproject(mTouchVec.set(velocityX, velocityY, 0));
        //             for (GestureAction ga : Lol.sGame.mCurrentLevel.mGestureResponders) {
        //                 if (ga.onFling(mTouchVec))
        //                     return true;
        //             }
        //             return false;
        //         }

        //         /**
        //          * Handle pan events
        //          *
        //          * @param x      X coordinate of current touch
        //          * @param y      Y coordinate of current touch
        //          * @param deltaX change in X
        //          * @param deltaY change in Y
        //          */
        //         @Override
        //         public boolean pan(float x, float y, float deltaX, float deltaY) {
        //             // check if we panned a control
        //             mHudCam.unproject(mTouchVec.set(x, y, 0));
        //             for (Control c : mPanControls) {
        //                 if (c.mIsTouchable && c.mIsActive && c.mRange.contains(mTouchVec.x, mTouchVec.y)) {
        //                     mGameCam.unproject(mTouchVec.set(x, y, 0));
        //                     c.mGestureAction.onPan(mTouchVec, deltaX, deltaY);
        //                     return true;
        //                 }
        //             }

        //             // did we pan the level?
        //             mGameCam.unproject(mTouchVec.set(x, y, 0));
        //             for (GestureAction ga : Lol.sGame.mCurrentLevel.mGestureResponders) {
        //                 if (ga.onPan(mTouchVec, deltaX, deltaY))
        //                     return true;
        //             }
        //             return false;
        //         }

        //         /**
        //          * Handle end-of-pan event
        //          *
        //          * @param x       X coordinate of the tap
        //          * @param y       Y coordinate of the tap
        //          * @param pointer The finger that was used?
        //          * @param button  The mouse button that was pressed
        //          */
        //         @Override
        //         public boolean panStop(float x, float y, int pointer, int button) {
        //             // check if we panStopped a control
        //             mHudCam.unproject(mTouchVec.set(x, y, 0));
        //             for (Control c : mPanControls) {
        //                 if (c.mIsTouchable && c.mIsActive && c.mRange.contains(mTouchVec.x, mTouchVec.y)) {
        //                     mGameCam.unproject(mTouchVec.set(x, y, 0));
        //                     c.mGestureAction.onPanStop(mTouchVec);
        //                     return true;
        //                 }
        //             }

        //             // handle panstop on level
        //             mGameCam.unproject(mTouchVec.set(x, y, 0));
        //             for (GestureAction ga : Lol.sGame.mCurrentLevel.mGestureResponders)
        //                 if (ga.onPanStop(mTouchVec))
        //                     return true;
        //             return false;
        //         }

        //         /**
        //          * Handle zoom (i.e., pinch)
        //          *
        //          * @param initialDistance The distance between fingers when the pinch started
        //          * @param distance        The current distance between fingers
        //          */
        //         @Override
        //         public boolean zoom(float initialDistance, float distance) {
        //             for (Control c : mZoomControls) {
        //                 if (c.mIsTouchable && c.mIsActive) {
        //                     c.mGestureAction.zoom(initialDistance, distance);
        //                     return true;
        //                 }
        //             }
        //             return false;
        //         }
        //     }

        //     /**
        //      * Gestures can't cover everything we care about (specifically 'hold this
        //      * button' sorts of things, for which longpress is not responsive enough),
        //      * so we need a low-level input adapter, too.
        //      */
        //     class LolInputManager extends InputAdapter {

        //         /**
        //          * Handle when a downward touch happens
        //          *
        //          * @param screenX X coordinate of the tap
        //          * @param screenY Y coordinate of the tap
        //          * @param pointer The finger that was used?
        //          * @param button  The mouse button that was pressed
        //          */
        //         public boolean touchDown(int screenX, int screenY, int pointer, int button) {
        //             // check if we down-pressed a control
        //             mHudCam.unproject(mTouchVec.set(screenX, screenY, 0));
        //             for (Control c : mToggleControls) {
        //                 if (c.mIsTouchable && c.mIsActive && c.mRange.contains(mTouchVec.x, mTouchVec.y)) {
        //                     mGameCam.unproject(mTouchVec.set(screenX, screenY, 0));
        //                     c.mGestureAction.toggle(false, mTouchVec);
        //                     return true;
        //                 }
        //             }

        //             // pass to pinch-zoom?
        //             for (Control c : mZoomControls) {
        //                 if (c.mIsTouchable && c.mIsActive && c.mRange.contains(mTouchVec.x, mTouchVec.y)) {
        //                     mGameCam.unproject(mTouchVec.set(screenX, screenY, 0));
        //                     c.mGestureAction.onDown(mTouchVec);
        //                     return true;
        //                 }
        //             }

        //             // check for actor touch, by looking at gameCam coordinates... on
        //             // touch, hitActor will change
        //             mHitActor = null;
        //             mGameCam.unproject(mTouchVec.set(screenX, screenY, 0));
        //             mWorld.QueryAABB(mTouchCallback, mTouchVec.x - 0.1f, mTouchVec.y - 0.1f, mTouchVec.x + 0.1f,
        //                     mTouchVec.y + 0.1f);

        //             // actors don't respond to DOWN... if it's a down on a
        //             // actor, we are supposed to remember the most recently
        //             // touched actor, and that's it
        //             if (mHitActor != null)
        //                 return true;

        //             // forward to the level's handler
        //             for (GestureAction ga : mGestureResponders)
        //                 if (ga.onDown(mTouchVec))
        //                     return true;
        //             return false;
        //         }

        //         /**
        //          * Handle when a touch is released
        //          *
        //          * @param screenX X coordinate of the tap
        //          * @param screenY Y coordinate of the tap
        //          * @param pointer The finger that was used?
        //          * @param button  The mouse button that was pressed
        //          */
        //         public boolean touchUp(int screenX, int screenY, int pointer, int button) {
        //             // check if we down-pressed a control
        //             mHudCam.unproject(mTouchVec.set(screenX, screenY, 0));
        //             for (Control c : mToggleControls) {
        //                 if (c.mIsTouchable && c.mIsActive && c.mRange.contains(mTouchVec.x, mTouchVec.y)) {
        //                     mGameCam.unproject(mTouchVec.set(screenX, screenY, 0));
        //                     c.mGestureAction.toggle(true, mTouchVec);
        //                     return true;
        //                 }
        //             }
        //             return false;
        //         }

        //         /**
        //          * Handle dragging
        //          *
        //          * @param screenX X coordinate of the drag
        //          * @param screenY Y coordinate of the drag
        //          * @param pointer The finger that was used
        //          */
        //         public boolean touchDragged(int screenX, int screenY, int pointer) {
        //             if (mHitActor != null && mHitActor.mGestureResponder != null) {
        //                 mGameCam.unproject(mTouchVec.set(screenX, screenY, 0));
        //                 return mHitActor.mGestureResponder.onDrag(mTouchVec);
        //             }
        //             for (GestureAction ga : mGestureResponders)
        //                 if (ga.onDrag(mTouchVec))
        //                     return true;
        //             return false;
        //         }
        //     }
