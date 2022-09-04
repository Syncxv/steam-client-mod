const Plugin = require('../../../code_modules/entities/Plugin');

module.exports = class PluginsSection extends Plugin {
    startPlugin() {
        steamed.api.settings.registerSetting(this.entityID, {
            title: 'Plugins',
            identifier: 'steamed-plugins',
            content: steamed.webpack.common.React.createElement('div', {}, 'plugins gang'),
        });
    }
};
