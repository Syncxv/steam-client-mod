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

import { addPopupCreatedCallback, definePlugin, Devs, generateUuid, insertCss } from '@utils';

const css = `.chatEntry.Panel.Focusable::before {
    content: "steamed IS INJECTED :D";
    position: absolute;
    top: -25%;
    right: 3%;
    z-index: 99;
    font-size: .7rem;
}`;
export default definePlugin({
	name: 'Chat WaterMark',
	description: 'adds a watermark above the chat textarea',
	authors: [Devs.Aria],
	version: '1.1.1',
	id: generateUuid(),

	removeCallback: null as Function | null,
	start() {
		console.log(g_PopupManager);

		this.removeCallback = addPopupCreatedCallback(popup => {
			if (popup.m_strName.startsWith('chat_')) {
				console.log('cool', popup);
				insertCss(css, popup.window.document);
			}
		});
		// this.bruhs = [...g_PopupManager.GetPopups()].map((m) => insertCss(css, m.window.document));
	},

	stop() {
		this.removeCallback && this.removeCallback();
	}
});
