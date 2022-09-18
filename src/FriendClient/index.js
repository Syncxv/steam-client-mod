const CommandAPI = require('../modules/api/commands');
const SettingsAPI = require('../modules/api/settings');
const SteamedPluginSettingsStore = require('../modules/api/settings/SteamedPluginSettingsStore');
const Patcher = require('../modules/patcher');
const Webpack = require('../modules/webpack');
const PluginManager = require('./Steamed/managers/pluginManager');

console.log('WHAT THE FUCK bro');

class Steamed {
    webpack = new Webpack();
    patcher = Patcher;
    pluginManager = new PluginManager();
    api = {};
    util = require('../modules/util');
    entityID = 'STEAMED_GANG_GANG';
    constructor() {
        window.steamed = this;
        this.api.settings = new SettingsAPI();
        this.api.commands = new CommandAPI();
        this.settings = new SteamedPluginSettingsStore(this.entityID);
        this.webpack.initalize();
        this.pluginManager.initalize();
    }
}

const steamed = new Steamed();
module.exports = steamed;
// `let unpatch = steamed.patcher.before("hi", _this.props.chatView, 'SendChatMessage', (_this, args, res) => {
//     console.log(_this, args, res)
//     args[0] = args[0].replace(":sunglasses:", "😎")
//     console.log(args)

//     return args
// })`;
