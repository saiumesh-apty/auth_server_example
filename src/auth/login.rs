use actix_web::HttpResponse;
use crate::types::login::Login;
use actix_web::web::{Json, Data};
use crate::types::response::{ErrorResponse, Token};
use crate::utils::apty_uuid::get_uuid;
use crate::types::handlers::RedisType;
use redis::Commands;


pub fn login_handler(login: Json<Login>, redis: Data<RedisType>) -> HttpResponse {
    if login.email != String::from("admin@apty.io") ||
         login.password != String::from("apty@123"){
        return HttpResponse::BadRequest().json(ErrorResponse{
            message: String::from("Email or password is wrong!!")
        });
    }
    let token: String = get_uuid();
    let mut redis_conn = redis.lock().unwrap();
    redis_conn.set::<String, i32, String>(token.clone(), 123).unwrap();
    HttpResponse::Ok().json(Token{
        token
    })
}