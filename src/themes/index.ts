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

import * as DataStore from '@api/DataStore';
import { InlineThemeDef, Theme } from '@src/types';
import { addPopupCreatedCallback, insertCss } from '@utils';
import { defineTheme } from '@utils/defineTheme';
import { isFriendsUI } from '@utils/isFriendsUi';
import Themes from 'themes';

import { Settings } from '../steamed';
export const themes = Themes;

export const isThemeEnabled = (theme: Theme) =>
	Settings.get('enabled_themes', [] as string[]).includes(theme.name);

export async function startAllThemes() {
	const inlineThemes = (await DataStore.get<InlineThemeDef[]>('Steamed_themes')) ?? [];

	for (const theme of inlineThemes) {
		if (themes[theme.name]) {
			console.error('Theme already exists', theme.name);
			continue;
		}

		themes[theme.name] = defineTheme(theme);
	}

	for (const theme of Object.values(Themes))
		if (isThemeEnabled(theme)) {
			startTheme(theme);
		}
}

export async function startTheme(theme: Theme): Promise<void> {
	if (theme.started) {
		console.error('ALREAYD STARTED');
		return;
	}

	switch (theme.type) {
		case 'friend':
			// ill figure it out latear ong
			if (!isFriendsUI()) {
				console.error('NOT FRIENDS UI');
				return;
			}
			const removeCallback = addPopupCreatedCallback(async popup => {
				'THEMES_FRIENDS_GANG';
				if (
					popup.m_strName.startsWith('chat_') ||
					popup.m_strName.startsWith('friendslist') ||
					popup.m_strName === 'Friends List Settings'
				)
					await addStyles(theme, popup.window.document);
			});

			theme.removeCallbacks.push(removeCallback);

			for (const [key, popup] of g_PopupManager.m_mapPopups.entries()) {
				if (
					!(
						key.startsWith('chat_') ||
						key.startsWith('friendslist') ||
						key === 'Friends List Settings'
					)
				)
					continue;
				await addStyles(theme, popup.window.document);
			}
			theme.started = true;
			const enabled = Settings.get('enabled_themes', [] as string[]);
			enabled.push(theme.name);
			Settings.set('enabled_themes', enabled);
			break;
		case 'library':
			// ill do it later ong
			console.log('TODO');
			return;
		default:
			console.log('UNKNOWN TYPE?', theme);
			return;
	}
}

export function stopTheme(theme: Theme) {
	switch (theme.type) {
		case 'friend':
			if (!isFriendsUI()) return;
			for (const removeCallback of theme.removeCallbacks) {
				removeCallback();
			}
			for (const [key, popup] of g_PopupManager.m_mapPopups.entries()) {
				if (
					!(
						key.startsWith('chat_') ||
						key.startsWith('friendslist') ||
						key === 'Friends List Settings'
					)
				)
					continue;
				for (const id of theme.styleIds) {
					popup.window.document.getElementById(id)?.remove();
				}
			}
			theme.started = false;
			const enabled = Settings.get('enabled_themes', [] as string[]).filter(t => t !== theme.name);
			Settings.set('enabled_themes', enabled);
			break;
		case 'library':
			// ill do it later ong
			console.log('TODO');
			return;
		default:
			console.log('UNKNOWN TYPE?', theme);
			return;
	}
}

async function addStyles(theme: Theme, document: Document) {
	if (theme.css) {
		theme.styleIds.push(insertCss(theme.css, document));
		return;
	}
	if (theme.link) {
		const css = await (await fetch(theme.link)).text();
		if (css) {
			theme.css = css;
			theme.styleIds.push(insertCss(css, document));
		}
	}
}
