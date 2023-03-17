import Themes from 'themes'
import { InlineThemeDef, Theme } from '@src/types'
import { Settings } from '../steamed'
import { addPopupCreatedCallback, insertCss } from '@utils'
import { isFriendsUI } from '@utils/isFriendsUi'
import * as DataStore from '@api/DataStore'
import { defineTheme } from '@utils/defineTheme'
export const themes = Themes

export const isThemeEnabled = (theme: Theme) =>
	Settings.get('enabled_themes', [] as string[]).includes(theme.name)

export async function startAllThemes() {
	const inlineThemes = (await DataStore.get<InlineThemeDef[]>('Steamed_themes')) ?? []

	for (const theme of inlineThemes) {
		if (themes[theme.name]) {
			console.error('Theme already exists', theme.name)
			continue
		}

		themes[theme.name] = defineTheme(theme)
	}

	for (const theme of Object.values(Themes))
		if (isThemeEnabled(theme)) {
			startTheme(theme)
		}
}

export function startTheme(theme: Theme) {
	if (theme.started) return console.error('ALREAYD STARTED')

	switch (theme.type) {
		case 'friend':
			//ill figure it out latear ong
			if (!isFriendsUI()) return
			const removeCallback = addPopupCreatedCallback((popup) => {
				'THEMES_FRIENDS_GANG'
				if (!(popup.m_strName.startsWith('chat_') || popup.m_strName.startsWith('friendslist')))
					return
				addStyles(theme, popup.window.document)
			})

			theme.removeCallbacks.push(removeCallback)

			for (let [key, popup] of g_PopupManager.m_mapPopups.entries()) {
				if (!(key.startsWith('chat_') || key.startsWith('friendslist'))) continue
				addStyles(theme, popup.window.document)
			}
			theme.started = true
			const enabled = Settings.get('enabled_themes', [] as string[])
			enabled.push(theme.name)
			Settings.set('enabled_themes', enabled)
			break
		case 'library':
			//ill do it later ong
			return console.log('TODO')
		default:
			console.log('UNKNOWN TYPE?', theme)
	}
}

export function stopTheme(theme: Theme) {
	switch (theme.type) {
		case 'friend':
			if (!isFriendsUI()) return
			for (let removeCallback of theme.removeCallbacks) {
				removeCallback()
			}
			for (let [key, popup] of g_PopupManager.m_mapPopups.entries()) {
				if (!(key.startsWith('chat_') || key.startsWith('friendslist'))) continue
				for (let id of theme.styleIds) {
					popup.window.document.getElementById(id)?.remove()
				}
			}
			theme.started = false
			const enabled = Settings.get('enabled_themes', [] as string[]).filter((t) => t !== theme.name)
			Settings.set('enabled_themes', enabled)
			break
		case 'library':
			//ill do it later ong
			return console.log('TODO')
		default:
			console.log('UNKNOWN TYPE?', theme)
	}
}

function addStyles(theme: Theme, document: Document) {
	if (theme.css) theme.styleIds.push(insertCss(theme.css, document))
	if (theme.link) theme.styleIds.push(insertCss(`@import url("${theme.link.trim()}");`, document))
}
