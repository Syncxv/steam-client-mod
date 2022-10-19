import { findByProps } from './webpack';

export let React: typeof import('React');

export const initCommon = () => {
    React = findByProps('useState');
};
