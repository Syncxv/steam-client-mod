mod config;
mod server;

use std::env;
use std::io::stdin;
use std::process::exit;
use std::time::Duration;
use std::{path::Path, process::Command, thread};
use sysinfo::{ProcessExt, System, SystemExt};

pub fn is_steam_open(system: &mut System) -> bool {
    system.refresh_all();

    for (pid, process) in system.processes() {
        if process.name() == ("steamwebhelper.exe") {
            println!("FOUND STEAM PROCESS {}:{}", pid, process.name());
            return true;
        }
    }
    false
}

pub fn wait_for_steam(system: &mut System) -> bool {
    let mut steam_found = false;

    while !steam_found {
        println!("looking for steam");

        if is_steam_open(system) {
            steam_found = true;
        }
        thread::sleep(Duration::from_millis(1000));
    }

    true
}

fn main() {
    thread::spawn(move || {
        let stem_config = config::get_config();
        let what = stem_config.get("steam_path").unwrap();
        let steam_path = Path::new(&what);
        let steam_exe_path = steam_path.join("steam.exe");
        let curr_dir = env::current_dir().unwrap().to_str().unwrap().to_string();
        let mut system = System::new_all();

        if is_steam_open(&mut system) {
            println!("steam is open pls close it thanks");
            thread::sleep(Duration::from_secs(10));
            exit(1);
        }

        let mut command = Command::new(&steam_exe_path);
        if let Ok(mut _child) = command.arg("-dev").spawn() {
            println!("starting steam");
            wait_for_steam(&mut system);

            println!("OK NOW WE CAN INJECT");

            let mut command = Command::new(Path::new(&curr_dir).join("injector.exe"));
            command.arg("patch-friend");
            command.spawn().unwrap();

            server::server_main().expect("server failed eh");
        } else {
            println!("steam didnt start")
        }
    });
    println!("Hello, world!");
    let mut input = String::with_capacity(100);
    stdin().read_line(&mut input).unwrap();
}
