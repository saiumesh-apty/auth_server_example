use crate::types::handlers::RedisType;
use crate::types::login::Login;
use crate::types::response::{ErrorResponse, Token};
use crate::utils::apty_uuid::get_uuid;
use actix_web::http::header;
use actix_web::web::{Data, Json};
use actix_web::HttpResponse;
use redis::Commands;

pub fn login_handler(login: Json<Login>, redis: Data<RedisType>) -> HttpResponse {
    if login.email != String::from("admin@apty.io") || login.password != String::from("apty@123") {
        return HttpResponse::BadRequest().json(ErrorResponse {
            message: String::from("Email or password is wrong!!"),
        });
    }
    let token: String = get_uuid();
    let mut redis_conn = redis.lock().unwrap();
    redis_conn
        .set::<String, i32, String>(token.clone(), 123)
        .unwrap();
    HttpResponse::Ok().json(Token { token })
}

pub fn redirect() -> HttpResponse {
    HttpResponse::Found()
        .header(header::LOCATION, "http://www.google.com")
        .finish()
        .into_body()
}
