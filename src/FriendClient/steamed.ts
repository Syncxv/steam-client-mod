export * as Plugins from './plugins';
export * as Webpack from '../modules/webpack';

import { SteamedPluginSettingsStore } from '../modules/api/settings';
import { startAllPlugins } from './plugins';

import 'steamed/webpack/patchWebpack';

export const Settings = new SteamedPluginSettingsStore('STEAMED_FRIENDS_GANG');
async function init() {
    function wait() {
        if (!window?.g_FriendsUIApp?.ready_to_render) {
            setTimeout(wait, 1);
        } else {
            console.log('READY');
            startAllPlugins();
        }
    }
    wait();
}

init();
