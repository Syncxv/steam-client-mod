const Injector = require('./code_modules/injector');
const Webpack = require('./code_modules/webpack');

console.log('WHAT THE FUCK bro');

class Steamed {
    webpack = new Webpack();
    injector = new Injector();
    constructor() {
        this.webpack.initalize();
    }
}

window.steamed = new Steamed();
window.webpackChunkfriendsui;
