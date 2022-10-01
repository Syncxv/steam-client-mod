import { WEBPACK_CHUNK } from '../../constants';
import { WebpackInstance } from '../../types';

// export let common;
export let weback_require: WebpackInstance;
export let n = weback_require;

export function initWebpack() {
    weback_require = (window as any)[WEBPACK_CHUNK].push([[[Symbol()]], {}, (r: WebpackInstance) => r]);
}
