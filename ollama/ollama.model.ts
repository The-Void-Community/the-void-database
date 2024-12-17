import { Ollama as OllamaAi } from "ollama";
import type {
    OllamaRequest,
    Settings
} from './types/ollama.types';

const settings: Settings = {
    model: "TheVoid",
    options: {
        num_gpu: 0.5,
        num_ctx: 1
    },
    stream: false
};

const role = "user";
const ollama = new OllamaAi();

class Ollama {
    private readonly _ollama = ollama;
    private readonly _data: Settings;

    public constructor(data: Partial<OllamaRequest> = settings) {
        this._data = {
            ...data,
            model: data.model || settings.model,
            stream: false
        };
    };

    public chat(promt: string|OllamaRequest) {
        if (typeof promt === "string")
            return this._ollama.chat({ ...this._data, messages: [{ role, content: promt }] });

        return this._ollama.chat({
            ...this._data,
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