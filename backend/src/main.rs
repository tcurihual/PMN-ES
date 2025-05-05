use axum::{routing::get, Router};

async fn hello_world() -> &'static str {
    "Hello, world!"
}

mod controllers;
mod middlewares;
mod models;
mod routes;
mod services;

#[shuttle_runtime::main]
async fn main() -> shuttle_axum::ShuttleAxum {
    let router = Router::new()
        .route("/", get(hello_world))
        .merge(routes::router());

    Ok(router.into())
}
