use std::env;
use std::process::Command;
use std::path::Path;
use std::fs;
use std::fs::OpenOptions;

fn main() {
    let args: Vec<String> = env::args().collect();
    let (steam_exe_path, steam_path, steam_client_ui, steam_friend_js, steam_index_html) = parse_args(&args);
    println!("steam_exe = {}\nsteam_path = {}\nsteam_client_ui = {}", steam_exe_path, steam_path, steam_client_ui);
    // let client_ui_path = steam_exe_path.clone();
    // client_ui_path

    restore_assets(&steam_friend_js, &steam_index_html)

    // execute_steam(steam_exe_path)


    

}


fn execute_steam(steam_exe_path: &String) {
    let output = Command::new(steam_exe_path)
        .arg("-dev")
        .spawn()
        .expect("welp wrong steam path probably");
    let steam_instance = output.stdout;
    println!("{:?}", steam_instance);
}


fn is_backed_up(steam_friend_js_bak: &String, steam_index_html_js_bak: &String) -> bool {
    Path::new(steam_friend_js_bak).exists() &&  Path::new(steam_index_html_js_bak).exists()
}

fn restore_assets(steam_friend_js: &String, steam_index_html: &String) {
    let steam_friend_js_bak = steam_friend_js.to_string() + ".bak";
    let steam_index_html_bak = steam_index_html.to_string()  + ".bak";
    let need_to_restore = backup_assets(steam_friend_js, steam_index_html, &steam_friend_js_bak, &steam_index_html_bak);
    if !need_to_restore {
        println!("dont need to restore anything :)");
        return;
    }
    

    let o_contents_friend_js = fs::read_to_string(&steam_friend_js_bak).unwrap();
    let o_contents_index_html = fs::read_to_string(&steam_index_html_bak).unwrap();

    println!("{}", o_contents_index_html);
    fs::write(steam_friend_js, o_contents_friend_js).unwrap();
    fs::write(steam_index_html, o_contents_index_html).unwrap();

    println!("restored assets successfully :D")

}


fn backup_assets(steam_friend_js: &String, steam_index_html: &String, steam_friend_js_bak: &String, steam_index_html_bak: &String) -> bool {
    if !is_backed_up(&steam_friend_js_bak, &steam_index_html_bak) {
        fs::copy(&steam_friend_js, &steam_friend_js_bak).expect("failed backing up friends.js");
        fs::copy(&steam_index_html, &steam_index_html_bak).expect("failed backing up index_friends.html");
        return false;
    }
    println!("files already backed up :D");
    return true;
}

fn parse_args(args: &[String]) -> (String, String, String, String, String) {
    let steam_exe_path = &args[1];
    let steam_path = get_steam_path(&mut steam_exe_path.clone());
    let steam_client_ui = steam_path.to_string() + "\\clientui";
    let steam_friend_js = steam_client_ui.to_string() + "\\friends.js";
    let steam_index_html = steam_client_ui.to_string() + "\\index_friends.html";
    return (steam_exe_path.to_string(), steam_path, steam_client_ui, steam_friend_js, steam_index_html);
}

fn get_steam_path(steam_exe_path: &mut String) -> String {
    let mut splitted: Vec<&str>  =  steam_exe_path.split("\\").collect();
    splitted.truncate(splitted.len().saturating_sub(1));
    println!("{:?}", splitted);
    splitted.join("\\")
}