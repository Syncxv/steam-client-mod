export * as Plugins from './plugins';
export * as Webpack from '../modules/webpack';
export * as Api from '../modules/api';
export * as Util from '../modules/util';

import { PluginSettings } from '../modules/api/settings';

export { PluginSettings as Settings };

import { startAllPlugins } from './plugins';

import 'steamed/webpack/patchWebpack';

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
