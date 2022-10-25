import { find, findByProps } from './webpack';

export let React: typeof import('React');
export let MessageClass: any;
export let i18n: any;

export const initCommon = () => {
    React = findByProps('useState');
    i18n = findByProps('LocalizeString');
    MessageClass = find((m) => m?.prototype?.constructor.toString().includes('eErrorSendingObservable'));
};
