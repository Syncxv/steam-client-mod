import { addPopupCreatedCallback, Devs, definePlugin, insertCss } from '@utils'
import css from './styles.css'

export default definePlugin({
	name: 'Discord Theme',
	description: 'cool stuff',
	authors: [Devs.Aria],
	version: '1.1.1',

	removeCallback: null as Function | null,

	start() {
		this.removeCallback = addPopupCreatedCallback((popup) => {
			if (popup.m_strName.startsWith('chat_')) {
				insertCss(css, popup.window.document)
			}
		})
	},

	stop() {
		this.removeCallback && this.removeCallback()
	}
})
