import { Plugin } from 'steamed/entities';

export default class SettingsPluginGAng extends Plugin {
    public static manifest = {
        name: 'Settings Patcher',
        description: 'this plugin patches the settings sidebar thingy and adds our own stuff to it',
        authors: [{ name: 'Aria' }],
        version: 'fwefw',
    };
    public static patches = [
        {
            match: /(FriendsUI ready to render after)/,
            replace: 'Steamed Gang for life $1',
        },
    ];
}
