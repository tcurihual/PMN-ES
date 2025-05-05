use crate::controllers::tasks;
use axum::{routing::get, Router};

pub fn router() -> Router {
    Router::new().route("/tasks", get(tasks::list_tasks))
}
