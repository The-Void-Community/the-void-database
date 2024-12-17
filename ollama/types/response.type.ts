import { ChatResponse } from "ollama";

type Response = {
	ollama: ChatResponse;

	message: string;
	input: string;

	type: 0 | 1;
};

export { Response };
