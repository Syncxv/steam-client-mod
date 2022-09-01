const createElement = (html) => {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.firstChild;
};
SteamClient.WebChat.GetWebChatURL = ((promise) => async () => {
    let parser = new DOMParser();
    const steamHtmlString = await (await fetch(await promise)).text();
    const HTML = parser.parseFromString(steamHtmlString, 'text/html');
    HTML.head.appendChild(createElement('<script>console.log("INJECTED GANG YOOOOO")</script>'));
    let blob = new Blob([HTML.documentElement.innerHTML], { type: 'text/html' });
    return URL.createObjectURL(blob);
})((this.promiseee = SteamClient.WebChat.GetWebChatURL()));
