import Patches from 'patches'
console.log('Patches LIB :O ', Patches)

const main = async () => {
	let libCooleo = await (await fetch('./library.js')).text()

	let [_, cacheVar] = libCooleo.match(/,(.{1,2})={};function/)
	libCooleo = libCooleo.replace(/(r\.exports})((.{1,2})\..{1,2}=.{1,2})/, `$1$3.c=${cacheVar};$2`)

	for (const [key, patches] of Object.entries(Patches)) {
		console.log(patches)
		if (
			JSON.parse(localStorage.getItem('steamed_disabled_plugins') ?? '[]').includes(key) ||
			!patches
		)
			continue
		for (const patch of patches) {
			libCooleo = libCooleo.replace(patch.match, patch.replace)
		}
	}

	window.libCooleo = libCooleo

	let jsBlob = new Blob([libCooleo], { type: 'text/javascript' })
	let jsUrl = URL.createObjectURL(jsBlob)

	let script = document.createElement('script')
	script.src = jsUrl

	document.head.appendChild(script)
	let lib = await (await fetch('./lib-client.js')).text()
	eval(lib)
}

main()
