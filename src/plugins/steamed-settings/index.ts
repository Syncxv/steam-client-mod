import { definePlugin } from 'steamed/util';
import { Settings } from './components/SettingsView';

export default definePlugin({
    name: 'Settings Patcher',
    description: 'this plugin patches the settings sidebar thingy and adds our own stuff to it',
    authors: [{ name: 'Aria', discordId: '0' }],
    version: '1.1.1',
    patches: [
        {
            match: /(FriendsUI ready to render after)/,
            replace: 'Steamed Gang for life $1',
        },
        {
            match: /("FriendSettingsContainer",pages:\[.{1,700})(\])/,
            replace: '$1,...Object.values(steamed.Api.Settings.PluginSections.sections)$2',
        },
    ],

    settingsComponent: {
        title: 'General Settings',
        identifier: 'steamed-general-settings',
        content: () => window.React.createElement(Settings),
    },
});
