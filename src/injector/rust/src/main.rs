use std::env;
use std::process::Command;

fn main() {
    let args: Vec<String> = env::args().collect();
    println!("{:?}", args);
    let steam_path = &args[1];

        
    let output = Command::new(steam_path)
        .arg("-dev")
        .spawn()
        .expect("welp wrong steam path probably");
    let steam_instance = output.stdout;
    println!("{:?}", steam_instance);

}
