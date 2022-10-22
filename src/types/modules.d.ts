declare module 'plugins' {
    const plugins: Record<string, import('.').Plugin>;
    export default plugins;
}
declare module 'patches' {
    const patches: Record<string, import('.').Patch>;
    export default patches;
}

declare module 'themes' {
    const themes: Record<string, import('.').Theme>;
    export default themes;
}

declare module '*.css';
