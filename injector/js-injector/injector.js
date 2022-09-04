const main = async () => {
    const steamedDist = await (await fetch('./steamed.js')).text();
    document.getElementById('tracked_frame_friends_chat').contentWindow.eval(steamedDist);
};

main().catch((err) => console.error(err));
