import OpenAI, { ClientOptions } from "openai";
import { Models } from "../types/models.types";

export default class Ai {
    private readonly _role: "user" = "user";
    private readonly _model: Models = "gpt-4o-mini";
    private readonly _openai: OpenAI;

    public constructor(data: (ClientOptions & { key: string }) | string) {
        this._openai = typeof data === "string"
            ? new OpenAI({apiKey: data})
            : new OpenAI(data);
    }

    public chat(message: string[]|string, data: { model?: Models, steam?: boolean }) {
        try {
            const reply = this._openai.chat.completions.create({
                model: data.model || this._model,
                ...data,
                messages: (typeof message === "string"
                    ? [message]
                    : message
                ).map(msg => {
                        return { role: this._role, content: msg };
                    })
            });
    
            return reply;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    public get ai(): OpenAI {
        return this._openai;
    }
}