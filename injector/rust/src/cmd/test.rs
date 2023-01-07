use std::collections::HashMap;
pub fn handle_test(steam_config: HashMap<String, String>) {
    let what = steam_config.get("steam_path").unwrap();
    println!("TEST GANG and steam path is {}", what);
}
