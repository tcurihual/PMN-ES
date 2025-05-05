use axum::Json;

pub async fn list_tasks() -> Json<&'static str> {
    Json("¡Listado de tareas!")
}
