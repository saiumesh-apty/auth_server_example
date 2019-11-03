use actix_web::web::{resource, scope};
use actix_web::{web, Scope};
use web::post;
mod token;
use token::token_handler;

pub fn token_routes() -> Scope {
    scope("/token").service(resource("/isvalid").route(post().to(token_handler)))
}
