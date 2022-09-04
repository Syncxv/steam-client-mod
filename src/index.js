const Patcher = require('./code_modules/injector');
const Webpack = require('./code_modules/webpack');
const PluginManager = require('./Steamed/managers/pluginManager');

console.log('WHAT THE FUCK bro');

class Steamed {
    webpack = new Webpack();
    patcher = Patcher;
    pluginManager = new PluginManager();
    constructor() {
        this.webpack.initalize();
        this.pluginManager.initalize();
    }
}

window.steamed = new Steamed();
`let unpatch = steamed.patcher.before("hi", _this.props.chatView, 'SendChatMessage', (_this, args, res) => {
    console.log(_this, args, res)
    args[0] = args[0].replace(":sunglasses:", "😎")
    console.log(args)
    
    return args
})`;
