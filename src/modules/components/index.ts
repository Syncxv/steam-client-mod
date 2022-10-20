import { waitFor } from '../webpack';

export let SwitchItem: any;

waitFor(
    (m) => m?.render?.toString().includes('ToggleField'),
    (mod) => (SwitchItem = mod)
);
