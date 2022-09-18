use std::path::Path;
use std::fs;


pub use crate::config::Config;


pub fn is_library_backed_up(steam_lib_index_html_js_bak: &String) -> bool {
    Path::new(steam_lib_index_html_js_bak).exists()
}


pub fn backup_library_assets(steam_lib_index_html: &String, steam_lib_index_html_bak: &String) -> bool {
    if !is_library_backed_up(&steam_lib_index_html_bak) {
        fs::copy(&steam_lib_index_html, &steam_lib_index_html_bak).expect("[Library Injector] failed backing up index.html");
        return false;
    }
    println!("[Library Injector] library files already backed up :D");
    return true;
}

pub fn restore_library_assets(steam_lib_index_html: &String) {
    let steam_lib_index_html_bak = steam_lib_index_html.to_string()  + ".bak";
    let need_to_restore = backup_library_assets(&steam_lib_index_html, &steam_lib_index_html_bak);
    if !need_to_restore {
        println!("[Library Injector] dont need to restore anything in the steamui folder:)");
        return;
    }
    
    let o_contents_index_html = fs::read_to_string(&steam_lib_index_html_bak).unwrap();

    fs::write(steam_lib_index_html, o_contents_index_html).unwrap();

    println!("[Library Injector] restored assets successfully :D")

}


pub fn inject_library(config: &Config) {
    //add LibraryClient.js to steamui folder :)
    let steamed_library_client = fs::read_to_string(&config.steamed_library_client).unwrap();
    fs::write((&config.steam_ui).to_string() + "\\steamed_library_client.js", steamed_library_client).unwrap();
    println!("[Library Injector] inserted steamed_library_client.js to steamui folder");


    //insert srcipt tag into html
    let mut index_html = fs::read_to_string(&config.steam_library_index_html).unwrap();
    let index: usize = index_html.find("</head>").unwrap();
    index_html.replace_range(index..index,"<script defer src=\"steamed_library_client.js\"></script>");
    fs::write(&config.steam_library_index_html, index_html).unwrap();
    println!("[Library Injector] injected LibraryClient to html");


}
