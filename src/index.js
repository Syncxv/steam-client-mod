const Injector = require('./code_modules/injector');
const WatermarkPlugin = require('./Steamed/plugins/watermark');
const Webpack = require('./code_modules/webpack');
const PluginManager = require('./Steamed/managers/pluginManager');

console.log('WHAT THE FUCK bro');

class Steamed {
    webpack = new Webpack();
    injector = new Injector();
    constructor() {
        this.webpack.initalize();
        this.pluginManager = new PluginManager();
        this.test = new WatermarkPlugin();
        this.test.startPlugin();
    }
}

window.steamed = new Steamed();
window.webpackChunkfriendsui;
