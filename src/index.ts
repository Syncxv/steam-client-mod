import * as FileManager from './util/file';

const main = async () => {
    const friendsJsText = FileManager.getFreindsJsString();
    const index = friendsJsText.indexOf('console.log("Loading chat from url: ",e)');
    const hookedJs = friendsJsText.slice(0, index) + `console.log("HI THERE I LOVE YOU");` + friendsJsText.slice(index);
    FileManager.writeFriendsJs(hookedJs);
    setTimeout(() => {}, 99999999);
};

main().catch((err) => console.error(err));
