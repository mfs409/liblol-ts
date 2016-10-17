module LOL {
    /**
     * This interface allows items that can be displayed on the screen to
     * describe how they ought to be displayed. This allows us, for example, to
     * let a text item describe how its display value should change over time.
     */
    interface Renderable {
        /**
         * Render something to the screen
         *
         * @param elapsed: The time since the last render
         */
        render(elapsed: number);
    }
}
