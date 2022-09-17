const { Plugin } = require('steamed/entities');

const PluginSettings = require('./components/PluginSettings');

module.exports = class PluginsSection extends Plugin {
    manifest = { name: 'Plugins Settings', description: 'the plugins section in settings HEHEH HA', author: 'Aria' };
    startPlugin() {
        steamed.api.settings.registerSetting(this.entityID, {
            title: 'Plugins',
            identifier: 'steamed-plugins',
            content: steamed.webpack.common.React.createElement(PluginSettings),
        });
    }

    unloadPlugin() {
        steamed.api.settings.unregisterSetting(this.entityID);
    }
};
