const Plugin = require('../../../code_modules/entities/Plugin');
const SettingsView = require('./components/SettingsView');

module.exports = class SettingsPluginGAng extends Plugin {
    startPlugin() {
        steamed.api.settings.registerSetting(this.entityID, {
            title: 'Steamed',
            identifier: 'steamed',
            content: steamed.webpack.common.React.createElement(SettingsView, { settings: this.settings }),
        });

        this.patchSettings();
    }

    patchSettings() {
        let [key, mod] = steamed.webpack.getModule((m) => m?.render?.toString().includes('pages'));
        this.SettingsComponent = mod[key];
        this.unpatch = steamed.patcher.before('bruh', mod[key], 'render', (_this, [props], res) => {
            console.log(_this, props, res);
            const sections = Object.values(steamed.api.settings.sections);
            sections.forEach((s) => {
                if (!props.pages.find((m) => m.identifier === s.identifier)) props.pages.push(s);
            });
            return res;
        });
    }

    unloadPlugin() {
        this.unpatch();
    }
};
