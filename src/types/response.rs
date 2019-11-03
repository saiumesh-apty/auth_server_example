use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct ErrorResponse {
    pub message: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Token {
    pub token: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Response {
    pub status: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct MessageResponse {
    pub status: bool,
    pub message: String,
}
