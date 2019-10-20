use redis::{Client, Connection};

pub fn connect_redis() -> Connection {
    Client::open("redis://localhost:6379").unwrap().get_connection().unwrap()
}