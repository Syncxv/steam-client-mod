use std::{collections::HashMap, env, path::Path};
use tokio::fs;

pub async fn handle_library_unpatch_command(config: HashMap<String, String>) {
    println!("Library unpatch command");
    unpatch_library(&config).await;
}

pub async fn handle_library_command(config: HashMap<String, String>) {
    println!("Library command");
    inject_library_client(&config).await;
}

pub async fn inject_library_client(config: &HashMap<String, String>) {
    let current_dir = env::current_dir().unwrap();
    let steam_path = Path::new(config.get("steam_path").unwrap());
    let steamui = steam_path.join("steamui");
    //add LibraryClient.js to steamui folder :)
    let lib_client = fs::read_to_string(current_dir.join("dist/js").join("LibraryClient.js"))
        .await
        .expect("CANNOT FIND STEAM LIBRARY CLIENT");
    fs::write(steamui.join("lib-client.js"), lib_client)
        .await
        .unwrap();
    println!("[Library Injector] inserted lib-client.js to steamui folder");

    //inject bruh.js / js-injector :)
    let library_patcher_path = current_dir
        .join("dist")
        .join("js")
        .join("library-patcher.js");
    let library_patcher = fs::read_to_string(&library_patcher_path).await.unwrap();
    fs::write(&steamui.join("library-bruh.js"), library_patcher)
        .await
        .unwrap();
    println!("[Library Injector] inserted js-injector to steamui folder");

    //insert srcipt tag into html
    let index_html = fs::read_to_string(steamui.join("index.html"))
        .await
        .expect("CANNOT FIND STEAM LIBRARY HTML");

    // remove their library.js cuse we gonna patch it
    let new_index_html = index_html.replace(
        r#"<script defer="defer" src="/library.js"></script>"#,
        r#"<!-- <script defer="defer" src="/library.js"></script> -->"#,
    );
    let finial_index_html = new_index_html.replace(
        "</head>",
        r#"<script src="library-bruh.js"></script></head>"#,
    );

    fs::write(steamui.join("index.html"), finial_index_html)
        .await
        .unwrap();
    println!("[Library Injector] inserted script tag into steamui/index.html");
}

pub async fn unpatch_library(config: &HashMap<String, String>) {
    let steam_path = Path::new(config.get("steam_path").unwrap());
    let steamui = steam_path.join("steamui");
    // fs::remove_file(steamui.join("lib-client.js")).unwrap();
    // fs::remove_file(steamui.join("library-bruh.js")).unwrap();
    println!("[Library Injector] removed lib-client.js and library-bruh.js from steamui folder");
    let index_html = fs::read_to_string(steamui.join("index.html"))
        .await
        .expect("CANNOT FIND STEAM LIBRARY HTML");
    let mut index_html = index_html.replace(r#"<script src="library-bruh.js"></script>"#, "");
    index_html = index_html.replace(
        r#"<!-- <script defer="defer" src="/library.js"></script> -->"#,
        r#"<script defer="defer" src="/library.js"></script>"#,
    );
    fs::write(steamui.join("index.html"), index_html)
        .await
        .unwrap();
    println!("[Library Injector] removed script tag from steamui/index.html");
}
