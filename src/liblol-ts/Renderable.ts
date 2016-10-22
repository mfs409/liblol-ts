module LOL {
    /**
     * Renderable is essentially a struct.  It allows items that can be 
     * displayed on the screen to describe how they ought to be displayed. This
     * allows us, for example, to let a text item describe how its display value
     * should change over time.
     *  
     * WARNING: Renderable is a low-level interface that allows actors, 
     *          controls, and displays to describe where, on screen, they should
     *          be drawn.  Game code should not interact with Renderables.
     */
    export class Renderable {
        /**
         * The coordinates of the top left corner of the element, in 
         * pixels
         */
        public position: PhysicsType2d.Vector2 = new PhysicsType2d.Vector2(0, 0);

        /**
         * The width and height of the element, in pixels
         */
        public dimensions: PhysicsType2d.Vector2 = new PhysicsType2d.Vector2(0, 0);

        /**
         * The rotation of the element
         * 
         * TODO: is this in radians or degrees?
         */
        public rotation: number = 0;

        /**
         * The z-index of the element.  Valid values are -2, -1, 0, 1, and 2.
         */
        public zIndex: number = 0;

        /**
         * A flag to indicate if the renderable is visible or not
         */
        public visible: boolean = false;

        /**
         * The current image to display, if /visible/ is true
         * 
         * TODO: add an AnimationDriver?
         */
        public image: PIXI.Sprite = null;

        /**
         * Check if a point falls within this renderable.
         */
        public contains(x: number, y: number): boolean {
            return x >= this.position.x && x <= this.position.x + this.dimensions.x && y >= this.position.y && y <= this.position.y + this.dimensions.y;
        }

        /**
         * Create a Renderable image, that can be displayed on the screen
         * 
         * @param x: the X coordinate of the top left corner, in meters
         * @param y: the Y coordinate of the top left corner, in meters
         * @param width: the width of the image, in meters
         * @param height: the height of the image, in meters
         * @param imgName: the name of the image file to use
         * @param game: the game whose playable level will show this image
         */
        constructor(x: number, y: number, width: number, height: number, imgName: string, game: Lol) {
            this.position.Set(x, y);
            this.dimensions.Set(width, height);

            // See if the image is legal
            let a = game.config.imgNames;
            let found = false;
            for (let i = 0; i < a.length; ++i) {
                if (a[i] === imgName) {
                    found = true;
                }
            }
            // Create a sprite
            if (found) {
                this.image = new PIXI.Sprite(PIXI.Texture.fromFrame(game.config.assetFolder + imgName));
                this.image.anchor.x = this.image.anchor.y = 0.5;
                this.image.height = this.dimensions.y * game.config.PIXELS_PER_METER;
                this.image.width = this.dimensions.x * game.config.PIXELS_PER_METER;
                // Just in case the sprite doesn't end up having a physics body 
                // attached to it, let's go ahead and set the x/y coordinates of
                // its center point, based on the current position
                this.image.x = (this.position.x + this.dimensions.x / 2) * game.config.PIXELS_PER_METER;
                this.image.y = (this.position.y + this.dimensions.y / 2) * game.config.PIXELS_PER_METER;
                this.visible = true;
            } else {
                Util.message("ASSET ERROR", "file '" + imgName + "' not found", game);
            }
        }
    }
}
