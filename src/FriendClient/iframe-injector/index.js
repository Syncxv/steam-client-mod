import createElement from '../../modules/util/createElement';
import * as Plugins from '../plugins';
console.log('PLUGINS :O ', Plugins);
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

    //do some regex magic replacement if ya want

    //expose cached webpack modules
    let [_, cacheVar] = cooleo.match(/,(.{1,2})={};function/);
    cooleo = cooleo.replace(/(,(.{1,2})\.amdO=)/, `,$2.c=${cacheVar}$1`);

    //ima do it in a min
    for (const plugin of Object.values(Plugins.plugins)) {
        console.log(plugin);
        if (!(localStorage.getItem('steamed_disabled_plugins') ?? []).includes(plugin.manifest.name) || !plugin.patches) continue;
        for (const patch of plugin.patches) {
            cooleo = cooleo.replace(patch.match, patch.replace);
        }
    }

    window.cooleo = cooleo;

    //re add the fukinn thingy
    HTML.head.appendChild(
        createElement(
            `<script> ${
                //without this webpack throws error saying public path aint supported or something idk
                "document.currentScript.src = 'https://community.cloudflare.steamstatic.com/public/javascript/webui/friends.js?v=iXbT9rmgxoRc&l=english&_cdn=cloudflare';" +
                cooleo
            } </script>`
        )
    );
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
