import { findByProps } from './webpack';

export let React: typeof import('React');
export let MessageClass: any;
export const initCommon = () => {
    React = findByProps('useState');
    MessageClass = steamed.Webpack.find((m) => m?.prototype?.constructor.toString().includes('eErrorSendingObservable'));
};
