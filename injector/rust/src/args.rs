use clap::{Parser, Subcommand};

#[derive(Parser)]
#[command(author, version, about, long_about = None)]
pub struct SteamInjectorCli {
    #[command(subcommand)]
    pub command: Option<Commands>,
}

#[derive(Subcommand)]
pub enum Commands {
    /// does testing things
    Test,

    /// Patches to friends ui
    #[clap(name = "patch-friend")]
    PatchFriend {
        #[clap(long)]
        update: bool,
    },

    /// UnPatches from friends
    UnpatchFriend,

    /// Patches to library ui
    /// [WIP]
    #[clap(name = "patch-library")]
    PatchLibrary,

    /// UnPatches from library
    /// [WIP]
    UnpatchLibrary,
}
