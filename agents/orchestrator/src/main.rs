use axum::{routing::get, routing::post, Json, Router};
use serde_json::Value;
use std::net::SocketAddr;
use tokio::net::TcpListener;

// Import agent libraries
use critic::run as run_critic;
use ingestion::run as run_ingestion;
use retrieval::run as run_retrieval;
use telemetry::run as run_telemetry;

async fn api_command(Json(payload): Json<Value>) -> Json<Value> {
    // Example: dispatch to agent based on payload
    let cmd = payload.get("agent").and_then(|v| v.as_str()).unwrap_or("");
    let result = match cmd {
        "ingestion" => run_ingestion()
            .await
            .map(|_| "ingestion ok")
            .unwrap_or("ingestion error"),
        "retrieval" => run_retrieval()
            .await
            .map(|_| "retrieval ok")
            .unwrap_or("retrieval error"),
        "critic" => run_critic()
            .await
            .map(|_| "critic ok")
            .unwrap_or("critic error"),
        "telemetry" => run_telemetry()
            .await
            .map(|_| "telemetry ok")
            .unwrap_or("telemetry error"),
        _ => "unknown agent",
    };
    Json(serde_json::json!({ "status": result, "echo": payload }))
}

async fn api_events() -> Json<Value> {
    // TODO: Stream or return events
    Json(serde_json::json!({ "events": [] }))
}

#[tokio::main]
pub async fn main() {
    let app = Router::new()
        .route("/api/v1/command", post(api_command))
        .route("/api/v1/events", get(api_events));

    let addr = SocketAddr::from(([127, 0, 0, 1], 5174));
    println!("REST API listening on {}", addr);
    let listener = TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
