export * as Plugins from './plugins';
export * as Themes from './themes';
export * as Webpack from './modules/webpack';
export * as Api from './modules/api';
export * as Util from './modules/util';
export * as Components from './modules/components';

import { PluginSettings } from './modules/api/settings';

export { PluginSettings as Settings };

import { startAllPlugins } from './plugins';
import { startAllThemes } from './themes';

import 'steamed/webpack/patchWebpack';

async function init() {
    function wait() {
        if (!window?.g_FriendsUIApp?.ready_to_render) {
            setTimeout(wait, 1);
        } else {
            console.log('READY');
            startAllThemes();
            startAllPlugins();
        }
    }
    wait();
}

init();
