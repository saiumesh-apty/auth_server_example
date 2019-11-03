use actix_web::web::{resource, scope};
use actix_web::{web, Scope};
use web::post;
mod login;
mod logout;
use login::login_handler;
use logout::logout_handler;

pub fn auth_routes() -> Scope {
    scope("/auth")
        .service(resource("/login").route(post().to(login_handler)))
        .service(resource("/logout").route(post().to(logout_handler)))
}
