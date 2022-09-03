const Injector = require('./code_modules/injector');
const Webpack = require('./code_modules/webpack');
const PluginManager = require('./Steamed/managers/pluginManager');

console.log('WHAT THE FUCK bro');

class Steamed {
    webpack = new Webpack();
    injector = new Injector();
    pluginManager = new PluginManager();
    constructor() {
        this.webpack.initalize();
        this.pluginManager.initalize();
    }
}

window.steamed = new Steamed();
