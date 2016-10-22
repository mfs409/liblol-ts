// TODO: conversion of this file is not yet complete

module LOL {
    /**
     * LolCallback provides an easy way to describe code that should run in response
     * to special events, such as timers, screen presses, or collisions between
     * actors.
     *
     * In the interest of simplicity, we use some public fields instead of getters
     * and setters. This also lets us get away with using the default constructor.
     */
    export class LolCallback /*implements Cloneable*/ {
        /**
         * A few numbers that may be of use during the callback
         */
        public vals: number[] = [0, 0];

        //     /**
        //      * For collision events or actor press events, this is the actor to which
        //      * the callback is attached
        //      */
        //     public Actor mAttachedActor;

        //     /**
        //      * For collision events, this is the other actor involved in the collision
        //      */
        //     public Actor mCollideActor;

        //     /**
        //      * When a callback runs in response to a screen touch, we may need to know the world coordinates of the down-press
        //      */
        //     public Vector3 mDownLocation;

        //     /**
        //      * When a callback runs in response to a screen touch, we may need to know the world coordinates of the up-press
        //      */
        //     public Vector3 mUpLocation;

        //     /**
        //      * When a callback runs in response to a screen touch, we may need to know the world coordinates of the press as it moves.
        //      */
        //     public Vector3 mMoveLocation;

        //     /**
        //      * Make a copy of the current LolCallback
        //      */
        //     public LolCallback clone() {
        //         // This code is trickier than one would think. The issue is
        //         // that we are doing this copy as a way of getting a new object with the
        //         // same overridden onEvent() method. That, in turn, means we need to
        //         // implement Cloneable.
        //         LolCallback callback;
        //         try {
        //             callback = (LolCallback) super.clone();
        //         } catch (CloneNotSupportedException e) {
        //             // this should never happen. If it does, we'll probably crash in the
        //             // caller
        //             e.printStackTrace();
        //             return null;
        //         }
        //         callback.mIntVal = this.mIntVal;
        //         callback.mFloatVal = this.mFloatVal;
        //         callback.mAttachedActor = this.mAttachedActor;
        //         callback.mCollideActor = this.mCollideActor;
        //         return callback;
        //     }

        /**
         * This code will run in response to the event for which the callback is
         * registered
         */
        public onEvent: () => void = null;

        /**
         * To construct a LolCallback, provide the function to execute when the
         * callback is invoked
         */
        constructor(onEvent: () => void) {
            this.onEvent = onEvent;
        }
    }
}