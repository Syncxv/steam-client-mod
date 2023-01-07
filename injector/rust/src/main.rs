mod args;
mod config;

use std::collections::HashMap;

use args::{Commands, SteamInjectorCli};
use clap::Parser;

fn main() {
    let steam_config = config::get_config();

    let args = SteamInjectorCli::parse();
    match args.command {
        None => {
            println!("hi there")
        }
        Some(x) => match x {
            Commands::Test => handle_test(steam_config),
        },
    }
}

fn handle_test(steam_config: HashMap<String, String>) {
    let what = steam_config.get("steam_path").unwrap();
    println!("TEST GANG and steam path is {}", what);
}
