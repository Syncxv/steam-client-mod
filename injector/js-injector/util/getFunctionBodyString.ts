export const toStringFunction = (fn: Function) => {
    return getBody(fn.toString());
};

const getBody = (str: string) => str.substring(str.indexOf('{') + 1, str.lastIndexOf('}'));
