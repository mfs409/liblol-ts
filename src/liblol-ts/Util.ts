// TODO: conversion of this file is not yet complete

module LOL {
    /**
     * The Util class stores a few helper functions that we use inside of LOL, and a
     * few simple wrappers that we give to the game developer
     */
    export class Util {
        //     /**
        //      * A random number generator... We provide this so that new game developers
        //      * don't create lots of Random()s throughout their code
        //      */
        //     private static Random sGenerator = new Random();

        /**
         * Instead of using Gdx.app.log directly, and potentially writing a lot of
         * debug info in a production setting, we use this to only dump to the log
         * when debug mode is on
         *
         * @param tag  The message tag
         * @param text The message text
         */
        public static message(tag: string, text: string, game: Lol) {
            if (game.config.showDebugBoxes) {
                console.log(tag + " : " + text);
            }
        }

        //     /**
        //      * Create a Renderable that consists of some text to draw
        //      *
        //      * @param x        The X coordinate of the bottom left corner, in pixels
        //      * @param y        The Y coordinate of the bottom left corner, in pixels
        //      * @param message  The text to display... note that it can't change on the fly
        //      * @param red      The red component of the font color (0-255)
        //      * @param green    The green component of the font color (0-255)
        //      * @param blue     The blue component of the font color (0-255)
        //      * @param fontName The font to use
        //      * @param size     The font size
        //      * @return A Renderable of the text
        //      */
        //     public static Renderable makeText(final int x, final int y, final String message, final int red, final int green,
        //                                       final int blue, String fontName, int size) {
        //         final BitmapFont bf = Media.getFont(fontName, size);
        //         return new Renderable() {
        //             @Override
        //             public void render(SpriteBatch sb, float elapsed) {
        //                 bf.setColor(((float) red) / 256, ((float) green) / 256, ((float) blue) / 256, 1);
        //                 bf.drawMultiLine(sb, message, x, y + bf.getMultiLineBounds(message).height);
        //             }
        //         };
        //     }

        //     /**
        //      * Create a Renderable that consists of some text to draw. The text will be
        //      * centered vertically and horizontally on the screen
        //      *
        //      * @param message  The text to display... note that it can't change on the fly
        //      * @param red      The red component of the font color (0-255)
        //      * @param green    The green component of the font color (0-255)
        //      * @param blue     The blue component of the font color (0-255)
        //      * @param fontName The font to use
        //      * @param size     The font size
        //      * @return A Renderable of the text
        //      */
        //     public static Renderable makeText(final String message, final int red, final int green, final int blue,
        //                                       String fontName, int size) {
        //         final BitmapFont bf = Media.getFont(fontName, size);
        //         final float x = Lol.sGame.mWidth / 2 - bf.getMultiLineBounds(message).width / 2;
        //         final float y = Lol.sGame.mHeight / 2 + bf.getMultiLineBounds(message).height / 2;
        //         return new Renderable() {
        //             @Override
        //             public void render(SpriteBatch sb, float elapsed) {
        //                 bf.setColor(((float) red) / 256, ((float) green) / 256, ((float) blue) / 256, 1);
        //                 bf.drawMultiLine(sb, message, x, y);
        //             }
        //         };
        //     }


        //     /*
        //      * PUBLIC INTERFACE
        //      */

        //     /**
        //      * Generate a random number x such that 0 &lt;= x &lt; max
        //      *
        //      * @param max The largest number returned will be one less than max
        //      * @return a random integer
        //      */
        //     public static int getRandom(int max) {
        //         return sGenerator.nextInt(max);
        //     }

        //     /**
        //      * Draw a box on the scene Note: the box is actually four narrow rectangles
        //      *
        //      * @param x0         X coordinate of top left corner
        //      * @param y0         Y coordinate of top left corner
        //      * @param x1         X coordinate of bottom right corner
        //      * @param y1         Y coordinate of bottom right corner
        //      * @param imgName    name of the image file to use when drawing the rectangles
        //      * @param density    Density of the rectangle. When in doubt, use 1
        //      * @param elasticity Elasticity of the rectangle. When in doubt, use 0
        //      * @param friction   Friction of the rectangle. When in doubt, use 1
        //      */
        //     static public void drawBoundingBox(float x0, float y0, float x1, float y1, String imgName, float density,
        //                                        float elasticity, float friction) {
        //         // draw four rectangles and we're good
        //         Obstacle bottom = Obstacle.makeAsBox(x0 - 1, y0 - 1, Math.abs(x0 - x1) + 2, 1, imgName);
        //         bottom.setPhysics(density, elasticity, friction);

        //         Obstacle top = Obstacle.makeAsBox(x0 - 1, y1, Math.abs(x0 - x1) + 2, 1, imgName);
        //         top.setPhysics(density, elasticity, friction);

        //         Obstacle left = Obstacle.makeAsBox(x0 - 1, y0 - 1, 1, Math.abs(y0 - y1) + 2, imgName);
        //         left.setPhysics(density, elasticity, friction);

        //         Obstacle right = Obstacle.makeAsBox(x1, y0 - 1, 1, Math.abs(y0 - y1) + 2, imgName);
        //         right.setPhysics(density, elasticity, friction);
        //     }

        /**
         * Draw a picture on the current level
         *
         * Note: the order in which this is called relative to other actors will
         * determine whether they go under or over this picture.
         *
         * TODO: Renderables only track coordinates in pixels, but this deals in 
         *       meters... that's going to be a big problem when we start having 
         *       large worlds...
         * 
         * @param x:       X coordinate of bottom left corner in meters
         * @param y:       Y coordinate of bottom left corner in meters
         * @param width:   Width of the picture in meters
         * @param height:  Height of this picture in meters
         * @param imgName: Name of the picture to display
         * @param zIndex:  The z index of the image. There are 5 planes: -2, -2, 0, 1,
         *                 and 2. By default, everything goes to plane 0
         */
        public static drawPicture(x: number, y: number, width: number, height: number, imgName: string, zIndex: number, game: Lol): Renderable {
            let pic = new Renderable(x * game.config.PIXELS_PER_METER, y * game.config.PIXELS_PER_METER, width * game.config.PIXELS_PER_METER, height * game.config.PIXELS_PER_METER, imgName, game);
            pic.zIndex = zIndex;
            game.activeLevel.worldSprites.push(pic);
            return pic;
        }

        //     /**
        //      * Draw some text on the current level
        //      *
        //      * Note: the order in which this is called relative to other actors will
        //      * determine whether they go under or over this text.
        //      *
        //      * @param x        X coordinate of bottom left corner of the text
        //      * @param y        Y coordinate of bottom left corner of the text
        //      * @param text     The text to display
        //      * @param red      The red component of the color (0-255)
        //      * @param green    The green component of the color (0-255)
        //      * @param blue     The blue component of the color (0-255)
        //      * @param fontName The name of the font file to use
        //      * @param size     The font size to use
        //      * @param zIndex   The z index of the image. There are 5 planes: -2, -2, 0, 1,
        //      *                 and 2. By default, everything goes to plane 0
        //      */
        //     public static void drawText(final float x, final float y, final String text, final int red, final int green,
        //                                 final int blue, String fontName, int size, int zIndex) {
        //         final BitmapFont bf = Media.getFont(fontName, size);
        //         Renderable r = new Renderable() {
        //             @Override
        //             public void render(SpriteBatch sb, float elapsed) {
        //                 bf.setColor(((float) red) / 256, ((float) green) / 256, ((float) blue) / 256, 1);
        //                 bf.setScale(1 / Physics.PIXEL_METER_RATIO);
        //                 bf.drawMultiLine(sb, text, x, y + bf.getMultiLineBounds(text).height);
        //                 bf.setScale(1);
        //             }
        //         };
        //         Lol.sGame.mCurrentLevel.addActor(r, zIndex);
        //     }

        //     /**
        //      * Draw some text on the current level, centered on a point.
        //      *
        //      * Note: the order in which this is called relative to other actors will
        //      * determine whether they go under or over this text.
        //      *
        //      * @param centerX  X coordinate of center of the text
        //      * @param centerY  Y coordinate of center of the text
        //      * @param text     The text to display
        //      * @param red      The red component of the color (0-255)
        //      * @param green    The green component of the color (0-255)
        //      * @param blue     The blue component of the color (0-255)
        //      * @param fontName The name of the font file to use
        //      * @param size     The font size to use
        //      * @param zIndex   The z index of the image. There are 5 planes: -2, -2, 0, 1,
        //      *                 and 2. By default, everything goes to plane 0
        //      */
        //     public static void drawTextCentered(final float centerX, final float centerY, final String text, final int red,
        //                                         final int green, final int blue, String fontName, int size, int zIndex) {
        //         final BitmapFont bf = Media.getFont(fontName, size);

        //         // figure out the image dimensions
        //         bf.setScale(1 / Physics.PIXEL_METER_RATIO);
        //         final float w = bf.getMultiLineBounds(text).width;
        //         final float h = bf.getMultiLineBounds(text).height;
        //         bf.setScale(1);

        //         // describe how to render it
        //         Renderable r = new Renderable() {
        //             @Override
        //             public void render(SpriteBatch sb, float elapsed) {
        //                 bf.setColor(((float) red) / 256, ((float) green) / 256, ((float) blue) / 256, 1);
        //                 bf.setScale(1 / Physics.PIXEL_METER_RATIO);
        //                 bf.drawMultiLine(sb, text, centerX - w / 2, centerY + h / 2);
        //                 bf.setScale(1);
        //             }
        //         };
        //         Lol.sGame.mCurrentLevel.addActor(r, zIndex);
        //     }
    }
}
