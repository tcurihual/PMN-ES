use crate::controllers::tasks;
use crate::AppState;
use axum::{
    routing::{delete, get, post, put},
    Router,
};

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/tasks", get(tasks::list_tasks))
        .route("/tasks", post(tasks::create_task))
        .route("/tasks/{id}", put(tasks::update_task))
        .route("/tasks/{id}", delete(tasks::delete_task))
}
