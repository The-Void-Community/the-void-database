import type { DatabaseStatus as Status } from "./types/database.types";

import Error from "./types/database.classes";

import mongoose from "mongoose";

export const types = mongoose.SchemaTypes;

export const errorNotFound: Status = {
	text: "Не удалось найти",

	error: "Не удалось найти",
	type: 0,
	data: undefined
};

export const errorNotFindType: Status = {
	text: "Введите тип findOne или findAll",

	error: "Введите тип findOne или findAll",
	type: 0,
	data: undefined
};

export const deleteModel = async (name: string): Promise<Status> => {
	try {
		const data = mongoose.deleteModel(name);

		return {
			text: `Успешно удалена модель ${name}`,
			type: 0,
			data: data
		};
	} catch (err: any) {
		console.log(err);

		return new Error(err);
	}
};

export const getAllModels = async (): Promise<Status> => {
	try {
		const models: string[] = mongoose.modelNames();

		if (!models)
			return {
				text: "Произошла какая-то ошибка, возможно, таблиц не существует",
				type: 0
			};

		return {
			text: "Успешно найдены таблицы",
			type: 0,
			data: models
		};
	} catch (err: any) {
		console.error(err);

		return new Error(err);
	}
};
