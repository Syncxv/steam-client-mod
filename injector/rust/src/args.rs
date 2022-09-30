use clap:: {
    Args,
    Parser,
    Subcommand
};


#[derive(Debug, Parser)]
#[clap(author, version, about)]
pub struct SteamedInjectorArgs {
    #[clap(subcommand)]
    pub command: Option<SteamInjectorCommands>,
}

#[derive(Debug, Subcommand)]
pub enum SteamInjectorCommands {
    ///Launches stamed (the mod) hHEHE
    Launch(LaunchSubCommand),

    ///restore to default welp
    Restore(GenericSubCommand),

    ///inject stamed into the friends chat 
    Inject(GenericSubCommand),

    ///creates the backups for friends
    CreateBackups(GenericSubCommand),

    ///removes the backups for friends
    DeleteBackups(GenericSubCommand)
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