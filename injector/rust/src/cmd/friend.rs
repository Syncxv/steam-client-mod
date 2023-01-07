use std::collections::HashMap;
use std::env;
use std::fs;
use std::path::Path;
use std::path::PathBuf;
pub fn handle_friend_command(steam_config: HashMap<String, String>) {
    inject_friend_javascript(steam_config).unwrap();
}

pub fn inject_friend_javascript(
    config: HashMap<String, String>,
) -> Result<(), Box<dyn std::error::Error>> {
    let curr_dir = env::current_dir().unwrap().to_str().unwrap().to_string();
    let binding = config.get("steam_path").unwrap();
    let steam_path = Path::new(&binding);
    let clientui = steam_path.join("clientui");
    let steam_friend_index_html = clientui.join("index_friends.html");

    //get friends.js from steam chat
    let bruh = reqwest::blocking::get(
        "https://community.cloudflare.steamstatic.com/public/javascript/webui/friends.js",
    )?
    .text()?;

    fs::write(&clientui.join("friends_web_ui.js"), bruh).unwrap();
    println!("[Friends Injector] inserted friends_web_ui.js to clientui folder");

    //add steamed :)
    let steamed_path = Path::new(&curr_dir)
        .join("dist")
        .join("js")
        .join("FriendClient.js");
    let steamed = fs::read_to_string(&steamed_path).unwrap();
    fs::write(clientui.join("steamed.js"), steamed).unwrap();
    println!("[Friends Injector] inserted steamed to clientui folder");

    //inject bruh.js / js-injector :)
    let mut steamed_js_injector_path = PathBuf::from(&curr_dir);
    steamed_js_injector_path.extend(&["injector", "js-injector", "injector.js"]);
    let steamed_js_injector = fs::read_to_string(&steamed_js_injector_path).unwrap();
    fs::write(&clientui.join("bruh.js"), steamed_js_injector).unwrap();

    println!("[Friends Injector] inserted js-injector to clientui folder");

    //insert srcipt tag into html
    let mut index_html =
        fs::read_to_string(&steam_friend_index_html).expect("FAILED TO READ FRIEND INDEX HTML");
    let index: usize = index_html
        .find("</script>")
        .map(|i| i + "</script>".len())
        .expect("FAILED GET SCRIPT TAG INDEX");

    index_html.replace_range(index..index,"\n\n\t\t<script src=\"bruh.js\"> </script>\n<meta http-equiv=\"Content-Security-Policy\" content=\"upgrade-insecure-requests\">\n");
    fs::write(&steam_friend_index_html, index_html).expect("FAILED TO WRITE TO FRIEND INDEX HTML");

    println!("[Friends Injector] injected js-injector into html");

    //patching friends.js :)
    let mut steam_friend_js =
        fs::read_to_string(&clientui.join("friends.js")).expect("FAILED TO GET STEAM_FRIEND_JS");
    let index: usize = steam_friend_js
        .find(r#"console.log('Loading chat from url: ', strURL);"#)
        .unwrap();

    let iframe_patcher = fs::read_to_string(
        Path::new(&curr_dir)
            .join("dist")
            .join("js")
            .join("iframe-patcher.js"),
    )
    .expect("FAILED TO GET IFRAME PATCHER");
    let steamed_react = "window.steamed = { Webpack: { Common: { React: __webpack_module_cache__['./node_modules/react/index.js'].exports,},},};";
    let patched = &format!(
        "{steamed}\nreturn {code}",
        steamed = steamed_react,
        code = iframe_patcher
    );

    steam_friend_js.replace_range(index..index, &patched);

    fs::write(&clientui.join("friends.js"), steam_friend_js).unwrap();

    println!("[Friends Injector] injected steamed to friends and chat :D");

    return Ok(());
}
