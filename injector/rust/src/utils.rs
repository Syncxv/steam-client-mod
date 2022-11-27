//https://users.rust-lang.org/t/rusts-equivalent-of-cs-system-pause/4494/4
use std::process::Command;
use std::{thread, time::Duration};
use sysinfo::{ProcessExt, System, SystemExt};

use std::io;
use std::io::prelude::*;

pub fn pause() {
    let mut stdin = io::stdin();
    let mut stdout = io::stdout();

    // We want the cursor to stay at the end of the line, so we print without a newline and flush manually.
    write!(stdout, "Press any key to continue...").unwrap();
    stdout.flush().unwrap();

    // Read a single byte and discard
    let _ = stdin.read(&mut [0u8]).unwrap();
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

pub fn is_steam_open(system: &mut System) -> bool {
    system.refresh_all();

    for (pid, process) in system.processes() {
        if process.name() == ("steam.exe") {
            println!("FOUND STEAM PROCESS {}:{}", pid, process.name());
            return true;
        }
    }
    false
}

pub fn execute_steam(steam_exe_path: &String) {
    let steam_exe_path = steam_exe_path.clone();
    thread::spawn(|| {
        let mut command = Command::new(steam_exe_path);
        if let Ok(mut child) = command.arg("-dev").spawn() {
            println!("starting steam");
            child.wait().expect("command wasn't running");
            println!("steam exited ong");
        } else {
            println!("ls command didn't start");
        }
    });
}

// pub fn execute_app(path: &String) {
//     let output = Command::new(path)
//         .arg("-dev")
//         .spawn()
//         .expect("welp wrong steam path probably");
//     let steam_instance = output.stdout;
//     println!("{:?}", steam_instance);
// }
