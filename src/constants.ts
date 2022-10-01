export enum AutoCompleteTypes {
    Command = 1,
    Emoji = 2,
}

export const WEBPACK_CHUNK: string = Object.keys(window).find((m) => m.startsWith('webpack'))!;
