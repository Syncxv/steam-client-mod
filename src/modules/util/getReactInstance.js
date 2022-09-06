const getReactInstance = (elem) => {
    const key = Object.keys(elem).find((m) => m.startsWith('__reactInternalInstance'));
    return elem[key];
};

module.exports = getReactInstance;
