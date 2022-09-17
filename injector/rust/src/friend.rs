use std::path::Path;
use std::fs;


pub use crate::config::Config;



pub fn inject_friend_javascript(config: &Config) {
    //add steamed :)
    let steamed = fs::read_to_string(&config.steamed_friend_client).unwrap();
    fs::write((&config.steam_client_ui).to_string() + "\\steamed.js", steamed).unwrap();
    println!("inserted steamed to clientui folder");


    //inject bruh.js / js-injector :)
    let steamed_js_injector_path = (&config.steamed).to_string() + "\\injector\\js-injector\\injector.js";
    let steamed_js_injector = fs::read_to_string(&steamed_js_injector_path).unwrap();
    fs::write((&config.steam_client_ui).to_string() + "\\bruh.js", steamed_js_injector).unwrap();
    println!("inserted js-injector to clientui folder");


    //insert srcipt tag into html
    let mut index_html = fs::read_to_string(&config.steam_index_html).unwrap();
    let index: usize = index_html.find("</script>").map(|i| i + "</script>".len()).unwrap();
    index_html.replace_range(index..index,"\n\n\t\t<script src=\"bruh.js\"> </script>\n");
    fs::write(&config.steam_index_html, index_html).unwrap();
    println!("injected js-injector into html");

    
    //patching friends.js :)
    let mut patched_js = fs::read_to_string(&config.steam_friend_js).unwrap();
    let index: usize = patched_js.find(r#"console.log("Loading chat from url: ",e)"#).unwrap();
    
    let hehe = r#"(async () => {
        const createElement = (html) => {
            const temp = document.createElement('div');
            temp.innerHTML = html;
            return temp.firstChild;
        };
        let parser = new DOMParser();
        const steamHtmlString = await (await fetch(e)).text();
        const HTML = parser.parseFromString(steamHtmlString, 'text/html');
        //edit html if ya want
        let blob = new Blob([HTML.documentElement.innerHTML], { type: 'text/html' });
        e = URL.createObjectURL(blob);
        let iframe = document.getElementById(j);
        iframe.src = e;
        ot = e;
        })();
        return;
    
    
        "#;
    


    // steamed = steamed.replace("${", "\\${");
    // let hehe = frist + &steamed.replace("`", "\\`") + second;

    patched_js.replace_range(index..index, &hehe);

    fs::write(&config.steam_friend_js, patched_js).unwrap();

    println!("injected steamed to friends and chat :D");

}


pub fn is_friend_backed_up(steam_friend_js_bak: &String, steam_index_html_js_bak: &String) -> bool {
    Path::new(steam_friend_js_bak).exists() &&  Path::new(steam_index_html_js_bak).exists()
}

pub fn restore_friend_assets(steam_friend_js: &String, steam_index_html: &String) {
    let steam_friend_js_bak = steam_friend_js.to_string() + ".bak";
    let steam_index_html_bak = steam_index_html.to_string()  + ".bak";
    let need_to_restore = backup_friend_assets(steam_friend_js, steam_index_html, &steam_friend_js_bak, &steam_index_html_bak);
    if !need_to_restore {
        println!("dont need to restore anything :)");
        return;
    }
    

    let o_contents_friend_js = fs::read_to_string(&steam_friend_js_bak).unwrap();
    let o_contents_index_html = fs::read_to_string(&steam_index_html_bak).unwrap();

    fs::write(steam_friend_js, o_contents_friend_js).unwrap();
    fs::write(steam_index_html, o_contents_index_html).unwrap();

    println!("restored assets successfully :D")

}


pub fn backup_friend_assets(steam_friend_js: &String, steam_index_html: &String, steam_friend_js_bak: &String, steam_index_html_bak: &String) -> bool {
    if !is_friend_backed_up(&steam_friend_js_bak, &steam_index_html_bak) {
        fs::copy(&steam_friend_js, &steam_friend_js_bak).expect("failed backing up friends.js");
        fs::copy(&steam_index_html, &steam_index_html_bak).expect("failed backing up index_friends.html");
        return false;
    }
    println!("files already backed up :D");
    return true;
}
