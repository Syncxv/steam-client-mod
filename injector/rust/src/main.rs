mod args;
mod cmd;
mod config;

use clap::Parser;

use args::{Commands, SteamInjectorCli};

use cmd::test::handle_test;

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
