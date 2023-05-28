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

import { GenericCallback } from '@src/types/global';

import { generateUuid } from './generateUuid';

export const addPopupCreatedCallback = (
	callback: GenericCallback,
	opt: { executeOnExistingPopups: boolean } = { executeOnExistingPopups: false }
): (() => void) => {
	const newCallback: GenericCallback = popup => {
		try {
			callback(popup);
		} catch (e) {
			console.error('Error in popup created callback', e);
		}
	};
	newCallback.id = generateUuid('pop-up-callback');

	g_PopupManager.m_rgPopupCreatedCallbacks.push(newCallback);

	if (opt.executeOnExistingPopups) {
		for (const popup of g_PopupManager.m_mapPopups.values()) {
			newCallback(popup);
		}
	}

	return () => {
		g_PopupManager.m_rgPopupCreatedCallbacks = g_PopupManager.m_rgPopupCreatedCallbacks.filter(
			cb => cb.id !== newCallback.id
		);
	};
};
