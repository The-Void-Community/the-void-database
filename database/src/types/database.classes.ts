import type { StatusType, DatabaseStatus } from "./database.types";

class Error implements DatabaseStatus {
	public readonly error: string;
	public readonly text: string;
	public readonly type: 0 = 0;
	public readonly data: any;

	constructor(err: string, data?: { text?: string; data?: any }) {
		this.error = err;

		this.data = data?.data || null;
		this.text = data?.text || "Произошла ошибка на стороне сервера";
	}
}

export class ErrorNotFindType {
	readonly type: StatusType = 0;
	readonly text: string =
		"Введите тип one или all, возможная ошибка на стороне сервера";

	public error: any;

	constructor(err: any) {
		this.error = err;
	}
}

export class ErrorNotFound {
	readonly type: StatusType = 0;
	readonly text: string = "Не удалось найти, возможная ошибка на стороне сервера.";

	public error: any;

	constructor(err: any) {
		this.error = err;
	}
}

export default Error;
