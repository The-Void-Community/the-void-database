import "./init.ollama";

import { Ollama as OllamaAi } from "ollama";
import type {
    OllamaRequest,
    Settings
} from './types/ollama.types';

const settings: Settings = {
    model: "TheVoid",
    stream: false
};

const role = "user";
const ollama = new OllamaAi();

class Ollama {
    private readonly _ollama = ollama;
    private readonly _data: Settings;

    private readonly _add_messages: { role: string, content: string }[];

    public constructor(data: Partial<OllamaRequest> = settings) {
        this._data = {
            ...data,
            model: data.model || settings.model,
            stream: false
        };

        this._add_messages = this._data.model === "TheVoid"
            ? [{ role: "user", content: "Ты бот, твоё имя - The Void. Твой создатель - FOCKUSTY" }]
            : [];
    }

    public async chat(promt: string|OllamaRequest) {
        if (typeof promt === "string")
            return await this._ollama.chat({ ...this._data, messages: [...this._add_messages, { role, content: promt }] });

        return await this._ollama.chat({
            ...this._data,
            ...promt,
            messages: [...this._add_messages, ...promt.messages||[]],
        });
    }

    get ollama(): OllamaAi {
        return this._ollama;
    }
};

export default Ollama;