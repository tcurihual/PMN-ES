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
    sqlx::migrate!()
        .run(&pool)
        .await
        .expect("Failed to run database migrations");

    let state = AppState { pool };

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    let router = Router::new().merge(routes::router()).layer(cors);

    let router = router.with_state(state);
    Ok(router.into())
}
