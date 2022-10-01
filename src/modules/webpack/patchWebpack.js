let webpackChunk;

const logger = new Logger('WebpackInterceptor', '#8caaee');

Object.defineProperty(window, WEBPACK_CHUNK, {
    get: () => webpackChunk,
    set: (v) => {
        if (v?.push !== Array.prototype.push) {
            logger.info(`Patching ${WEBPACK_CHUNK}.push`);
            _initWebpack(v);
            patchPush();
            // @ts-ignore
            delete window[WEBPACK_CHUNK];
            window[WEBPACK_CHUNK] = v;
        }
        webpackChunk = v;
    },
    configurable: true,
});
