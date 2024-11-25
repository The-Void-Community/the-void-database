import type { StatusType } from "./database.types";

export class Error {
	readonly type: StatusType = "error";
	readonly text: string = "Возможная ошибка на стороне сервера";

	public error: any;

	constructor(err: any) {
		this.error = err;
	}
}

export class ErrorNotFindType {
	readonly type: StatusType = "error";
	readonly text: string =
		"Введите тип one или all, возможная ошибка на стороне сервера";

	public error: any;

	constructor(err: any) {
		this.error = err;
	}
}

export class ErrorNotFound {
	readonly type: StatusType = "error";
	readonly text: string = "Не удалось найти, возможная ошибка на стороне сервера.";

	public error: any;

	constructor(err: any) {
		this.error = err;
	}
}
