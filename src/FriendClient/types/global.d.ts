import bruh from '../index';

declare global {
    interface Window {
        webpackChunkfriendsui: WebpackArray;
        steamed: bruh;
    }
}
export interface WebpackArray {
    push([[[id]], {}]: [[[id: string]], {}, (require: WebpackRequire) => void]): WebpackRequire;
}

export interface WebpackRequire extends Function {
    (id: number | string): any; // Just an example
    m: { [key: number]: RawSpotifyModule };
}

export type RawSpotifyModule = (what: any, exports: any, n: WebpackRequire) => any;

let bruh: WebpackArray = [];
let require: WebpackRequire;
