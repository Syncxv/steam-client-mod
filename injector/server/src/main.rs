mod server;

use shared::get_config;
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

// pub fn wait_for_steam(system: &mut System) -> bool {
//     let mut steam_found = false;

//     while !steam_found {
//         println!("looking for steam");

//         if is_steam_open(system) {
//             steam_found = true;
//         }
//         thread::sleep(Duration::from_millis(1000));
//     }

//     true
// }

fn main() {
    let handle = thread::spawn(move || {
        println!("Hello, world!");
        let mut input = String::with_capacity(100);
        stdin().read_line(&mut input).unwrap();
    });

    let stem_config = get_config();
    let what = stem_config.get("steam_path").unwrap();
    let steam_path = Path::new(&what);
    let steam_exe_path = steam_path.join("steam.exe");
    let curr_dir = env::current_dir().unwrap();
    let mut system = System::new_all();

    if is_steam_open(&mut system) {
        println!("steam is open pls close it thanks");
        thread::sleep(Duration::from_secs(10));
        exit(1);
    }

    println!("unpatching just in case\n");
    let mut child = create_injector_command(&curr_dir, "unpatch-friend")
        .spawn()
        .expect("Failed to start injector");
    child.wait().expect("Injector failed");

    let mut child = create_injector_command(&curr_dir, "unpatch-library")
        .spawn()
        .expect("Failed to start injector");
    child.wait().expect("Injector failed");

    // we dont need to wait for steam to start because of -noverifyfiles
    // println!("waiting for steam to start");
    // wait_for_steam(&mut system);

    let mut command = create_injector_command(&curr_dir, "patch-friend");
    command.arg("--update");
    command.spawn().expect("Failed to start injector");

    let mut command = create_injector_command(&curr_dir, "patch-library");
    command.spawn().expect("Failed to start injector");

    let mut command = Command::new(&steam_exe_path);
    if command.arg("-dev").arg("-noverifyfiles").spawn().is_ok() {
        println!("starting steam\n");
        server::server_main().expect("server failed eh");
    } else {
        println!("steam didn't start");
    }

    handle.join().unwrap();
}

fn create_injector_command(curr_dir: &Path, arg: &str) -> Command {
    let mut command = Command::new(curr_dir.join("injector.exe"));
    command.arg(arg);
    command
}
