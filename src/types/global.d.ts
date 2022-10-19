import steamed from '../FriendClient/index';

declare global {
    export var steamed: typeof import('../FriendClient/steamed');
    interface Window {
        webpackChunkfriendsui: {
            push(chunk: any): any;
            pop(): any;
        };
        [k: PropertyKey]: any;
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
