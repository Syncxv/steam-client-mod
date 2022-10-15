use actix_web::{get, web, App, HttpServer, Result};
// use serde::{Deserialize, Serialize};

#[get("/get/{url}")] // <- define path parameters
async fn index(path: web::Path<String>) -> Result<String> {
    let url = path.into_inner();
    Ok(format!("url {}", url))
}
