use std::collections::HashMap;
use std::env;
use std::fs;
use std::path::Path;
use std::path::PathBuf;
use std::time::Duration;
use std::time::SystemTime;
pub fn handle_friend_command_unpatch(steam_config: HashMap<String, String>) {
    unpatch_friends(steam_config)
}

pub fn handle_friend_command_patch(steam_config: HashMap<String, String>, update: bool) {
    patch_friend_javascript(steam_config, update).unwrap();
}

pub fn patch_friend_javascript(
    config: HashMap<String, String>,
    update: bool,
) -> Result<(), Box<dyn std::error::Error>> {
    let curr_dir = env::current_dir().unwrap().to_str().unwrap().to_string();
    let binding = config.get("steam_path").unwrap();
    let steam_path = Path::new(&binding);
    let clientui = steam_path.join("clientui");
    let steam_friend_index_html = clientui.join("index_friends.html");
    let friends_web_ui = &clientui.join("friends_web_ui.js");

    if update || should_update_friends_web_ui(friends_web_ui) {
        println!("[Friends Injector] Updating friends_web_ui.js");
        update_friends_webuijs(friends_web_ui);
    } else {
        println!("[Friends Injector] friends_web_ui.js is up to date");
    }
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

    let stuff = r#"

		<script src="bruh.js"> </script>
		<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">

	"#;

    index_html.replace_range(index..index, stuff);
    fs::write(&steam_friend_index_html, index_html).expect("FAILED TO WRITE TO FRIEND INDEX HTML");

    println!("[Friends Injector] injected js-injector into html");

    //patching friends.js :)
    let patched = get_patch();

    let mut steam_friend_js =
        fs::read_to_string(&clientui.join("friends.js")).expect("FAILED TO GET STEAM_FRIEND_JS");

    let index: usize = steam_friend_js
        .find(r#"console.log('Loading chat from url: ', strURL);"#)
        .unwrap();

    steam_friend_js.replace_range(index..index, &patched);

    fs::write(&clientui.join("friends.js"), steam_friend_js).unwrap();

    println!("[Friends Injector] injected steamed to friends and chat :D");

    return Ok(());
}

fn unpatch_friends(config: HashMap<String, String>) {
    let binding = config.get("steam_path").unwrap();
    let steam_path = Path::new(&binding);
    let clientui = steam_path.join("clientui");
    let steam_friend_index_html = clientui.join("index_friends.html");
    //unpatching friends.js :)

    let patched = get_patch();

    let steam_friend_js =
        fs::read_to_string(&clientui.join("friends.js")).expect("FAILED TO GET STEAM_FRIEND_JS");

    let steam_friend_js = steam_friend_js.replace(&patched, "");

    fs::write(&clientui.join("friends.js"), steam_friend_js).unwrap();

    println!("[Friends Injector] un patched friends.js :D");

    let index_html =
        fs::read_to_string(&steam_friend_index_html).expect("FAILED TO READ FRIEND INDEX HTML");

    let replace_str = "\n\n\t\t<script src=\"bruh.js\"> </script>\n<meta http-equiv=\"Content-Security-Policy\" content=\"upgrade-insecure-requests\">\n";

    let original = index_html.replace(replace_str, "");
    fs::write(&steam_friend_index_html, original).expect("FAILED TO REVERT HTML");

    println!("[Friends Injector] un patched friends index html :D");
}

fn get_patch() -> String {
    let curr_dir = env::current_dir().unwrap().to_str().unwrap().to_string();
    let iframe_patcher = fs::read_to_string(
        Path::new(&curr_dir)
            .join("dist")
            .join("js")
            .join("iframe-patcher.js"),
    )
    .expect("FAILED TO GET IFRAME PATCHER");
    let steamed_react = "window.steamed = { Webpack: { Common: { React: __webpack_module_cache__['./node_modules/react/index.js'].exports,},},};\nwindow.React = steamed.Webpack.Common.React;";

    let patched = format!(
        "{window_steamed}\n{code}return;",
        window_steamed = steamed_react,
        code = iframe_patcher
    );
    patched
}

fn should_update_friends_web_ui(path: &PathBuf) -> bool {
    if !Path::new(path).exists() {
        return true;
    }
    let lel = fs::metadata(path).unwrap().modified().unwrap();
    let sys_time = SystemTime::now();

    let difference = sys_time
        .duration_since(lel)
        .expect("Clock may have gone backwards");
    // let difference = lel
    //     .duration_since(sys_time)
    //     .expect("Clock may have gone backwards");
    println!("{difference:?}");
    //if the file is older than 1 day then update it
    if difference > Duration::from_secs(86_400) {
        return true;
    } else {
        return false;
    }
}

fn update_friends_webuijs(friends_web_ui: &PathBuf) {
    //get friends.js from steam chat
    let response = reqwest::blocking::get(
        "https://community.cloudflare.steamstatic.com/public/javascript/webui/friends.js",
    );

    match response {
        Ok(response) => {
            let content = response.text();
            match content {
                Ok(content) => {
                    fs::write(friends_web_ui, content).unwrap();
                    println!("[Friends Injector] inserted friends_web_ui.js to clientui folder");
                }
                Err(e) => {
                    println!("[Friends Injector] Failed to read friends_web_ui.js: {}", e);
                }
            }
        }
        Err(e) => {
            println!(
                "[Friends Injector] Failed to download friends_web_ui.js: {}",
                e
            );
        }
    }
}
