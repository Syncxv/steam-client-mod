import { findByProps } from '..';

export let React: typeof import('react');
export let useState: typeof React.useState;
export let useEffect: typeof React.useEffect;
export let useMemo: typeof React.useMemo;
export let useRef: typeof React.useRef;
export let useCallback: typeof React.useCallback;

export let ReactDOM: typeof import('react-dom') & typeof import('react-dom/client');

export const initReact = () => {
    React = findByProps('useState');
    useState = React.useState;
    useEffect = React.useEffect;
    useMemo = React.useMemo;
    useRef = React.useRef;
    useCallback = React.useCallback;
    ReactDOM = findByProps('createPortal', 'render');
};
