declare module 'plugins' {
    const plugins: Record<string, import('.').Plugin>;
    export default plugins;
}
declare module 'patches' {
    const patches: Record<string, import('.').Patch>;
    export default patches;
}
