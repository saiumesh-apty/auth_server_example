use uuid::Uuid;

pub fn get_uuid() -> String {
    format!("{}", Uuid::new_v4())
}
