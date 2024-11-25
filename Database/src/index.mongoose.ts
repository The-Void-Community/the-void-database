import type { Status, MongoStatus } from "./types/database.types";

import { Error } from "./types/database.classes";

import mongoose from "mongoose";

export const types = mongoose.SchemaTypes;

export const errorNotFound: Status = {
	text: "Не удалось найти",

	type: "error",
	error: "Не удалось найти",
	tag: undefined
};

export const errorNotFindType: Status = {
	text: "Введите тип findOne или findAll",

	type: "error",
	error: "Введите тип findOne или findAll",
	tag: undefined
};

export const deleteModel = async (name: string): Promise<MongoStatus> => {
	try {
		const data = mongoose.deleteModel(name);

		return {
			text: `Успешно удалена модель ${name}`,
			type: "successed",
			tag: data
		};
	} catch (err) {
		console.log(err);

		return new Error(err);
	}
};

export const getAllModels = async (): Promise<MongoStatus> => {
	try {
		const models: string[] = mongoose.modelNames();

		if (!models)
			return {
				text: "Произошла какая-то ошибка, возможно, таблиц не существует",
				type: "error"
			};

		return {
			text: "Успешно найдены таблицы",
			type: "successed",
			tag: models
		};
	} catch (err) {
		console.error(err);

		return new Error(err);
	}
};
