import { Plugin } from 'steamed/entities';

export default class SettingsPluginGAng extends Plugin {
    public manifest = {
        name: 'Settings Patcher',
        description: 'this plugin patches the settings sidebar thingy and adds our own stuff to it',
        authors: [{ name: 'Aria' }],
        version: 'fwefw',
    };
    public static patches: [];
}
