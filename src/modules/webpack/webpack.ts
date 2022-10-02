import { WEBPACK_CHUNK } from '../../constants';
import { WebpackInstance } from '../../types';

// export let common;
export let weback_require: WebpackInstance;
let cachedModFunc: WebpackInstance['m'];
export let n = weback_require;

export function initWebpack() {
    let instnace = window[WEBPACK_CHUNK];
    weback_require = instnace.push([[[Math.random()]], {}, (r: WebpackInstance) => r]);
    cachedModFunc = weback_require.m;
    instnace.pop();
}
