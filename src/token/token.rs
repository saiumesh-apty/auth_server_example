use crate::cache::apty_redis::connect_redis;
use crate::types::handlers::RedisType;
use crate::types::response::{MessageResponse, Response};
use crate::types::token::TokenBody;
use actix_web::web::{Data, Json};
use actix_web::HttpResponse;
use redis::{Commands, Connection};

pub fn token_handler(body: Json<TokenBody>, redis: Data<RedisType>) -> HttpResponse {
    match redis
        .clone()
        .lock()
        .unwrap()
        .get::<String, String>(body.token.clone())
    {
        Ok(_) => HttpResponse::Ok().json(Response { status: true }),
        Err(err) => HttpResponse::BadRequest().json(MessageResponse {
            status: false,
            message: String::from("Check token"),
        }),
    }
}
