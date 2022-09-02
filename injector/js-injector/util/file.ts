import * as fs from 'node:fs';
import * as path from 'node:path';
import { BACK_UP_FRIEND_JS_NAME, BACK_UP_INDEX_FRIENDS_HTML_NAME } from '../constants';

export const getSteamPath = () => {
    return 'C:/Program Files (x86)/Steam';
};

export const isFriendsJsBackedUp = () => {
    return fs.readdirSync(`${getSteamPath()}/clientui`).includes(BACK_UP_FRIEND_JS_NAME);
};

export const backupFriendJs = () => {
    if (isFriendsJsBackedUp()) return;
    fs.copyFileSync(`${getSteamPath()}/clientui/friends.js`, `${getSteamPath()}/clientui/${BACK_UP_FRIEND_JS_NAME}`);
};

export const backupHtml = () => {
    fs.copyFileSync(`${getSteamPath()}/clientui/index_friends.html`, `${getSteamPath()}/clientui/${BACK_UP_INDEX_FRIENDS_HTML_NAME}`);
};
export const getOriginalFriendString = () => {
    const text = fs.readFileSync(`${getSteamPath()}/clientui/friends.js.bak`, 'utf-8');
    (global as any).friendsJsText = text;
    return text;
};

export const writeFriendsJs = (content: string) => {
    fs.writeFileSync(`${getSteamPath()}/clientui/friends.js`, content, 'utf-8');
};

export const restoreFriendJs = () => {
    const o_FriendJs = fs.readFileSync(`${getSteamPath()}/clientui/friends.js.bak`, 'utf-8');
    fs.writeFileSync(`${getSteamPath()}/clientui/friends.js`, o_FriendJs, 'utf-8');
};

export const injectBruh = () => {
    fs.copyFileSync(path.resolve(__dirname, '..', 'hooks', 'bruh.js'), `${getSteamPath()}/clientui/bruh.js`);
    const text = fs.readFileSync(`${getSteamPath()}/clientui/index_friends.html`, 'utf-8');
    const ret = insertScript(text, 'bruh.js');
    fs.writeFileSync(`${getSteamPath()}/clientui/index_friends.html`, ret, 'utf-8');
};

export const insertScript = (html: string, src: string) => {
    const index = html.indexOf('<title>');
    return html.slice(0, index) + `\t<script src=${src}> </script>\n` + html.slice(index);
};
