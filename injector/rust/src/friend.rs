use std::path::Path;
use std::fs;


pub use crate::config::Config;




pub fn inject_friend_javascript(config: &Config) -> Result<(), Box<dyn std::error::Error>> {
    //get friends.js from steam chat
    let bruh = reqwest::blocking::get("https://community.cloudflare.steamstatic.com/public/javascript/webui/friends.js")?
    .text()?;
    fs::write(Config::join(&config.steam_client_ui, &["friends_web_ui.js"]), bruh).unwrap();
    println!("[Friends Injector] inserted friends_web_ui.js to clientui folder");
    

    //add steamed :)
    let steamed = fs::read_to_string(&config.steamed_friend_client).unwrap();
    fs::write(Config::join(&config.steam_client_ui, &["steamed.js"]), steamed).unwrap();
    println!("[Friends Injector] inserted steamed to clientui folder");


    //inject bruh.js / js-injector :)
    let steamed_js_injector_path = (&config.steamed).to_string() + "\\injector\\js-injector\\injector.js";
    let steamed_js_injector = fs::read_to_string(&steamed_js_injector_path).unwrap();
    fs::write(Config::join(&config.steam_client_ui, &["bruh.js"]), steamed_js_injector).unwrap();
    println!("[Friends Injector] inserted js-injector to clientui folder");


    //insert srcipt tag into html
    let mut index_html = fs::read_to_string(&config.steam_friend_index_html).expect("FAILED TO READ FRIEND INDEX HTML");
    let index: usize = index_html.find("</script>").map(|i| i + "</script>".len()).expect("FAILED GET SCRIPT TAG INDEX");
	
    index_html.replace_range(index..index,"\n\n\t\t<script src=\"bruh.js\"> </script>\n<meta http-equiv=\"Content-Security-Policy\" content=\"upgrade-insecure-requests\">\n");
    fs::write(&config.steam_friend_index_html, index_html).expect("FAILED TO WRITE TO FRIEND INDEX HTML");
    println!("[Friends Injector] injected js-injector into html");

    
    //patching friends.js :)
    let mut steam_friend_js = fs::read_to_string(&config.steam_friend_js).expect("FAILED TO GET STEAM_FRIEND_JS");
    let index: usize = steam_friend_js.find(r#"console.log('Loading chat from url: ', strURL);"#).unwrap();
    

    let hehe =  fs::read_to_string(Config::join(&config.steamed, &["dist", "js", "iframe-patcher.js"])).expect("FAILED TO GET IFRAME PATCHER");
    let steamed_react = "window.steamed = { Webpack: { Common: { React: __webpack_module_cache__['./node_modules/react/index.js'].exports,},},};";
    let patched = &format!("{steamed}\nreturn {code}", steamed = steamed_react, code =hehe);
    


    // steamed = steamed.replace("${", "\\${");
    // let hehe = frist + &steamed.replace("`", "\\`") + second;

    steam_friend_js.replace_range(index..index, &patched);

    fs::write(&config.steam_friend_js, steam_friend_js).unwrap();

    println!("[Friends Injector] injected steamed to friends and chat :D");
    Ok(())

}


pub fn is_friend_backed_up(steam_friend_js_bak: &String, steam_friend_index_html_js_bak: &String) -> bool {
    Path::new(steam_friend_js_bak).exists() &&  Path::new(steam_friend_index_html_js_bak).exists()
}

pub fn restore_friend_assets(steam_friend_js: &String, steam_friend_index_html: &String) {
    let steam_friend_js_bak = steam_friend_js.to_string() + ".bak";
    let steam_friend_index_html_bak = steam_friend_index_html.to_string()  + ".bak";
    let need_to_restore = backup_friend_assets(steam_friend_js, steam_friend_index_html, &steam_friend_js_bak, &steam_friend_index_html_bak);
    if !need_to_restore {
        println!("[Friends Injector] dont need to restore anything :)");
        return;
    }
    

    let o_contents_friend_js = fs::read_to_string(&steam_friend_js_bak).unwrap();
    let o_contents_index_html = fs::read_to_string(&steam_friend_index_html_bak).unwrap();

    fs::write(steam_friend_js, o_contents_friend_js).unwrap();
    fs::write(steam_friend_index_html, o_contents_index_html).unwrap();

    println!("[Friends Injector] restored assets successfully :D")

}


pub fn backup_friend_assets(steam_friend_js: &String, steam_friend_index_html: &String, steam_friend_js_bak: &String, steam_friend_index_html_bak: &String) -> bool {
    if !is_friend_backed_up(&steam_friend_js_bak, &steam_friend_index_html_bak) {
        fs::copy(&steam_friend_js, &steam_friend_js_bak).expect("[Friends Injector] failed backing up friends.js");
        fs::copy(&steam_friend_index_html, &steam_friend_index_html_bak).expect("[Friends Injector] failed backing up index_friends.html");
        return false;
    }
    println!("[Friends Injector] files already backed up :D");
    return true;
}


pub fn delete_backups(steam_friend_js_bak: &String, steam_friend_index_html_bak: &String) -> bool {
    if is_friend_backed_up(&steam_friend_js_bak, &steam_friend_index_html_bak) {
        fs::remove_file(&steam_friend_js_bak).expect("[Friends Injector] failed removing backup friend.js.bak");
        fs::remove_file(&steam_friend_index_html_bak).expect("[Friends Injector] failed removing backup up index_friends.html.bak");
        return false;
    }
    println!("[Friends Injector] nothing to delete bruh");
    return true;
}
