use clap:: {
    Args,
    Parser,
    Subcommand
};


#[derive(Debug, Parser)]
#[clap(author, version, about)]
pub struct SteamedInjectorArgs {
    #[clap(subcommand)]
    pub command: SteamInjectorCommands,
}

#[derive(Debug, Subcommand)]
pub enum SteamInjectorCommands {
    ///Launches stamed (the mod) hHEHE
    Launch(LaunchSubCommand),
    
    Restore(GenericSubCommand)
}


#[derive(Debug, Args)]
pub struct LaunchSubCommand {
    /// steam path bruh what else do you want me to say
    pub steam_path: String,

    /// how long the program should wait for steam
    pub timeout: u64
}



#[derive(Debug, Args)]
pub struct GenericSubCommand {
    /// steam path bruh what else do you want me to say
    pub steam_path: String
}