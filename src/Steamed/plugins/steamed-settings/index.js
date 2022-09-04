const Plugin = require('../../../code_modules/entities/Plugin');
const SettingsView = require('./components/SettingsView');

module.exports = class SettingsPluginGAng extends Plugin {
    startPlugin() {
        let [key, mod] = steamed.webpack.getModule((m) => m?.render?.toString().includes('pages'));
        this.SettingsComponent = mod[key];

        this.unpatch = steamed.patcher.before('bruh', mod[key], 'render', (_this, [props], res) => {
            console.log(_this, props, res);
            if (!props.pages.find((m) => m.identifier === 'steamed'))
                props.pages.push({
                    title: 'Steamed',
                    identifier: 'steamed',
                    content: steamed.webpack.common.React.createElement(SettingsView, { settings: this.settings }),
                });
            return res;
        });
    }

    unloadPlugin() {
        this.unpatch();
    }
};
