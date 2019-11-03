use std::env;

use actix_web::{App, HttpServer, http::header};
use actix_cors::Cors;
use actix_files as fs;

// auth routes
mod auth;
use crate::cache::apty_redis::connect_redis;
use actix_web::web::Data;
use auth::auth_routes;
use std::sync::{Arc, Mutex};

// types
mod types;

// cache
mod cache;

// utils
mod utils;

// token checker
mod token;
use token::token_routes;

fn get_port() -> String {
    format!(
        "localhost:{}",
        env::var("PORT").unwrap_or("8080".to_string())
    )
}

fn main() -> std::io::Result<()> {
    let address = get_port();
    let redis_client = Arc::new(Mutex::new(connect_redis()));
    HttpServer::new(move || {
        App::new()
            .wrap(
                Cors::new()
                    .allowed_origin("http://localhost:8081")
                    .allowed_origin("http://localhost:8080")
                    .allowed_origin("https://apty-birthday-reminder.herokuapp.com")
                    .allowed_methods(vec!["GET", "POST", "PUT"])
                    .allowed_headers(vec![header::AUTHORIZATION, header::ACCEPT])
                    .allowed_header(header::CONTENT_TYPE)
                    .max_age(3600)
            )
            .register_data(Data::new(redis_client.clone()))
            .service(auth_routes())
            .service(token_routes())
            .service(fs::Files::new("/", "auth_client").index_file("index.html"))
    })
    .bind(address)?
    .run()
}
