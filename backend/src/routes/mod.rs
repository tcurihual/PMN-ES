pub mod tasks;

use axum::Router;

pub fn router() -> Router {
    Router::new().merge(tasks::router())
}
