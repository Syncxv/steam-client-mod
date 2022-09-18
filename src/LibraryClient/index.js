const SettingsAPI = require('../modules/api/settings');
const SteamedPluginSettingsStore = require('../modules/api/settings/SteamedPluginSettingsStore');
const Patcher = require('../modules/patcher');
const Webpack = require('../modules/webpack');

console.log('hi');

class Steamed {
    webpack = new Webpack();
    patcher = Patcher;
    api = {};
    util = require('../modules/util');
    entityID = 'STEAMED_GANG_GANG';
    constructor() {
        window.steamed = this;
        this.api.settings = new SettingsAPI();
        this.settings = new SteamedPluginSettingsStore(this.entityID);
        this.webpack.initalize('webpackChunksteamui');
    }
}

window.steamed = new Steamed();
