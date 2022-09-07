const main = async () => {
    const steamedDist = await (await fetch('./steamed.js')).text();

    let goodWindow = document.getElementById('tracked_frame_friends_chat').contentWindow;

    function wait() {
        if (!goodWindow?.g_FriendsUIApp?.ready_to_render) {
            setTimeout(wait, 1);
        } else {
            goodWindow.reload = () => location.reload();
            goodWindow.eval(steamedDist);
        }
    }
    wait();
};

main().catch((err) => console.error(err));
