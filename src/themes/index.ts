import Themes from 'themes';
import { Theme } from '../types';

export const themes = Themes;

export const isThemeEnabled = (theme: Theme) => JSON.parse(localStorage.getItem('steamed_enabled_themes') ?? '[]').includes(theme.name);

export function startAllThemes() {
    for (const theme of Object.values(Themes))
        if (isThemeEnabled(theme)) {
            startTheme(theme);
        }
}

export function startTheme(theme: Theme) {
    if (theme.started) return console.error('ALREAYD STARTED');

    switch (theme.type) {
        case 'friend':
            const cb = (popup: any) => {
                'THEMES_FRIENDS_GANG';
                if (!(popup.m_strName.startsWith('chat_') || popup.m_strName.startsWith('friendslist'))) return;
                theme.styleIds.push(steamed.Util.insertCss(theme.css, popup.window.document));
            };
            cb.name = theme.name;
            g_PopupManager.m_rgPopupCreatedCallbacks.push(cb);

            for (let [key, popup] of g_PopupManager.m_mapPopups.entries()) {
                if (!(key.startsWith('chat_') || key.startsWith('friendslist'))) continue;
                theme.styleIds.push(steamed.Util.insertCss(theme.css, popup.window.document));
            }
            break;
        case 'library':
            //ill do it later ong
            return console.log('TODO');
        default:
            console.log('UNKNOWN TYPE?', theme);
    }
}

export function stopTheme(theme: Theme) {
    switch (theme.type) {
        case 'friend':
            g_PopupManager.m_rgPopupCreatedCallbacks.filter((c: Function & { name: string }) => !(c.name === theme.name));
            for (let [key, popup] of g_PopupManager.m_mapPopups.entries()) {
                if (!(key.startsWith('chat_') || key.startsWith('friendslist'))) continue;
                for (let id of theme.styleIds) {
                    popup.window.document.getElementById(id)?.remove();
                }
            }
            break;
        case 'library':
            //ill do it later ong
            return console.log('TODO');
        default:
            console.log('UNKNOWN TYPE?', theme);
    }
}
