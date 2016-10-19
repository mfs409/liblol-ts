// Type definitions for howler.js v2.0.0
// Project: https://github.com/goldfire/howler.js
interface Howl {
    play(): Function;
    pause(): Function;
    stop(): Function;
    new (properties: any): Howl;
}

declare var Howl;