import { addPopupCreatedCallback, Devs, definePlugin, insertCss } from '@utils'
import css from './styles.css'

export default definePlugin({
	name: 'Discord Theme',
	description: 'cool stuff',
	authors: [Devs.Aria],
	version: '1.1.1',

	removeCallback: null as Function | null,

	ids: [] as string[],

	start() {
		this.removeCallback = addPopupCreatedCallback((popup) => {
			if (popup.m_strName.startsWith('chat_')) {
				this.ids.push(insertCss(css, popup.window.document))
			}
		})
	},

	stop() {
		this.removeCallback && this.removeCallback()
		for (const popup of g_PopupManager.m_mapPopups.values()) {
			if (popup.m_strName.startsWith('chat_')) {
				for (const id of this.ids) {
					const style = popup.window.document.getElementById(id)
					if (style) style.remove()
				}
			}
		}
	}
})
