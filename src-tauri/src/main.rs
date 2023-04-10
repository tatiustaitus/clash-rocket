// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


use tauri::{Manager};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

type CmdResult<T = ()> = Result<T, String>;

#[tauri::command]
fn get_app_root_path() -> CmdResult<String> {
    let exe_path = std::env::current_exe().unwrap();
    let parent_path = exe_path.parent().unwrap();
    let path = parent_path.display().to_string();

    log::debug!("getClashMetaBinaryPath path: {path}");

    return Ok(path);
}

fn main() {
    tauri_plugin_deep_link::prepare("com.tauri.dev");

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, get_app_root_path])
        .setup(|app| {
            // If you need macOS support this must be called in .setup() !
            // Otherwise this could be called right after prepare() but then you don't have access to tauri APIs
            let handle = app.handle();
            tauri_plugin_deep_link::register(
                "myapp",
                move |request| {
                dbg!(&request);
                handle.emit_all("scheme-request-received", request).unwrap();
                },
            )
            .unwrap(/* If listening to the scheme is optional for your app, you don't want to unwrap here. */);
            Ok(())
        })
        // .setup(|app| {
        //     // For macOS support this must be called in .setup() !
        //     // Otherwise this could be called right after prepare() but then we don't have access to tauri APIs
        //     let handle = app.handle();
        //     tauri_plugin_deep_link::register(
        //         "clash",
        //         move |request| {
        //         dbg!(&request);
        //         handle.emit_all("scheme-request-received", request).unwrap();
        //         },
        //     )
        //     .unwrap();
        //     Ok(())
        // })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

