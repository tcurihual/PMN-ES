use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Task {
    pub id: i32,
    pub name: String,
    pub description: String,
    pub finish_date: DateTime<Utc>,
    pub completed: bool,
    pub magnitude: Magnitude,
    pub difficulty: Difficulty,
    pub created_at: DateTime<Utc>,
    pub assigned_member_id: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct CreateTask {
    pub name: String,
    pub description: String,
    pub finish_date: DateTime<Utc>,
    pub completed: Option<bool>,
    pub magnitude: Magnitude,
    pub difficulty: Difficulty,
    pub assigned_member_id: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateTask {
    pub name: String,
    pub description: String,
    pub finish_date: DateTime<Utc>,
    pub completed: bool,
    pub magnitude: Magnitude,
    pub difficulty: Difficulty,
    pub assigned_member_id: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, sqlx::Type)]
#[sqlx(type_name = "magnitude_type")]
pub enum Magnitude {
    NotTrivial,
    Trivial,
    Important,
}

#[derive(Debug, Serialize, Deserialize, sqlx::Type)]
#[sqlx(type_name = "difficulty_type")]
pub enum Difficulty {
    Easy,
    Medium,
    Hard,
}
