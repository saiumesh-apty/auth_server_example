use crate::types::handlers::RedisType;
use crate::types::token::TokenBody;
use actix_web::web::{Data, Json};
use actix_web::HttpResponse;
use redis::Commands;

pub fn logout_handler(body: Json<TokenBody>, redis: Data<RedisType>) -> HttpResponse {
    let mut redis_conn = redis.lock().unwrap();
    match redis_conn.del::<String, ()>(body.token.clone()) {
        Ok(_) => HttpResponse::Ok().body(""),
        Err(err) => {
            println!("{:?}", err);
            HttpResponse::InternalServerError().body("")
        }
    }
}
