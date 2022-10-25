const main = async () => {
    let libCooleo = await (await fetch('./library.js')).text();

    let [_, cacheVar] = libCooleo.match(/,(.{1,2})={};function/);
    libCooleo = libCooleo.replace(/(r\.exports})((.{1,2})\..{1,2}=.{1,2})/, `$1$3.c=${cacheVar};$2`);

    window.libCooleo = libCooleo;

    let jsBlob = new Blob([libCooleo], { type: 'text/javascript' });
    let jsUrl = URL.createObjectURL(jsBlob);

    let script = document.createElement('script');
    script.src = jsUrl;

    document.head.appendChild(script);
    let lib = await (await fetch('./lib-client.js')).text();
    eval(lib);
};

main();
