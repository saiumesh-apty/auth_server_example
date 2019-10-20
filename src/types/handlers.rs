use std::sync::{Arc, Mutex};
use redis::Connection;

pub type RedisType = Arc<Mutex<Connection>>;