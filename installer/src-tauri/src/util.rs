use config::Config;
use std::{collections::HashMap, io, path::PathBuf};

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

pub fn get_root_folder() -> Result<PathBuf, io::Error> {
    let mut current_dir = std::env::current_dir()?;
    let root_folder_name = "steam-client-mod";

    while current_dir.file_name().and_then(|os_str| os_str.to_str()) != Some(root_folder_name) {
        if !current_dir.pop() {
            return Err(io::Error::new(
                io::ErrorKind::NotFound,
                "Root directory not found",
            ));
        }
    }

    Ok(current_dir)
}

pub fn find_config_path() -> io::Result<PathBuf> {
    let root_folder = get_root_folder()?;
    Ok(root_folder.join("config.toml"))
}

pub fn get_default_config() -> HashMap<&'static str, &'static str> {
    let mut config = HashMap::new();
    config.insert("steam_path", "C:\\Program Files (x86)\\Steam");

    config
}
