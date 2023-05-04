use std::{
    collections::HashMap,
    env, fs,
    path::{Path, PathBuf},
};

pub fn handle_library_unpatch_command(config: HashMap<String, String>) {
    println!("Library unpatch command");
    unpatch_library(config);
}

pub fn handle_library_command(config: HashMap<String, String>) {
    println!("Library command");
    inject_library_client(config);
}

pub fn inject_library_client(config: HashMap<String, String>) {
    let binding = env::current_dir().unwrap().to_str().unwrap().to_string();
    let curr_dir = Path::new(&binding);
    let binding = config.get("steam_path").unwrap();
    let steam_path = Path::new(&binding);
    let steamui = steam_path.join("steamui");
    //add LibraryClient.js to steamui folder :)
    let lib_client = fs::read_to_string(curr_dir.join("dist/js").join("LibraryClient.js"))
        .expect("CANNOT FIND STEAM LIBRARY CLIENT");
    fs::write(steamui.join("lib-client.js"), lib_client).unwrap();
    println!("[Library Injector] inserted lib-client.js to steamui folder");

    //inject bruh.js / js-injector :)
    let mut steamed_js_injector_path = PathBuf::from(&curr_dir);
    steamed_js_injector_path.extend(&["dist", "js", "library-patcher.js"]);
    let steamed_js_injector = fs::read_to_string(&steamed_js_injector_path).unwrap();
    fs::write(&steamui.join("library-bruh.js"), steamed_js_injector).unwrap();
    println!("[Library Injector] inserted js-injector to steamui folder");

    //insert srcipt tag into html
    let index_html =
        fs::read_to_string(steamui.join("index.html")).expect("CANNOT FIND STEAM LIBRARY HTML");

    // remove their library.js cuse we gonna patch it
    let new_index_html = index_html.replace(
        r#"<script defer="defer" src="/library.js"></script>"#,
        r#"<!-- <script defer="defer" src="/library.js"></script> -->"#,
    );
    let finial_index_html = new_index_html.replace(
        "</head>",
        r#"<script src="library-bruh.js"></script></head>"#,
    );

    fs::write(steamui.join("index.html"), finial_index_html).unwrap();
    println!("[Library Injector] inserted script tag into steamui/index.html");
}

pub fn unpatch_library(config: HashMap<String, String>) {
    let binding = config.get("steam_path").unwrap();
    let steam_path = Path::new(&binding);
    let steamui = steam_path.join("steamui");
    // fs::remove_file(steamui.join("lib-client.js")).unwrap();
    // fs::remove_file(steamui.join("library-bruh.js")).unwrap();
    println!("[Library Injector] removed lib-client.js and library-bruh.js from steamui folder");
    let index_html =
        fs::read_to_string(steamui.join("index.html")).expect("CANNOT FIND STEAM LIBRARY HTML");
    let mut index_html = index_html.replace(r#"<script src="library-bruh.js"></script>"#, "");
    index_html = index_html.replace(
        r#"<!-- <script defer="defer" src="/library.js"></script> -->"#,
        r#"<script defer="defer" src="/library.js"></script>"#,
    );
    fs::write(steamui.join("index.html"), index_html).unwrap();
    println!("[Library Injector] removed script tag from steamui/index.html");
}
