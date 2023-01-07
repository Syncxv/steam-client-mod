use log::info;
use std::collections::HashMap;
use std::env;
use std::fs;
use std::path::Path;
pub fn handle_friend_command(steam_config: HashMap<String, String>) {
    inject_friend_javascript(steam_config).unwrap();
}

pub fn inject_friend_javascript(
    config: HashMap<String, String>,
) -> Result<(), Box<dyn std::error::Error>> {
    let curr_dir = env::current_dir().unwrap().to_str().unwrap().to_string();
    let binding = config.get("steam_path").unwrap();
    let steam_path = Path::new(&binding);

    //get friends.js from steam chat
    let bruh = reqwest::blocking::get(
        "https://community.cloudflare.steamstatic.com/public/javascript/webui/friends.js",
    )?
    .text()?;

    fs::write(&steam_path.join("clientui").join("friends_web_ui.js"), bruh).unwrap();
    info!(target: "Friends Injector", "inserted friends_web_ui.js to clientui folder");

    //add steamed :)
    let steamed_path = Path::new(&curr_dir)
        .join("dist")
        .join("js")
        .join("FriendClient.js");
    let steamed = fs::read_to_string(&steamed_path).unwrap();
    fs::write(steam_path.join("clientui").join("steamed.js"), steamed).unwrap();
    info!(target: "Friends Injector ", "inserted steamed to clientui folder");

    return Ok(());
}
