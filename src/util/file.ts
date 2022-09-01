import * as fs from 'node:fs';
import { BACK_UP_FRIEND_JS_NAME } from '../constants';

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
