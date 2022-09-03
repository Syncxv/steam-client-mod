const Injector = require('./code_modules/injector');
const WatermarkPlugin = require('./code_modules/plugins/watermark');
const Webpack = require('./code_modules/webpack');

console.log('WHAT THE FUCK bro');

class Steamed {
    webpack = new Webpack();
    injector = new Injector();
    constructor() {
        this.webpack.initalize();
        this.test = new WatermarkPlugin();
        this.test.startPlugin();
    }
}

window.steamed = new Steamed();
window.webpackChunkfriendsui;
