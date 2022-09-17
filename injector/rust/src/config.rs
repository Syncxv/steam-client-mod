use crate::args::LaunchSubCommand;


#[derive(Debug)]
pub struct Config {
    pub steam_exe_path: String,
    pub steam_path: String,
    pub steam_client_ui: String,
    pub steam_friend_js: String,
    pub steam_index_html: String,
    pub steamed: String,
    pub steamed_friend_client: String,
    pub steamed_library_client: String,
    pub timeout: u64,
}

impl Config {
    pub fn new(steam_path: &String) -> Self {
        let steam_exe_path = steam_path.clone() + "\\steam.exe";
        let steam_client_ui = steam_path.clone() + "\\clientui";
        let steam_friend_js = steam_client_ui.to_string() + "\\friends.js";
        let steam_index_html = steam_client_ui.to_string() + "\\index_friends.html";
        //TODO: progrimatically get the steamed folder :)
        let steamed = "C:\\Users\\USER\\Documents\\stuff\\steam-client".to_string();
        let steamed_friend_client = (&steamed).to_string() +"\\dist\\js\\FriendClient.js";
        let steamed_library_client = (&steamed).to_string() +"\\dist\\js\\LibraryClient.js";
        return Config { steamed, steamed_friend_client, steamed_library_client, steam_exe_path: steam_exe_path.to_string(), steam_client_ui, steam_friend_js, timeout: 5000, steam_path: steam_path.clone(), steam_index_html};
    }

    pub fn new_launch(clap_config: LaunchSubCommand) -> Self {
        let mut what = Config::new(&clap_config.steam_path);
        what.timeout = clap_config.timeout;
        what
    }
}

