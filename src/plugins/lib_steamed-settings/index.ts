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

import { addPopupCreatedCallback, definePlugin } from '@utils';
import { Devs } from '@utils/constants';
import { React, ReactDOM } from '@webpack/common';

import { DropThingy } from './components/SteamedDropThingy';
import css from './style.scss';
export default definePlugin({
	name: 'LibrarySettings',
	description: 'hi',
	authors: [Devs.Aria],
	version: '1.1.1',
	type: 'library',
	css,
	start() {
		addPopupCreatedCallback(
			popup => {
				if (!popup.m_strName.includes('SteamLibraryWindow')) return;
				const container = popup.window.document.createElement('container-gang');
				popup.window.document.body.appendChild(container);

				ReactDOM.render(
					React.createElement('div', {}, React.createElement(DropThingy)),
					popup.window.document.querySelector('container-gang')
				);
			},
			{ runOnOpenedPopups: true }
		);
	}
});
