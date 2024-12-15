import { Ollama as OllamaAi } from "ollama";
import type {
    ChatRequest
} from 'ollama';

const req: ChatRequest & { stream: true } = {
    model: "llama3.2",
    stream: true,
    options: {
        num_gpu: 2,
        num_ctx: 4
    }
};

const role = "user";

const ollama = new OllamaAi();

class Ollama {
    private readonly _ollama = ollama;

    public constructor() {};

    public chat(promt: string|ChatRequest) {
        if (typeof promt === "string")
            return this._ollama.chat({ ...req, messages: [{ role, content: promt }] });

        return this._ollama.chat({ ...promt, stream: true });
    }

    get ollama(): OllamaAi {
        return this._ollama;
    }
};

export default Ollama;