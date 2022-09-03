const findInTree = require('./findInTree');

var findInReactTree = (tree, filter) =>
    findInTree(tree, filter, {
        walkable: ['props', 'children', 'child', 'sibling'],
    });
module.exports = findInReactTree;
