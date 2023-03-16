//THIS "code" gets injected into a load friend chat function. strURL is an arg from that function no cap
//AND anything with g_ is a global variable inside friends.js in /clientui

import { createElement } from '../utils'
import Patches from 'patches'
import { processPatch } from '@utils/patches';
console.log('Patches FRIEND :O ', Patches)
;(async () => {
	const parser = new DOMParser()
	//get original chat thingy
	const steamHtmlString = await (await fetch(strURL)).text()
	//parse to dom
	const HTML = parser.parseFromString(steamHtmlString, 'text/html')

	//remove original friends.js
	HTML.querySelector('[src*="friends.js"]').remove()
	//fetch the friends.js we got from before
	let cooleo = await (await fetch('friends_web_ui.js')).text()

	//expose cached webpack modules
	const [_, cacheVar] = cooleo.match(/,(.{1,2})={};function/)
	cooleo = cooleo.replace(/(,(.{1,2})\.amdO=)/, `,$2.c=${cacheVar}$1`)

	for (const [pluginName, patches] of Object.entries(Patches)) {
		console.log(patches)
		if (
			JSON.parse(localStorage.getItem('steamed_disabled_plugins') ?? '[]').includes(pluginName) ||
			!patches
		)
			continue
		for (const patch of patches) {
			if ((patch.predicate == null || patch.predicate) && patch.match && patch.replace)
				cooleo = cooleo.replace(patch.match, processPatch(patch.replace, pluginName))
		}
	}
	window.cooleo = cooleo

	//convert js to blob for better dev expeirence ig
	const jsBlob = new Blob(
		[
			//without this webpack throws error saying public path aint supported or something idk
			"document.currentScript.src = 'https://community.cloudflare.steamstatic.com/public/javascript/webui/friends.js?v=iXbT9rmgxoRc&l=english&_cdn=cloudflare';" +
				cooleo
		],
		{ type: 'text/javascript' }
	)
	const jsUrl = URL.createObjectURL(jsBlob)

	//re add the fukinn thingy
	HTML.head.appendChild(createElement(`<script src="${jsUrl}"> </script>`))
	//convert html to blob url and set strURL to it
	const blob = new Blob([HTML.documentElement.innerHTML], { type: 'text/html' })
	const url = URL.createObjectURL(blob)
	strURL = url
	g_strFrameURL = url

	console.log('Loading chat from url: ', strURL)
	// start a timer to see when iframe is loaded. If not cancelled, load failed.
	if (g_hLoadIframe !== undefined) clearTimeout(g_hLoadIframe)
	g_hLoadIframe = setTimeout(LoadFrameTimeout, 15000)

	const iframe = document.getElementById(g_strFrame)
	iframe.src = strURL

	//gg ez we injected
})()
