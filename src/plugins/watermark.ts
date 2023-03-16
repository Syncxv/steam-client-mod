import { TPopup } from '@src/types/global'
import { insertCss, definePlugin } from '@utils'
import { Devs } from '@utils/constants'
import { getRandomId } from '@utils/getRandomId'

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
	authors: [Devs.Aria],
	version: '1.1.1',
	id: getRandomId(),
	start() {
		console.log(g_PopupManager)

		const bruh = (popup: TPopup) => {
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
