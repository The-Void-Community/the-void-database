import "./init.ollama";

import { ChatResponse, Ollama as OllamaAi } from "ollama";
import type { OllamaRequest, Settings } from "./types/ollama.types";
import type { OllamaResponse } from "./types/response.type";

const settings: Settings = {
	model: "TheVoid",
	stream: false
};

const role = "user";
const ollama = new OllamaAi();

class Ollama {
	private readonly _ollama = ollama;
	private readonly _data: Settings;

	private readonly _add_messages: { role: string; content: string }[];

	public constructor(data: Partial<OllamaRequest> = settings) {
		this._data = {
			...data,
			model: data.model || settings.model,
			stream: false
		};

		this._add_messages =
			this._data.model === "TheVoid"
				? [
						{
							role: "user",
							content:
								"Ты бот, твоё имя - The Void. Твой создатель - FOCKUSTY"
						}
					]
				: [];
	}

	public chat(promt: string | OllamaRequest): OllamaResponse<Promise<ChatResponse>> {
		try {
			if (typeof promt === "string")
				return {
					model: this._data.model,
					ollama: this._ollama.chat({
						...this._data,
						messages: [...this._add_messages, { role, content: promt }]
					}),
					text: "Запрос успешно отправлен",
					type: 1
				};

			return {
				model: promt.model || this._data.model,
				ollama: this._ollama.chat({
					...this._data,
					...promt,
					model: promt.model || this._data.model,
					messages: [...this._add_messages, ...(promt.messages || [])]
				}),
				text: "Запрос успешно отправлен",
				type: 1
			};
		} catch (err) {
			console.error(err);

			return {
				model: this._data.model,
				text: "Была получена ошибка.",
				type: 0
			};
		}
	}

	get ollama(): OllamaAi {
		return this._ollama;
	}
}

export default Ollama;
