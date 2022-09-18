use crate::args::LaunchSubCommand;

use std::env;
#[derive(Debug)]
pub struct Config {
    pub steam_exe_path: String,
    pub steam_path: String,
    pub steam_client_ui: String,
    pub steam_friend_js: String,
    pub steam_friend_index_html: String,
    pub steamed: String,
    pub steamed_friend_client: String,
    pub steamed_library_client: String,
    pub steam_library_index_html: String,
    pub steam_ui: String,
    pub timeout: u64,
}

impl Config {
    pub fn new(steam_path: &String, steamed: Option<String>) -> Self {
        let steam_exe_path = steam_path.clone() + "\\steam.exe";

        //friends paths
        let steam_client_ui = steam_path.clone() + "\\clientui";
        let steam_friend_js = steam_client_ui.to_string() + "\\friends.js";
        let steam_friend_index_html = steam_client_ui.to_string() + "\\index_friends.html";
        
        //library pahts
        let steam_ui = steam_path.clone() + "\\steamui";
        let steam_library_index_html  = steam_ui.to_string() + "\\index.html";

        //steamed paths
        let steamed = match steamed {
            Some(x) => x,
            None => env::current_dir().unwrap().to_str().unwrap().to_string()
        };
        let steamed_friend_client = (&steamed).to_string() +"\\dist\\js\\FriendClient.js";
        let steamed_library_client = (&steamed).to_string() +"\\dist\\js\\LibraryClient.js";
        return Config { steam_ui, steam_library_index_html, steamed, steamed_friend_client, steamed_library_client, steam_exe_path: steam_exe_path.to_string(), steam_client_ui, steam_friend_js, timeout: 5000, steam_path: steam_path.clone(), steam_friend_index_html};
    }

    pub fn new_launch(clap_config: LaunchSubCommand) -> Self {
        let mut what = Config::new(&clap_config.steam_path, None);
        what.timeout = clap_config.timeout;
        what
    }
}

