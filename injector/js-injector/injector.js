let sleep = (ms) => new Promise((res) => setTimeout(() => res, ms));
const main = async () => {
    const steamedDist = await (await fetch('./steamed.js')).text();

    let goodWindow = document.getElementById('tracked_frame_friends_chat').contentWindow;

    function wait() {
        if (!goodWindow?.g_FriendsUIApp?.ready_to_render) {
            setTimeout(wait, 100);
        } else {
            goodWindow.eval(steamedDist);
        }
    }
    wait();
};

main().catch((err) => console.error(err));
