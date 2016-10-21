// Type definitions for howler.js v2.0.8
// Project: http://hammerjs.github.io/
interface Hammer {
    get(s: string): Hammer;
    set(cfg: any): void;
    on(s: string, f: Function): void;
    new (elt: HTMLElement): Hammer;
}

declare var Hammer;