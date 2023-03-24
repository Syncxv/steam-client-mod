import Patches from 'patches';
console.log('Patches LIB :O ', Patches);

const main = async () => {
    // this is steams library.js file not ours. we patching this one
    let libCooleo = await (await fetch('./library.js')).text();

    const [_, cacheVar] = libCooleo.match(/,(.{1,2})={};function/);
    libCooleo = libCooleo.replace(/(r\.exports})((.{1,2})\..{1,2}=.{1,2})/, `$1$3.c=${cacheVar};$2`);

    for (const [key, patches] of Object.entries(Patches)) {
        console.log(patches);
        if (
            JSON.parse(localStorage.getItem('steamed_disabled_plugins') ?? '[]').includes(key) ||
			!patches
        )
            continue;
        for (const patch of patches) {
            libCooleo = libCooleo.replace(patch.match, patch.replace);
        }
    }

    window.libCooleo = libCooleo;

    const jsBlob = new Blob([libCooleo], { type: 'text/javascript' });
    const jsUrl = URL.createObjectURL(jsBlob);

    const script = document.createElement('script');
    script.src = jsUrl;

    document.head.appendChild(script);
    const lib = await (await fetch('./lib-client.js')).text();
    window.eval(lib);
};

main();
