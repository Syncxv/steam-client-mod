import { insertCss, definePlugin } from 'steamed/util'
import { getRandomId } from '../modules/util/getRandomId'

let css = `.chatEntry.Panel.Focusable::before {
    content: "steamed IS INJECTED :D";
    position: absolute;
    top: -25%;
    right: 3%;
    z-index: 99;
    font-size: .7rem;
}`
export default definePlugin({
	name: 'Chat WaterMark',
	description: 'adds a watermark above the chat textarea',
	authors: [{ name: 'Aria' }],
	version: '1.1.1',
	id: getRandomId(),
	start() {
		console.log(g_PopupManager)

		const bruh = (popup: any) => {
			if (popup.m_strName.startsWith('chat_')) {
				console.log('cool', popup)
				insertCss(css, popup.window.document)
			}
		}
		bruh.id = this.id
		g_PopupManager.m_rgPopupCreatedCallbacks.push(bruh)
		// this.bruhs = [...g_PopupManager.GetPopups()].map((m) => insertCss(css, m.window.document));
	},

	stop() {
		g_PopupManager.m_rgPopupCreatedCallbacks = g_PopupManager.m_rgPopupCreatedCallbacks.filter(
			(c: any) => c.id !== this.id
		)
	}
})
