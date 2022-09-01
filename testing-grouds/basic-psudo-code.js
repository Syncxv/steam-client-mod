function createElement(html) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.firstChild;
}
const main = async () => {
    let parser = new DOMParser();
    const steamChatUri = await SteamClient.WebChat.GetWebChatURL();
    const steamHtmlString = await (await fetch(steamChatUri)).text();
    const HTML = parser.parseFromString(steamHtmlString, 'text/html');
    HTML.head.append(createElement('<script>console.log("INJECTED GANG YOOOOO")</script>'));
    let blob = new Blob([HTML.documentElement.innerHTML], { type: 'text/html' });
    let url = URL.createObjectURL(blob);
};

main().catch((err) => console.error(err));
