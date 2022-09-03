const insertCss = require('../../../code_modules/util/insertCss');
const Plugin = require('../../../code_modules/entities/Plugin');

let css = `.chatEntry.Panel.Focusable::before {
    content: "steamed IS INJECTED :D";
    position: absolute;
    top: -25%;
    right: 3%;
    z-index: 99;
    font-size: .7rem;
}`;
module.exports = class WatermarkPlugin extends Plugin {
    startPlugin() {
        console.log(g_PopupManager);
        g_PopupManager.m_rgPopupCreatedCallbacks.push((popup) => {
            if (popup.m_strName.startsWith('chat_')) {
                console.log('cool', popup);
                insertCss(css, popup.window.document);
            }
        });
        // this.bruhs = [...g_PopupManager.GetPopups()].map((m) => insertCss(css, m.window.document));
    }

    unloadPlugin() {}
};
