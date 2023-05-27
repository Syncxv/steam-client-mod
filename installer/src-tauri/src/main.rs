// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::env;

mod injector;
mod util;
use crate::util::get_config_json;

#[tauri::command]
fn get_config() -> String {
    match get_config_json() {
        Ok(config) => config,
        Err(e) => {
            eprintln!("Failed to get config: {}", e);
            "{}".to_string()
        }
    }
}
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![injector::patch, greet, get_config])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
