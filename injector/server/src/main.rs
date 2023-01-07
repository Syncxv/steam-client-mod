mod config;
use std::io::stdin;
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
    let stem_config = config::get_config();
    let steam_exe_path = Path::new(stem_config.get("steam_path").unwrap()).join("steam.exe");
    let mut system = System::new_all();
    thread::spawn(move || {
        let mut command = Command::new(steam_exe_path);
        if let Ok(mut _child) = command.arg("-dev").spawn() {
            println!("starting steam");
            wait_for_steam(&mut system);

            println!("OK NOW WE CAN INJECT");
        } else {
            println!("steam didnt start");
        }
    });
    println!("Hello, world!");
    let mut input = String::with_capacity(100);
    stdin().read_line(&mut input).unwrap();
}
