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

import { addPopupCreatedCallback, definePlugin, Devs, insertCss } from '@utils';
import { React } from '@webpack/common';

import { Settings } from './components/Settings';
import css from './styles.scss';

export default definePlugin({
	name: 'Themes',
	description: 'Idk Man Themes eh',
	authors: [Devs.Aria],
	version: '1.1.1',
	type: 'all',
	settingsComponent: {
		title: 'Themes',
		identifier: 'steamed-themes',
		content: () => React.createElement(Settings)
	},

	removeCallback: null as Function | null,
	start() {
		this.removeCallback = addPopupCreatedCallback(popup => {
			if (popup.m_strName === 'Friends List Settings') {
				insertCss(css, popup.window.document);
			}
		});
	},

	stop() {
		this.removeCallback && this.removeCallback();
	}
});
