import { invoke } from "@tauri-apps/api/core";

// Example: call orchestrator REST endpoint from UI
export async function sendCommand<T = unknown>(command: string, payload: T) {
	return await invoke("api_command", { command, payload });
}

export async function getEvents() {
	return await invoke("api_events");
}
