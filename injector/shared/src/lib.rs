use config::Config;
use std::collections::HashMap;

pub fn get_config() -> HashMap<std::string::String, std::string::String> {
    let settings = Config::builder()
        // Add in `./Settings.toml`
        .add_source(config::File::with_name("config.toml"))
        // Add in settings from the environment (with a prefix of APP)
        // Eg.. `APP_DEBUG=1 ./target/app` would set the `debug` key
        .add_source(config::Environment::with_prefix("APP"))
        .build()
        .unwrap();

    settings
        .try_deserialize::<HashMap<String, String>>()
        .unwrap()
}
