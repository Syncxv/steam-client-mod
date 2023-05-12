use config::Config;
use serde_json;
use serde_json::Error as SerdeError;
use std::collections::HashMap;
use std::env;
use std::io;
use std::path::Path;
use std::path::PathBuf;
use std::process::Command;
pub fn execute_command_with_path(command_name: &str, args: &[&str]) -> std::io::Result<()> {
    let path_delimiter = if cfg!(target_family = "unix") {
        ':'
    } else {
        ';'
    };

    let paths = env::var("PATH").unwrap_or_default();

    for path in paths.split(path_delimiter).map(Path::new) {
        let command_path = if cfg!(target_family = "unix") {
            path.join(command_name)
        } else {
            path.join(format!("{}.exe", command_name))
        };

        if command_path.exists() {
            let mut command = Command::new(command_path);
            command.args(args);
            let status = command.status()?;

            if status.success() {
                break;
            } else {
                eprintln!("Error: Command exited with non-zero status.");
            }
        }
    }

    Ok(())
}

pub fn get_config_json() -> Result<String, Box<dyn std::error::Error>> {
    let config_path = find_config_path()?;
    let settings = Config::builder()
        .add_source(config::File::with_name(config_path.to_str().unwrap()))
        .add_source(config::Environment::with_prefix("APP"))
        .build();

    match settings {
        Ok(settin) => {
            let conf = settin.try_deserialize::<HashMap<String, String>>()?;
            Ok(serde_json::to_string(&conf)?)
        }
        Err(e) => {
            eprintln!(
                "Failed to read config with path: {}. Using Default config. Error: {}",
                config_path.display(),
                e
            );
            Ok(serde_json::to_string(&get_default_config())?)
        }
    }
}

pub fn find_config_path() -> io::Result<PathBuf> {
    let mut current_dir = std::env::current_dir()?;
    let root_folder_name = "steam-client-mod";

    while current_dir.file_name().unwrap() != root_folder_name {
        if !current_dir.pop() {
            return Err(io::Error::new(
                io::ErrorKind::NotFound,
                "Root directory not found",
            ));
        }
    }

    Ok(current_dir.join("config.toml"))
}

pub fn get_default_config() -> HashMap<&'static str, &'static str> {
    let mut config = HashMap::new();
    config.insert("steam_path", "C:\\Program Files (x86)\\Steam");

    config
}
