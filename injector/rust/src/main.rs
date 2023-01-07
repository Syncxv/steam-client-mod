use clap::Parser;
use std::io::stdin;
use std::rc::Rc;
use std::{thread, time::Duration};
use sysinfo::{System, SystemExt};
// use std::env;

mod args;
mod config;
mod friend;
mod library;
mod utils;

use config::Config;

use args::GenericSubCommand;
use args::LaunchSubCommand;
use args::SteamInjectorCommands;
use args::SteamedInjectorArgs;

use utils::execute_steam;
// use utils::execute_app;
use utils::is_steam_open;
use utils::pause;
use utils::wait_for_steam;

use friend::backup_friend_assets;
use friend::delete_backups;
use friend::inject_friend_javascript;
use friend::restore_friend_assets;

use library::inject_library;
use library::restore_library_assets;

mod server;

use server::main_thigy;

fn main() {
    let args = SteamedInjectorArgs::parse();
    match args.command {
        None => {
            println!("welp you cant replace steam.exe with our one HAVE TO USE A FUCKING shortcut for now")
        }
        Some(x) => match x {
            SteamInjectorCommands::Launch(arg_config) => handle_launch_steam(arg_config),
            SteamInjectorCommands::Restore(arg_config) => handle_restore(arg_config),
            SteamInjectorCommands::Inject(arg_config) => handle_inject(arg_config),
            SteamInjectorCommands::DeleteBackups(arg_config) => handle_delete_backup(arg_config),
            SteamInjectorCommands::CreateBackups(arg_config) => handle_create_backup(arg_config),
            SteamInjectorCommands::Test(arg_config) => test(arg_config),
        },
    };
}

fn test(arg_config: GenericSubCommand) {
    let config = Config::new(&arg_config.steam_path, None);
    println!(
        "{}",
        Config::join(&config.steam_client_ui, &["friends_web_ui", "DUDE.js"])
    );
    // thread::spawn(|| {
    //     main_thigy().expect("well server failed");
    // });
}

fn handle_create_backup(arg_config: GenericSubCommand) {
    let config = Config::new(&arg_config.steam_path, None);
    let steam_friend_js_bak = config.steam_friend_js.to_string() + ".bak";
    let steam_friend_index_html_bak = config.steam_friend_index_html.to_string() + ".bak";
    let need_to_restore = backup_friend_assets(
        &config.steam_friend_js,
        &config.steam_friend_index_html,
        &steam_friend_js_bak,
        &steam_friend_index_html_bak,
    );
    if !need_to_restore {
        println!("[Friends Injector] dont need to restore anything :)");
    }
}

fn handle_delete_backup(arg_config: GenericSubCommand) {
    let config = Config::new(&arg_config.steam_path, None);
    remove_back_up(&config)
}

pub fn remove_back_up(config: &Config) {
    let steam_friend_js_bak = config.steam_friend_js.to_string() + ".bak";
    let steam_friend_index_html_bak = config.steam_friend_index_html.to_string() + ".bak";
    delete_backups(&steam_friend_js_bak, &steam_friend_index_html_bak);
}

pub fn restore(config: &Config) {
    restore_library_assets(&config.steam_library_index_html);
    restore_friend_assets(&config.steam_friend_js, &config.steam_friend_index_html);
}

fn handle_inject(arg_config: GenericSubCommand) {
    let config = Config::new(&arg_config.steam_path, None);
    print!("{:?}", arg_config);
    restore(&config);
    inject_friend_javascript(&config).unwrap();
    inject_library(&config);
}

fn handle_restore(arg_config: GenericSubCommand) {
    let config = Config::new(&arg_config.steam_path, None);
    restore(&config);
}

fn handle_launch_steam(arg_config: LaunchSubCommand) {
    let mut system = System::new_all();
    if is_steam_open(&mut system) {
        println!("close steam pls thanks");
        pause();
        return;
    }
    let config = Config::new_launch(arg_config);
    println!("{:?}", config);

    restore(&config);

    // execute_app(&(config.steamed.clone() + "\\server.exe"));

    println!("{}", &config.steam_exe_path);

    let bruh: Config = config.clone();

    thread::spawn(move || {
        main_thigy(Box::clone(&bruh)).expect("well server failed");
    });

    execute_steam(&config.steam_exe_path);

    println!("LOOKING FOR STEAM");

    thread::sleep(Duration::from_millis(config.timeout));

    wait_for_steam(&mut system);

    println!("steam found :D can inject javascript now");

    inject_library(&config);
    inject_friend_javascript(&config).unwrap();

    let mut input = String::with_capacity(100);
    stdin().read_line(&mut input).unwrap();
}
