import { find, findByProps } from './webpack';

export let React: typeof import('React');
export let ReactDOM: typeof import('react-dom');
export let MessageClass: any;
export let i18n: any;
export let openPopout: any;
export const initCommon = () => {
    React = findByProps('useState');
    ReactDOM = findByProps('render', 'createPortal');
    i18n = findByProps('LocalizeString');
    MessageClass = find((m) => m?.prototype?.constructor.toString().includes('eErrorSendingObservable'));
    openPopout = find((m) => typeof m === 'function' && m.toString().match(/\(.{1,2}\.bHideMainWindowForPopouts/));
};
