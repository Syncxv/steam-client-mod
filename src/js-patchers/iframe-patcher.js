import { createElement } from '../modules/util';
import Patches from 'patches';
console.log('Patches FRIEND :O ', Patches);
(async () => {
    const parser = new DOMParser();
    //get original chat thingy
    const steamHtmlString = await (await fetch(strURL)).text();
    //parse to dom
    const HTML = parser.parseFromString(steamHtmlString, 'text/html');

    //remove original friends.js
    HTML.querySelector('[src*="friends.js"]').remove();
    //fetch the friends.js we got from before
    let cooleo = await (await fetch('friends_web_ui.js')).text();

    //expose cached webpack modules
    let [_, cacheVar] = cooleo.match(/,(.{1,2})={};function/);
    cooleo = cooleo.replace(/(r\.exports})((.{1,2})\..{1,2}=.{1,2})/, `$1$3.c=${cacheVar};$2`);

    for (const [key, patches] of Object.entries(Patches)) {
        console.log(patches);
        if (JSON.parse(localStorage.getItem('steamed_disabled_plugins') ?? '[]').includes(key) || !patches) continue;
        for (const patch of patches) {
            cooleo = cooleo.replace(patch.match, patch.replace);
        }
    }
    window.cooleo = cooleo;

    //convert js to blob for better dev expeirence ig
    let jsBlob = new Blob(
        [
            //without this webpack throws error saying public path aint supported or something idk
            "document.currentScript.src = 'https://community.cloudflare.steamstatic.com/public/javascript/webui/friends.js?v=iXbT9rmgxoRc&l=english&_cdn=cloudflare';" +
                cooleo,
        ],
        { type: 'text/javascript' }
    );
    let jsUrl = URL.createObjectURL(jsBlob);

    //re add the fukinn thingy
    HTML.head.appendChild(createElement(`<script src="${jsUrl}"> </script>`));
    //convert html to blob url and set strURL to it
    let blob = new Blob([HTML.documentElement.innerHTML], { type: 'text/html' });
    let url = URL.createObjectURL(blob);
    strURL = url;
    g_strFrameURL = url;

    console.log('Loading chat from url: ', strURL);
    // start a timer to see when iframe is loaded. If not cancelled, load failed.
    if (g_hLoadIframe !== undefined) clearTimeout(g_hLoadIframe);
    g_hLoadIframe = setTimeout(LoadFrameTimeout, 15000);

    let iframe = document.getElementById(g_strFrame);
    iframe.src = strURL;

    //gg ez we injected
})();
