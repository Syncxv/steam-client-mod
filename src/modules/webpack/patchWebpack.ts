import { WEBPACK_CHUNK } from '../../constants';
import { _initWebpack } from './webpack';

let webpackChunk: any[];

Object.defineProperty(window, WEBPACK_CHUNK, {
    get: () => webpackChunk,
    set: (v) => {
        if (v?.push !== Array.prototype.push) {
            _initWebpack(v);
            // @ts-ignore
            delete window[WEBPACK_CHUNK];
            window[WEBPACK_CHUNK] = v;
        }
        webpackChunk = v;
    },
    configurable: true,
});
