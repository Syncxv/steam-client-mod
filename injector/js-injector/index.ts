import * as FileManager from './util/file';
const main = async () => {
    FileManager.restoreFriendJs();
    // FileManager.backupHtml();
    const friendsJsText = FileManager.getOriginalFriendString();
    const index = friendsJsText.indexOf('console.log("Loading chat from url: ",e)');
    const _hookedJs =
        friendsJsText.slice(0, index) +
        `(async () => {
            const createElement = (html) => {
                const temp = document.createElement('div');
                temp.innerHTML = html;
                return temp.firstChild;
            };
            let parser = new DOMParser();
            const steamHtmlString = await (await fetch(e)).text();
            const HTML = parser.parseFromString(steamHtmlString, 'text/html');
            HTML.head.appendChild(createElement('<script>console.log("INJECTED GANG YOOOOO")</script>'));
            let blob = new Blob([HTML.documentElement.innerHTML], { type: 'text/html' });
            e = URL.createObjectURL(blob);
            let iframe = document.getElementById(j);
            iframe.src = e;
            ot = e;
        })();
        return;
        ` +
        '\n\n' +
        friendsJsText.slice(index);
    FileManager.writeFriendsJs(_hookedJs);
    // FileManager.restoreFriendJs();
    // setTimeout(() => {}, 99999999);
};

main().catch((err) => console.error(err));