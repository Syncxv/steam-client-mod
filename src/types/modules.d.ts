declare module 'plugins' {
    const plugins: Record<string, import('.').Plugin>;
    export default plugins;
}
