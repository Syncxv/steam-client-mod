import * as fs from 'node:fs';

export const getSteamPath = () => {
    return 'C:/Program Files (x86)/Steam';
};

export const isFriendsJsBackedUp = () => {
    const bruh = fs.readdirSync(`${getSteamPath()}/clientui`);
    console.log(bruh);
};
