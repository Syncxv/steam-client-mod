const getReactInstance = require('./getReactInstance');

let isElement = (obj) => typeof obj === 'object' && obj.nodeType === 1 && typeof obj.style === 'object' && typeof obj.ownerDocument === 'object';

const getOwnerInstnace = (node) => {
    for (let curr = getReactInstance(node); curr; curr = curr.return) {
        const owner = curr.stateNode;
        if (owner && !isElement(owner)) {
            return owner;
        }
    }

    return null;
};

module.exports = getOwnerInstnace;
