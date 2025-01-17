import type { ChatRequest, ChatResponse } from "ollama";

export type ModelVersion = "llama3.2" | "llama3.3" | "TheVoid";
export type Settings = Partial<ChatRequest> & { model: ModelVersion; stream: false };

export type OllamaRequest = Partial<ChatRequest> & {
	model?: ModelVersion;
	stream: false;
};

export { ChatResponse as OllamaResponse };
