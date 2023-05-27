mod server;

use shared::get_config;
use std::env;
use std::io;
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

pub fn execute<S: AsRef<str>>(
    patch_type: S,
    args: Option<&[S]>,
    wait: bool,
) -> Result<Command, Box<dyn std::error::Error>> {
    let curr_dir = env::current_dir().unwrap();

    let mut command = Command::new(curr_dir.join("injector.exe"));
    command.arg(patch_type.as_ref());
    if let Some(args) = args {
        for arg in args {
            command.arg(arg.as_ref());
        }
    }

    let mut child = command.spawn()?;

    if wait {
        child.wait().map_err(|_| {
            io::Error::new(
                io::ErrorKind::Other,
                format!("patch {} failed to wait on child", patch_type.as_ref()),
            )
        })?;
    }

    Ok(command)
}

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
    let mut system = System::new_all();

    if is_steam_open(&mut system) {
        println!("steam is open pls close it thanks");
        thread::sleep(Duration::from_secs(10));
        exit(1);
    }

    println!("unpatching just in case\n");
    match execute("unpatch-friend", None, true) {
        Ok(_) => {}
        Err(err) => {
            eprintln!("{}", err);
        }
    }

    match execute("unpatch-library", None, true) {
        Ok(_) => {}
        Err(err) => {
            eprintln!("{}", err);
        }
    }

    // we dont need to wait for steam to start because of -noverifyfiles
    // println!("waiting for steam to start");
    // wait_for_steam(&mut system);

    match execute("patch-friend", Some(&["--update"]), true) {
        Ok(_) => {}
        Err(err) => {
            eprintln!("{}", err);
        }
    }
    match execute("patch-library", None, true) {
        Ok(_) => {}
        Err(err) => {
            eprintln!("{}", err);
        }
    }

    let mut command = Command::new(steam_exe_path);
    if command.arg("-dev").arg("-noverifyfiles").spawn().is_ok() {
        println!("starting steam\n");
        server::server_main().expect("server failed eh");
    } else {
        println!("steam didn't start");
    }

    handle.join().unwrap();
}
