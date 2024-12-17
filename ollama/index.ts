import ollama from "ollama";
import Ollama from "./ollama.model";

import type { ChatResponse, ChatRequest } from "ollama";

import type { Response } from "./types/response.type";

export { ollama, Response, ChatRequest, ChatResponse };

export default Ollama;
