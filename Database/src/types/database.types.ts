import { DeleteResult } from "mongodb";
import mongoose, { Model, UpdateWriteOpResult } from "mongoose";

export const types = mongoose.SchemaTypes;

export type StatusType = "error" | "successed";
export type FindType = "one" | "all";

export interface Status {
	id?: string;

	text: string;
	type: StatusType;

	error?: any | undefined;
	tag?: Model<any> | string;
}

export interface MongoStatus {
	id?: string;

	text: string;
	type: StatusType;

	error?: any;
	tag?: any;

	updatedTag?: UpdateWriteOpResult;
	deletadTag?: DeleteResult;
}

export type IfEquals<T, U, Y = unknown, N = never> =
	(<G>() => G extends T ? 1 : 2) extends <G>() => G extends U ? 1 : 2 ? Y : N;
