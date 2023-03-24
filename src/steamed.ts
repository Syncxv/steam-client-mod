export * as Plugins from './plugins';
export * as Themes from './themes';
export * as Api from '@api';
export * as Components from '@components';
export * as Util from '@utils';
export * as Webpack from '@webpack';

import { PluginSettings } from '@api/settings';

export { PluginSettings as Settings };

import { waitFor } from '@utils';
import { WEBPACK_CHUNK } from '@utils/constants';
import { isFriendsUI } from '@utils/isFriendsUi';
import { _initWebpack } from '@webpack';

import { startAllPlugins } from './plugins';
import { startAllThemes } from './themes';

export async function init(addPopupCreatedCallback: () => void) {
    if (isFriendsUI()) {
        return waitFor(
            () => window?.g_FriendsUIApp?.ready_to_render,
            () => {
                console.log('READY');
                // g_PopupManager.m_rgShutdownCallbacks.push(() => fetch('http://localhost:8080/shutdown'))
                _initWebpack(window[WEBPACK_CHUNK]);
                startAllThemes();
                startAllPlugins();

                addPopupCreatedCallback();
            }
        );
    }

    waitFor(
        () => window?.libraryEventStore?.m_bEventsLoaded,
        () => {
            _initWebpack(window[WEBPACK_CHUNK]);
            startAllThemes();
            startAllPlugins();

            addPopupCreatedCallback();
        }
    );
}

// init();
