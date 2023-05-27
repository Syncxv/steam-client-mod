use std::{io, process::Command};

use crate::util::get_root_folder;

pub fn execute<S: AsRef<str>>(
    patch_type: S,
    args: Option<&[S]>,
    wait: bool,
) -> Result<Command, Box<dyn std::error::Error>> {
    let curr_dir = get_root_folder()?;

    let mut command = Command::new(curr_dir.join("injector.exe"));
    command.arg(patch_type.as_ref());
    if let Some(args) = args {
        for arg in args {
            command.arg(arg.as_ref());
        }
    }

    let mut child = command.spawn()?;

    if wait {
        child.wait().map_err(|_| {
            io::Error::new(
                io::ErrorKind::Other,
                format!("patch {} failed to wait on child", patch_type.as_ref()),
            )
        })?;
    }

    Ok(command)
}

fn execute_or_error<S: AsRef<str>>(patch_type: S, args: Option<&[S]>, wait: bool) -> bool {
    match execute(patch_type, args, wait) {
        Ok(_) => true,
        Err(err) => {
            eprintln!("{}", err);
            false
        }
    }
}

pub enum PatchType {
    Friend,
    Library,
}

impl PatchType {
    pub fn from_str(s: &str) -> Option<Self> {
        match s {
            "friend" => Some(Self::Friend),
            "library" => Some(Self::Library),
            _ => None,
        }
    }
}

#[tauri::command]
pub fn patch(patch_type: String) -> bool {
    let patch_type = match PatchType::from_str(&patch_type) {
        Some(pt) => pt,
        None => {
            eprintln!("Invalid patch type: {}", patch_type);
            return false;
        }
    };

    match patch_type {
        PatchType::Friend => {
            // unpatch first
            if !execute_or_error("unpatch-friend", None, true) {
                return false;
            }

            if !execute_or_error("patch-friend", Some(&["--update"]), true) {
                return false;
            }
        }
        PatchType::Library => {
            if !execute_or_error("unpatch-library", None, true) {
                return false;
            }

            if !execute_or_error("patch-library", None, true) {
                return false;
            }
        }
    }

    true
}
