import type { ChatResponse } from "ollama";
import type { ModelVersion } from './ollama.types';

type OllamaResponse<T = ChatResponse> = {
	model: ModelVersion;
	ollama?: T;
	text: string;
	type: 0 | 1;
};

export { OllamaResponse };
