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
