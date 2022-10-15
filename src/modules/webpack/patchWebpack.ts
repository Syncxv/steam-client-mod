import { WEBPACK_CHUNK } from '../../constants';
import { initWebpack } from './webpack';

let webpackChunk: any[];

Object.defineProperty(window, WEBPACK_CHUNK, {
    get: () => webpackChunk,
    set: (v) => {
        if (v?.push !== Array.prototype.push) {
            console.info(`Patching ${WEBPACK_CHUNK}.push`);
            patchPush();
            initWebpack();
            // @ts-ignore
            delete window[WEBPACK_CHUNK];
            window[WEBPACK_CHUNK] = v;
        }
        webpackChunk = v;
    },
    configurable: true,
});

export function patchPush() {
    function handlePush(chunk: any[]) {
        try {
            console.log(chunk);
            const modules = chunk[1];
            console.log(modules);
        } catch (err) {
            console.error('oopsie indeed eh', err);
        }
        return handlePush.original.call(window[WEBPACK_CHUNK], chunk);
    }

    handlePush.original = window[WEBPACK_CHUNK].push;
    Object.defineProperty(window[WEBPACK_CHUNK], 'push', {
        get: () => handlePush,
        set: (v) => (handlePush.original = v),
        configurable: true,
    });
}
