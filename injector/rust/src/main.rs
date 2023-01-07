mod args;
mod cmd;
mod config;

use clap::Parser;

use args::{Commands, SteamInjectorCli};

use cmd::friend::{handle_friend_command_patch, handle_friend_command_unpatch};
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
            Commands::PatchFriend => handle_friend_command_patch(steam_config),
            Commands::UnpatchFriend => handle_friend_command_unpatch(steam_config),
        },
    }
}
