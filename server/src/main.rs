use actix_web::{http::header, middleware, web, App, HttpServer};
use actix_cors::Cors;

use serde::{Deserialize};

#[derive(Debug, Deserialize)]
pub struct Requeststs {
   url: String,
}

async fn index(req: web::Query<Requeststs>) -> String {
    println!("REQ: {:?}", req);
    reqwest::get(&req.url)
        .await
        .unwrap()
        .text()
        .await
        .unwrap()
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(move || {
        App::new()
            .wrap(
                Cors::default()
                    .allowed_origin("https://steamloopback.host")
                    .allowed_methods(vec!["GET", "POST"])
                    .allowed_headers(vec![header::AUTHORIZATION, header::ACCEPT])
                    .allowed_header(header::CONTENT_TYPE)
                    .supports_credentials()
                    .max_age(3600)
            )
            .wrap(middleware::Logger::default())
            .service(web::resource("/index.html").to(|| async { "Hello world!" }))
            .service(web::resource("/").to(index))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}