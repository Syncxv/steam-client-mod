Object.assign(exports, {
    SwitchItem: steamed.webpack.getModule((m) => m?.render?.toString().includes('ToggleField'), true),
});
