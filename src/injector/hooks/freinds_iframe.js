(async () => {
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
})();
return;
