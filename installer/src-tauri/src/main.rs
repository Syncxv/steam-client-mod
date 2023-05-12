// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::env;
mod util;

use util::{execute_command_with_path, get_config_json};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// command to check if pnpm is installed
#[tauri::command]
fn check_pnpm() -> bool {
    let command_name = "pnpm";
    let args = &["--version"];
    if let Err(e) = execute_command_with_path(command_name, args) {
        eprintln!("Error: {}", e);
        false
    } else {
        true
    }
}

#[tauri::command]
fn get_config() -> String {
    get_config_json().unwrap()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![check_pnpm])
        .invoke_handler(tauri::generate_handler![get_config])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
