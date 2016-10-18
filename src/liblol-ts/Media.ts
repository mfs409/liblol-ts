// TODO: conversion of this file is not yet complete

// /**
//  * The MediaFactory provides a mechanism for registering all of our images,
//  * sounds, and fonts Strictly speaking, we can re-create fonts on the fly
//  * whenever we need to. Caching them here is an optimization.
//  */
// public class Media {

//     /**
//      * When a game is disposed of, the images are managed by libGDX. Fonts are
//      * too, except that references to old fonts don't resurrect nicely. Clearing
//      * the collection when the game disposes is satisfactory to avoid visual
//      * glitches when the game comes back to the foreground.
//      */
//     static void onDispose() {
//         Lol.sGame.mMedia.mFonts.clear();
//     }

//     /**
//      * Get the font described by the file name and font size
//      *
//      * @param fontFileName The filename for the font. This should be in the android
//      *                     project's assets, and should end in .ttf
//      * @param fontSize     The size to display
//      * @return A font object that can be used to render text
//      */
//     static BitmapFont getFont(String fontFileName, int fontSize) {
//         // we store fonts as their filename appended with their size
//         String key = fontFileName + "--" + fontSize;

//         // check if we've already got this font, return it if we do
//         BitmapFont f = Lol.sGame.mMedia.mFonts.get(key);
//         if (f != null) {
//             // just to play it safe, make the font white... the caller can
//             // change this
//             f.setColor(1, 1, 1, 1);
//             return f;
//         }

//         // Generate the font, save it, and return it
//         //
//         // NB: if this crashes, the user will get a reasonably good error
//         // message
//         FreeTypeFontParameter parameter = new FreeTypeFontParameter();
//         FreeTypeFontGenerator generator = new FreeTypeFontGenerator(Gdx.files.internal(fontFileName));
//         parameter.size = fontSize;
//         generator.scaleForPixelHeight(fontSize);
//         parameter.minFilter = Texture.TextureFilter.Linear;
//         parameter.magFilter = Texture.TextureFilter.Linear;

//         f = generator.generateFont(parameter);
//         generator.dispose();
//         Lol.sGame.mMedia.mFonts.put(key, f);
//         return f;
//     }

//     /**
//      * Internal method to retrieve a sound by name
//      *
//      * @param soundName Name of the sound file to retrieve
//      * @return a Sound object that can be used for sound effects
//      */
//     public static Sound getSound(String soundName) {
//         Sound ret = Lol.sGame.mMedia.mSounds.get(soundName);
//         if (ret == null)
//             Util.message("ERROR", "Error retreiving sound '" + soundName + "'");
//         return ret;
//     }

//     /**
//      * Internal method to retrieve a music object by name
//      *
//      * @param musicName Name of the music file to retrieve
//      * @return a Music object that can be used to play background music
//      */
//     static Music getMusic(String musicName) {
//         Music ret = Lol.sGame.mMedia.mTunes.get(musicName);
//         if (ret == null)
//             Util.message("ERROR", "Error retreiving music '" + musicName + "'");
//         return ret;
//     }

//     /**
//      * Internal method to retrieve an image by name. User code should not call
//      * this.
//      *
//      * @param imgName Name of the image file to retrieve
//      * @return a TextureRegion object that can be used to create Actors
//      */
//     public static TextureRegion[] getImage(String imgName) {
//         TextureRegion[] ret = Lol.sGame.mMedia.mImages.get(imgName);
//         if (ret == null)
//             Util.message("ERROR", "Error retreiving image '" + imgName + "'");
//         return ret;
//     }

//     /**
//      * On a volume change event, this will change the volume of all music
//      * objects
//      */
//     static void resetMusicVolume() {
//         for (Music m : Lol.sGame.mMedia.mTunes.values()) {
//             m.setVolume(Facts.getGameFact("volume", 1));
//         }
//     }

// }
