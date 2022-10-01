//https://github.com/Swishilicous/discord-types/blob/main/other/WebpackInstance.d.ts
export type whatMiniCssJ = { miniCss: Function; j: Function };
export default interface __webpack_require__ {
    (id: number): any;
    E: Function;
    F: { j: Function };
    O: Function & whatMiniCssJ;
    a: Function;
    amdD: Function;
    amdO: unknown;

    d: Function;
    /**
     * Loads chunks by their ID.
     */
    e: (chunkId: number) => any;
    f: whatMiniCssJ;

    g: typeof globalThis & { [key: string]: any };
    l: Function;

    /**
     * This houses all modules that have been pushed, loaded or not.
     *
     * This can be useful for force lazy-loading classes and other modules that haven't been instantiated yet but have been pushed.
     *
     * @param ret The return value from the module will be `Object.assign`ed to this object.
     */
    m: (
        e: {
            exports: any;
            id: number;
            loaded: boolean;
        },
        ret: object,
        req: __webpack_require__
    ) => void;

    n: Function;
    nmd: Function;
    o: Function;
    p: string;
    r: Function;
    s: null;

    t: Function;
    u: Function;
}
