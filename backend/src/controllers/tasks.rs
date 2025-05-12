use crate::{
    models::task::{CreateTask, Task, UpdateTask},
    AppState,
};
use axum::{
    extract::{Path, State},
    http::StatusCode,
    Json,
};
use serde_json::json;
use sqlx::Error;

pub async fn list_tasks(
    State(state): State<AppState>,
) -> Result<Json<Vec<Task>>, (StatusCode, Json<serde_json::Value>)> {
    let tasks = sqlx::query_as::<_, Task>(
        r#"
        SELECT 
            id, 
            name, 
            description, 
            finish_date, 
            completed, 
            magnitude, 
            difficulty, 
            created_at, 
            assigned_member_id
        FROM tasks
        "#,
    )
    .fetch_all(&state.pool)
    .await
    .map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({
                "message": "Error al obtener las tareas",
                "error": e.to_string()
            })),
        )
    })?;

    if tasks.is_empty() {
        Err((
            StatusCode::NOT_FOUND,
            Json(json!({
                "message": "No existen tareas registradas"
            })),
        ))
    } else {
        Ok(Json(tasks))
    }
}

pub async fn create_task(
    State(state): State<AppState>,
    Json(payload): Json<CreateTask>,
) -> Result<(StatusCode, Json<Task>), (StatusCode, Json<serde_json::Value>)> {
    let task = sqlx::query_as::<_, Task>(
        r#"
        INSERT INTO tasks (
            name, 
            description, 
            finish_date, 
            completed, 
            magnitude, 
            difficulty, 
            assigned_member_id
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        "#,
    )
    .bind(payload.name)
    .bind(payload.description)
    .bind(payload.finish_date)
    .bind(payload.completed.unwrap_or(false))
    .bind(payload.magnitude) // Usa el enum directamente
    .bind(payload.difficulty) // Usa el enum directamente
    .bind(payload.assigned_member_id)
    .fetch_one(&state.pool)
    .await
    .map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({
                "message": "Error al crear la tarea",
                "error": e.to_string()
            })),
        )
    })?;

    Ok((StatusCode::CREATED, Json(task)))
}

pub async fn update_task(
    Path(task_id): Path<i32>,
    State(state): State<AppState>,
    Json(payload): Json<UpdateTask>,
) -> Result<Json<Task>, (StatusCode, Json<serde_json::Value>)> {
    // Primero verificamos si la tarea existe
    let existing_task = sqlx::query_as::<_, Task>("SELECT * FROM tasks WHERE id = $1")
        .bind(task_id)
        .fetch_optional(&state.pool)
        .await
        .map_err(|e| {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({
                    "message": "Error al verificar la tarea",
                    "error": e.to_string()
                })),
            )
        })?;

    if existing_task.is_none() {
        return Err((
            StatusCode::NOT_FOUND,
            Json(json!({
                "message": format!("No se encontró la tarea con ID {}", task_id)
            })),
        ));
    }

    // Si existe, procedemos con la actualización
    let updated_task = sqlx::query_as::<_, Task>(
        r#"
        UPDATE tasks SET
            name = $1,
            description = $2,
            finish_date = $3,
            completed = $4,
            magnitude = $5,
            difficulty = $6,
            assigned_member_id = $7
        WHERE id = $8
        RETURNING *
        "#,
    )
    .bind(payload.name)
    .bind(payload.description)
    .bind(payload.finish_date)
    .bind(payload.completed)
    .bind(payload.magnitude)
    .bind(payload.difficulty)
    .bind(payload.assigned_member_id)
    .bind(task_id)
    .fetch_one(&state.pool)
    .await
    .map_err(|e| {
        let (status, message) = match e {
            Error::RowNotFound => (
                StatusCode::NOT_FOUND,
                format!("La tarea con ID {} no existe", task_id),
            ),
            _ => (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("Error al actualizar la tarea: {}", e),
            ),
        };

        (status, Json(json!({ "message": message })))
    })?;

    Ok(Json(updated_task))
}

pub async fn delete_task(
    Path(task_id): Path<i32>,
    State(state): State<AppState>,
) -> Result<(StatusCode, Json<serde_json::Value>), (StatusCode, Json<serde_json::Value>)> {
    let existing_task = sqlx::query_as::<_, Task>("SELECT * FROM tasks WHERE id = $1")
        .bind(task_id)
        .fetch_optional(&state.pool)
        .await
        .map_err(|e| {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({
                    "message": "Error al verificar la tarea",
                    "error": e.to_string()
                })),
            )
        })?;

    if existing_task.is_none() {
        return Err((
            StatusCode::NOT_FOUND,
            Json(json!({
                "message": format!("No se encontró la tarea con ID {}", task_id)
            })),
        ));
    }

    sqlx::query("DELETE FROM tasks WHERE id = $1")
        .bind(task_id)
        .execute(&state.pool)
        .await
        .map_err(|e| {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({
                    "message": "Error al eliminar la tarea",
                    "error": e.to_string()
                })),
            )
        })?;

    Ok((
        StatusCode::OK,
        Json(json!({
            "message": format!("Tarea con ID {} eliminada correctamente", task_id)
        })),
    ))
}
