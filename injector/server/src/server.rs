use std::env;
use std::{
    path::Path,
    process::{exit, Command},
};

use actix_web::{get, App, HttpResponse, HttpServer, Responder};

#[get("/shutdown")]
async fn hello() -> impl Responder {
    println!("shutting down");
    //let curr_dir = env::current_dir().unwrap().to_str().unwrap().to_string();
    // let mut command = Command::new(Path::new(&curr_dir).join("injector.exe"));
    // command.arg("unpatch-friend");
    // command.spawn().unwrap();
    exit(0);
    HttpResponse::Ok().body("hey")
}

#[actix_web::main]
pub async fn server_main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new().service(hello)
        // .service(echo)
        // .route("/hey", web::get().to(manual_hello))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
