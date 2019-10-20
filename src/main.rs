use std::env;

use actix_web::{App, HttpServer};

// auth routes
mod auth;
use auth::auth_routes;
use crate::cache::apty_redis::connect_redis;
use std::sync::{Arc, Mutex};
use actix_web::web::Data;

// types
mod types;

// cache
mod cache;

// utils
mod utils;

fn get_port() -> String {
    format!("localhost:{}", env::var("PORT").unwrap_or("8080".to_string()))
}



fn main() -> std::io::Result<()> {
    let address = get_port();
    let redis_client = Arc::new(Mutex::new(connect_redis()));
    HttpServer::new(move || {
        App::new()
            .register_data(Data::new(redis_client.clone()))
            .service(auth_routes())
    }).bind(address)?.run()
}
