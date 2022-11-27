use actix_web::{get, post, App, HttpResponse, HttpServer, Responder};

// use crate::friend;

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello world!")
}

#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    HttpResponse::Ok().body(req_body)
}

// #[post("/shutdown")]
// async fn shutdown() -> impl Responder {
//     friend::restore_friend_assets(steam_friend_js, steam_friend_index_html);
//     HttpResponse::Ok()
// }

#[actix_web::main]
pub async fn main_thigy() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new().service(hello).service(echo)
        // .route("/hey", web::get().to(manual_hello()))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
