let webpackChunk: any[];

function dostuff(WEBPACK_CHUNK: string) {
    Object.defineProperty(window, WEBPACK_CHUNK, {
        get: () => webpackChunk,
        set: (v) => {
            if (v?.push !== Array.prototype.push) {
                console.info(`Patching ${WEBPACK_CHUNK}.push`);
                // @ts-ignore
                delete window[WEBPACK_CHUNK];
                (window as any)[WEBPACK_CHUNK] = v;
            }
            webpackChunk = v;
        },
        configurable: true,
    });
}

module.exports = dostuff;
