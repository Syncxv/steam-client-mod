use config::Config;
use serde_json;
use std::collections::HashMap;
use std::env;
use std::path::Path;
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

pub fn get_config_json() -> String {
    let mut current_dir = std::env::current_dir().unwrap();
    let root_folder_name = "steam-client-mod";

    while current_dir.file_name().unwrap() != root_folder_name {
        if !current_dir.pop() {
            panic!("Root directory not found");
        }
    }

    let config_path_buf = current_dir.join("config.toml");
    let config_path = config_path_buf.to_str().expect("Invaid Path");

    let settings_res = Config::builder()
        // Add in `./Settings.toml`
        .add_source(config::File::with_name(&config_path))
        // Add in settings from the environment (with a prefix of APP)
        // Eg.. `APP_DEBUG=1 ./target/app` would set the `debug` key
        .add_source(config::Environment::with_prefix("APP"))
        .build();

    match settings_res {
        Ok(setting) => {
            let conf = setting
                .try_deserialize::<HashMap<String, String>>()
                .unwrap();

            serde_json::to_string(&conf).unwrap()
        }
        Err(e) => {
            eprintln!(
                "Failed to read config with path: {} Using Default config. Error: {}",
                config_path, e
            );
            serde_json::to_string(&get_default_config()).unwrap()
        }
    }
}

pub fn get_default_config() -> HashMap<&'static str, &'static str> {
    let mut config = HashMap::new();
    config.insert("steam_path", "C:\\Program Files (x86)\\Steam");

    config
}
