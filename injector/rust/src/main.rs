mod args;
mod cmd;
mod utils;

use clap::Parser;
use shared::get_config;

use args::{Commands, SteamInjectorCli};

use cmd::friend::{handle_friend_command_patch, handle_friend_command_unpatch};
use cmd::test::handle_test;

use cmd::library::{handle_library_command, handle_library_unpatch_command};

fn main() {
    let steam_config = get_config();

    let args = SteamInjectorCli::parse();
    match args.command {
        None => {
            println!("hi there")
        }
        Some(x) => match x {
            Commands::Test => handle_test(steam_config),
            Commands::PatchFriend { update } => handle_friend_command_patch(steam_config, update),
            Commands::UnpatchFriend => handle_friend_command_unpatch(steam_config),
            Commands::PatchLibrary => handle_library_command(steam_config),
            Commands::UnpatchLibrary => handle_library_unpatch_command(steam_config),
        },
    }
}
