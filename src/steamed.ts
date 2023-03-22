export * as Plugins from './plugins'
export * as Themes from './themes'
export * as Webpack from '@webpack'
export * as Api from '@api'
export * as Util from '@utils'
export * as Components from '@components'

import { PluginSettings } from '@api/settings'

export { PluginSettings as Settings }

import { startAllPlugins } from './plugins'
import { startAllThemes } from './themes'

import { _initWebpack } from '@webpack'
import { isFriendsUI } from '@utils/isFriendsUi'
import { WEBPACK_CHUNK } from '@utils/constants'
import { waitFor } from '@utils'

export async function init(addPopupCreatedCallback: () => void) {
	if (isFriendsUI()) {
		return waitFor(
			() => window?.g_FriendsUIApp?.ready_to_render,
			() => {
				console.log('READY')
				// g_PopupManager.m_rgShutdownCallbacks.push(() => fetch('http://localhost:8080/shutdown'))
				_initWebpack(window[WEBPACK_CHUNK])
				startAllThemes()
				startAllPlugins()

				addPopupCreatedCallback()
			}
		)
	}

	waitFor(
		() => window?.libraryEventStore?.m_bEventsLoaded,
		() => {
			_initWebpack(window[WEBPACK_CHUNK])
			startAllThemes()
			startAllPlugins()

			addPopupCreatedCallback()
		}
	)
}

// init();
