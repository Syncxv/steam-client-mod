import { find } from '../webpack';

export let SwitchItem: any;

export const initComponents = () => {
    SwitchItem = find((m) => m?.render?.toString().includes('ToggleField'));
};
