export * as Plugins from "./plugins";
export * as Themes from "./themes";
export * as Api from "@api";
export * as Components from "@components";
export * as Util from "@utils";
export * as Webpack from "@webpack";

import { PluginSettings } from "@api/settings";

export { PluginSettings as Settings };

import { waitFor } from "@utils";
import { WEBPACK_CHUNK } from "@utils/constants";
import { isFriendsUI } from "@utils/isFriendsUi";
import { _initWebpack } from "@webpack";

import { startAllPlugins } from "./plugins";
import { startAllThemes } from "./themes";

export async function init(addPopupCreatedCallback: () => void) {
	waitFor(
		() => isFriendsUI() ? window?.g_FriendsUIApp?.ready_to_render : window?.libraryEventStore?.m_bEventsLoaded,
		() => {
			_initWebpack(window[WEBPACK_CHUNK]);
			startAllThemes();
			startAllPlugins();

			addPopupCreatedCallback();
		}
	);
}

// init();
