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

import { _initWebpack } from './modules/webpack';
import { WEBPACK_CHUNK } from './constants';
import { isFriendsUI } from './modules/util/isFriendsUi';

export async function init() {
    if (isFriendsUI()) {
        function wait() {
            if (!window?.g_FriendsUIApp?.ready_to_render) {
                setTimeout(wait, 1);
            } else {
                console.log('READY');
                _initWebpack(window[WEBPACK_CHUNK]);
                startAllThemes();
                startAllPlugins();
            }
        }
        return wait();
    }

    _initWebpack(window[WEBPACK_CHUNK]);
    startAllThemes();
    startAllPlugins();
}

// init();
