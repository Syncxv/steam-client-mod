export let SwitchItem: any;

export const initComponents = () => {
    SwitchItem = steamed.Webpack.find((m) => m?.render?.toString().includes('ToggleField'));
};
