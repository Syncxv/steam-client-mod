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
