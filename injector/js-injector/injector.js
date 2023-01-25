function iframeURLChange(iframe, callback) {
    var unloadHandler = function() {
        // Timeout needed because the URL changes immediately after
        // the `unload` event is dispatched.
        setTimeout(function() {
            callback(iframe.contentWindow.location.href);
        }, 0);
    };

    function attachUnload() {
        // Remove the unloadHandler in case it was already attached.
        // Otherwise, the change will be dispatched twice.
        iframe.contentWindow.removeEventListener('unload', unloadHandler);
        iframe.contentWindow.addEventListener('unload', unloadHandler);
    }

    iframe.addEventListener('load', attachUnload);
    attachUnload();
}

const main = async() => {
    document.currentScript.src = 'hehehe';
    const steamedDist = await (await fetch('./steamed.js')).text();
    // eval(await (await fetch('https://code.jquery.com/jquery-3.6.1.min.js')).text());

    iframeURLChange(document.getElementById('tracked_frame_friends_chat'), function(newURL) {
        console.log('URL changed:', newURL);
        let goodWindow = document.getElementById('tracked_frame_friends_chat').contentWindow;
        goodWindow.steamedDist = steamedDist;
        goodWindow.reload = () => location.reload();
        goodWindow.eval(steamedDist);
    });
};

main().catch((err) => console.error(err));