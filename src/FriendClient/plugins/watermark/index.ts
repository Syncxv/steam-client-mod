import insertCss from '../../../modules/util/insertCss';
import { definePlugin } from '../../../modules/util/definePlugin';

let css = `.chatEntry.Panel.Focusable::before {
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
    authors: [{ name: 'Aria' }],
    version: '1.1.1',

    start() {
        console.log(g_PopupManager);
        g_PopupManager.m_rgPopupCreatedCallbacks.push((popup: any) => {
            if (popup.m_strName.startsWith('chat_')) {
                console.log('cool', popup);
                insertCss(css, popup.window.document);
            }
        });
        // this.bruhs = [...g_PopupManager.GetPopups()].map((m) => insertCss(css, m.window.document));
    },
});
