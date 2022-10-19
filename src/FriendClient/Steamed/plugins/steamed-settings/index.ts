import { Plugin } from 'steamed/entities';
import SettingsView from './components/SettingsView';

export default class SettingsPluginGAng extends Plugin {
    public manifest = {
        name: 'Settings Patcher',
        description: 'this plugin patches the settings sidebar thingy and adds our own stuff to it',
        authors: [{ name: 'Aria' }],
        version: 'fwefw',
    };
    startPlugin() {
        steamed.api.settings.registerSetting(this.entityID, {
            title: 'Steamed',
            identifier: 'steamed',
            content: steamed.webpack.common.React.createElement(SettingsView, { settings: this.settings }),
        });

        this.patchSettings();
    }

    patchSettings() {
        let [key, mod] = steamed.Webpack.find((m) => m?.render?.toString().includes('pages'));
        this.SettingsComponent = mod[key];
        this.unpatch = steamed.patcher.before('bruh', mod[key], 'render', (_this, [props], res) => {
            console.log(_this, props, res);
            //what the fuck?
            const sections = Object.values(steamed.api.settings.sections).sort((a, b) => (b.identifier === 'steamed' ? 1 : -1));
            sections.forEach((s) => {
                if (!props.pages.find((m) => m.identifier === s.identifier)) props.pages.push(s);
            });
            return res;
        });
    }

    public stop() {
        steamed.api.settings.unregisterSetting(this.entityID);
    }
}
