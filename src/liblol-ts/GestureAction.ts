// TODO: conversion of this file is not yet complete

module LOL {
    /**
     * When there is a gesture on the screen, we will convert the event's
     * coordinates to world coordinates, then use this to handle it. This object can
     * be attached to actors, Controls, or to the Level itself, to specify a handler
     * for certain events.
     *
     * Note: typically, one will override certain methods of this class to get the
     * desired behavior
     */
    export class GestureAction {
        /**
         * We offer a HOLD/RELEASE gesture. This flag tells us if we're in a hold
         * event.
         */
        public mHolding: boolean = false;

        //     /**
        //      * Handle a drag event
        //      *
        //      * @param touchVec The x/y/z coordinates of the touch
        //      */
        //     public boolean onDrag(Vector3 touchVec) {
        //         return false;
        //     }

        //     /**
        //      * Handle a down press (hopefully to turn it into a hold/release)
        //      *
        //      * @param touchVec The x/y/z coordinates of the touch
        //      */
        //     public boolean onDown(Vector3 touchVec) {
        //         return false;
        //     }

        //     /**
        //      * Handle an up press (hopefully to turn it into a release)
        //      *
        //      * @param touchVec The x/y/z coordinates of the touch
        //      */
        //     public boolean onUp(Vector3 touchVec) {
        //         return false;
        //     }

        /**
         * Handle a tap event
         *
         * @param touchVec The x/y/z coordinates of the touch
         */
        public onTap: Function = function (touchVec: PhysicsType2d.Vector3): boolean {
            return false;
        };

        //     /**
        //      * Handle a pan event
        //      *
        //      * @param touchVec The x/y/z world coordinates of the touch
        //      * @param deltaX   the change in X scale, in screen coordinates
        //      * @param deltaY   the change in Y scale, in screen coordinates
        //      */
        //     public boolean onPan(Vector3 touchVec, float deltaX, float deltaY) {
        //         return false;
        //     }

        //     /**
        //      * Handle a pan stop event
        //      *
        //      * @param touchVec The x/y/z coordinates of the touch
        //      */
        //     public boolean onPanStop(Vector3 touchVec) {
        //         return false;
        //     }

        //     /**
        //      * Handle a fling event
        //      *
        //      * @param touchVec The x/y/z coordinates of the touch
        //      */
        //     public boolean onFling(Vector3 touchVec) {
        //         return false;
        //     }

        //     /**
        //      * Handle a toggle event. This is usually built from a down and an up.
        //      *
        //      * @param touchVec The x/y/z coordinates of the touch
        //      */
        //     public boolean toggle(boolean isUp, Vector3 touchVec) {
        //         return false;
        //     }

        //     /**
        //      * Handle a zoom event
        //      *
        //      * @param initialDistance The distance between fingers when the pinch started
        //      * @param distance        The current distance between fingers
        //      */
        //     public boolean zoom(float initialDistance, float distance) {
        //         return false;
        //     }
    }
}