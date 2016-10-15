module LOL {
    /**
     * ScreenManager presents a set of related screens, such as playable levels. It
     * allows us to manage all the different types of screens from the same code
     * within Lol.
     *
     * TODO: After porting is complete, revisit this object.  We can probably 
     * get by with a function, not a ScreenManager object.
     */
    export interface ScreenManager {
        /**
         * Display one of the screens
         *
         * @param which The screen to display. Your code should use an /if/ statement
         *              to decide what screen to display based on the value of /which/
         */
        display(which: number);
    }
}
