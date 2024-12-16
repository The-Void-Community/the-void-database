import { Ollama as OllamaAi } from "ollama";
import type {
    ChatRequest
} from 'ollama';

const req: ChatRequest = {
    model: "llama3.2",
    options: {
        num_gpu: 2,
        num_ctx: 2
    }
};

const role = "user";
const ollama = new OllamaAi();

class Ollama {
    private readonly _ollama = ollama;

    public constructor() {};

    public chat(promt: string|ChatRequest) {
        if (typeof promt === "string")
            return this._ollama.chat({ model: req.model, messages: [{ role, content: promt }] });

        return this._ollama.chat({
            model: req.model,
            options: req.options,
            messages: promt.messages,
            format: promt.format,
            keep_alive: promt.keep_alive,
            tools: promt.tools
        });
    }

    get ollama(): OllamaAi {
        return this._ollama;
    }
};

export default Ollama;