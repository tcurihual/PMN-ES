use axum::Router;
use sqlx::PgPool;
use tower_http::cors::{Any, CorsLayer};

mod controllers;
mod middlewares;
mod models;
mod routes;
mod services;

#[derive(Clone)]
pub struct AppState {
    pub pool: PgPool,
}

#[shuttle_runtime::main]
async fn main(#[shuttle_shared_db::Postgres] pool: PgPool) -> shuttle_axum::ShuttleAxum {
    let state = AppState { pool };

    let cors = CorsLayer::new()
        .allow_origin(Any) // Permite cualquier origen (en desarrollo)
        .allow_methods(Any) // Permite todos los métodos HTTP
        .allow_headers(Any); // Permite todos los headers

    let router = Router::new().merge(routes::router()).layer(cors);

    let router = router.with_state(state);
    Ok(router.into())
}
