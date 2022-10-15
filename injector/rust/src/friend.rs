use std::path::Path;
use std::fs;


pub use crate::config::Config;



pub fn inject_friend_javascript(config: &Config) {
    //add steamed :)
    let steamed = fs::read_to_string(&config.steamed_friend_client).unwrap();
    fs::write((&config.steam_client_ui).to_string() + "\\steamed.js", steamed).unwrap();
    println!("[Friends Injector] inserted steamed to clientui folder");


    //inject bruh.js / js-injector :)
    let steamed_js_injector_path = (&config.steamed).to_string() + "\\injector\\js-injector\\injector.js";
    let steamed_js_injector = fs::read_to_string(&steamed_js_injector_path).unwrap();
    fs::write((&config.steam_client_ui).to_string() + "\\bruh.js", steamed_js_injector).unwrap();
    println!("[Friends Injector] inserted js-injector to clientui folder");


    //insert srcipt tag into html
    let mut index_html = fs::read_to_string(&config.steam_friend_index_html).unwrap();
    let index: usize = index_html.find("</script>").map(|i| i + "</script>".len()).unwrap();
    index_html.replace_range(index..index,"\n\n\t\t<script src=\"bruh.js\"> </script>\n");
    fs::write(&config.steam_friend_index_html, index_html).unwrap();
    println!("[Friends Injector] injected js-injector into html");

    
    //patching friends.js :)
    let mut patched_js = fs::read_to_string(&config.steam_friend_js).unwrap();
    let index: usize = patched_js.find(r#"console.log('Loading chat from url: ', strURL);"#).unwrap();
    
    let hehe = r#"(async () => {
        const createElement = (html) => {
            const temp = document.createElement('div');
            temp.innerHTML = html;
            return temp.firstChild;
        };
        let parser = new DOMParser();
        const steamHtmlString = await (await fetch(strURL)).text();
        const HTML = parser.parseFromString(steamHtmlString, 'text/html');
        //edit html if ya want
        HTML.querySelector('[src*="friends.js"]').remove()
        let cooleo = await (await fetch("http://localhost:8080/?url=https://community.cloudflare.steamstatic.com/public/javascript/webui/friends.js?v=iXbT9rmgxoRc&l=english&_cdn=cloudflare")).text()
    
        HTML.head.appendChild(createElement(`<script> ${"document.currentScript.src = 'https://community.cloudflare.steamstatic.com/public/javascript/webui/friends.js?v=iXbT9rmgxoRc&l=english&_cdn=cloudflare';" + cooleo} </script>`))
        let blob = new Blob([HTML.documentElement.innerHTML], { type: 'text/html' });
        strURL = URL.createObjectURL(blob);
        let iframe = document.getElementById(g_strFrame);
        iframe.src = strURL;
        g_strFrameURL = strURL;
        })();
        return;
    
    
        "#;
    


    // steamed = steamed.replace("${", "\\${");
    // let hehe = frist + &steamed.replace("`", "\\`") + second;

    patched_js.replace_range(index..index, &hehe);

    fs::write(&config.steam_friend_js, patched_js).unwrap();

    println!("[Friends Injector] injected steamed to friends and chat :D");

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
