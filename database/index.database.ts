import mongoose from "mongoose";

import type { Model as ModelType } from "mongoose";
import type {
	Filter,
	FindOptions,
	DatabaseStatus as Status,
	UpdateOptions
} from "./types/database.types";

import Error from "./types/database.classes";

class StaticDatabase {
	public deleteModel = async (name: string): Promise<Status> => {
		try {
			const data = mongoose.deleteModel(name);

			return {
				text: `Успешно удалена модель ${name}`,
				type: 1,
				data: data
			};
		} catch (err) {
			console.log(err);

			return new Error(`${err}`);
		}
	};

	public getData = async <T>(
		Model: ModelType<T>,
		options: FindOptions<T>
	): Promise<Status> => {
		try {
			const data = await Model.find(
				options.filter,
				options.projection,
				options.options
			);

			if (!data)
				return {
					text: "Возможно, таблицы не существует",
					type: 0
				};

			return {
				text: "Таблица успешно найдена",
				type: 1,
				data: data
			};
		} catch (err) {
			console.error(err);

			return new Error(`${err}`);
		}
	};

	public getAllModels = async (): Promise<Status> => {
		try {
			const models: string[] = mongoose.modelNames();

			if (!models)
				return {
					text: "Произошла какая-то ошибка, возможно, таблиц не существует",
					type: 0
				};

			return {
				text: "Успешно найдены таблицы",
				type: 1,
				data: models
			};
		} catch (err) {
			console.error(err);

			return new Error(`${err}`);
		}
	};
}

class Database<T> {
	private readonly _model: ModelType<T>;
	private readonly static: StaticDatabase = new StaticDatabase();

	constructor(model: ModelType<T>) {
		this._model = model;
	}

	get model() {
		return this._model;
	}

	public create = async (doc: T): Promise<Status> => {
		try {
			return {
				text: "created",
				type: 1,
				data: await this._model.create(doc)
			};
		} catch (err: any) {
			console.log(err);
			return {
				text: "error",
				type: 0,
				error: err
			};
		}
	};

	public update = async (options: UpdateOptions<T>): Promise<Status> => {
		try {
			return {
				text: "updated",
				type: 1,
				data: await this._model.updateOne(options.filter, options.update)
			};
		} catch (err: any) {
			console.log(err);
			return {
				text: "error",
				type: 0,
				error: err
			};
		}
	};

	public delete = async (filter: Filter<T>): Promise<Status> => {
		try {
			return {
				text: "deleted",
				type: 1,
				data: await this._model.deleteOne(filter)
			};
		} catch (err: any) {
			console.log(err);
			return {
				text: "error",
				type: 0,
				error: err
			};
		}
	};

	public getData = async (options: FindOptions<T>): Promise<Status> => {
		try {
			return await this.static.getData<T>(this._model, options);
		} catch (err: any) {
			console.log(err);
			return {
				text: "error",
				type: 0,
				error: err
			};
		}
	};

	public data = async (): Promise<Status> => {
		try {
			return {
				text: "getted",
				type: 1,
				data: await this._model.find()
			};
		} catch (err: any) {
			console.log(err);
			return {
				text: "error",
				type: 0,
				error: err
			};
		}
	};

	public deleteModel = async (): Promise<Status> => {
		try {
			return await this.static.deleteModel(this._model.name);
		} catch (err: any) {
			console.log(err);
			return {
				text: "error",
				type: 0,
				error: err
			};
		}
	};
}

export { StaticDatabase };

export default Database;
