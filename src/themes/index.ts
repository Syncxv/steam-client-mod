import Themes from 'themes'
import { Theme } from '@types'
import { Settings } from '../steamed'
import { insertCss } from '@utils'
import { isFriendsUI } from '@utils/isFriendsUi'
export const themes = Themes

export const isThemeEnabled = (theme: Theme) =>
	Settings.get('enabled_themes', [] as string[]).includes(theme.name)

export function startAllThemes() {
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
			const cb = (popup: any) => {
				'THEMES_FRIENDS_GANG'
				if (!(popup.m_strName.startsWith('chat_') || popup.m_strName.startsWith('friendslist')))
					return
				theme.styleIds.push(insertCss(theme.css, popup.window.document))
			}
			cb.themeName = theme.name
			g_PopupManager.m_rgPopupCreatedCallbacks.push(cb)

			for (let [key, popup] of g_PopupManager.m_mapPopups.entries()) {
				if (!(key.startsWith('chat_') || key.startsWith('friendslist'))) continue
				theme.styleIds.push(insertCss(theme.css, popup.window.document))
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
			g_PopupManager.m_rgPopupCreatedCallbacks = g_PopupManager.m_rgPopupCreatedCallbacks.filter(
				(c: Function) => !((c as any).themeName === theme.name)
			)
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
