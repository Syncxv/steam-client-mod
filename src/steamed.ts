/*
 * Steamed, a modification for the Steam Client
 * Copyright (c) 2023 Syncxv
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

export * as Plugins from "./plugins";
// export * as Themes from "./themes";
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
// import { startAllThemes } from "./themes";

export async function init(addPopupCreatedCallback: () => void) {
    waitFor(
        () => isFriendsUI() ? window?.g_FriendsUIApp?.ready_to_render : window?.libraryEventStore?.m_bEventsLoaded,
        () => {
            _initWebpack(window[WEBPACK_CHUNK]);
            // startAllThemes();
            startAllPlugins();

            addPopupCreatedCallback();
        }
    );
}

// init();
