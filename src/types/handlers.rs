use redis::Connection;
use std::sync::{Arc, Mutex};

pub type RedisType = Arc<Mutex<Connection>>;
