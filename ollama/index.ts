import ollama from "ollama";
import Ollama from "./ollama.model";

import type { ChatResponse, ChatRequest } from "ollama";

import type { OllamaResponse } from "./types/response.type";

export { ollama, OllamaResponse, ChatRequest, ChatResponse };

export default Ollama;
