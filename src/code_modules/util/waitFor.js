const sleep = require('./sleep');

const waitFor = async (querySelector, _document = window.document) => {
    let elem;

    while (!(elem = _document.querySelector(querySelector))) {
        await sleep(1);
    }

    return elem;
};

module.exports = waitFor;
