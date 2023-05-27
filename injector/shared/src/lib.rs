use config::Config;
use std::{collections::HashMap, io, path::PathBuf};

pub fn get_config() -> HashMap<std::string::String, std::string::String> {
    let root_folder = match get_root_folder() {
        Ok(folder) => folder,
        Err(err) => {
            eprintln!("{}", err);
            return get_default_config();
        }
    };
    let config_path = root_folder.join("config.toml");

    let settings = Config::builder()
        .add_source(config::File::from(config_path))
        .add_source(config::Environment::with_prefix("APP"))
        .build()
        .unwrap();

    settings
        .try_deserialize::<HashMap<String, String>>()
        .unwrap()
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

pub fn get_default_config() -> HashMap<String, String> {
    let mut config = HashMap::new();
    config.insert(
        "steam_path".to_string(),
        "C:\\Program Files (x86)\\Steam".to_string(),
    );

    config
}
