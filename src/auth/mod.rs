use actix_web::{ web, Scope };
use web::{post};
use actix_web::web::{scope, resource};
mod login;
use login::login_handler;

pub fn auth_routes() -> Scope {
    scope("/auth")
        .service(resource("/login").route(post().to(login_handler)))
}