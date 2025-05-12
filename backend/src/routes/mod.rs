pub mod tasks;

use crate::AppState;
use axum::Router;

pub fn router() -> Router<AppState> {
    Router::new().merge(tasks::router())
}
