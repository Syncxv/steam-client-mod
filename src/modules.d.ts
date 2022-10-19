declare module 'plugins' {
    const plugins: Record<string, import('./modules/entities').Plugin>;
    export default plugins;
}
