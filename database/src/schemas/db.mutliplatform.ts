import mongoose, { Schema } from "mongoose";
import { types } from "../index.mongoose";

interface IMultiplatform {
	telegram_id: string;
	discord_id: string;

	telegram_name: string;
	discord_name: string;

	password: string;
}

const schema = new Schema<IMultiplatform>({
	telegram_id: { type: types.String, required: true, unique: true },
	discord_id: { type: types.String, required: true, unique: true },

	telegram_name: { type: types.String, required: true },
	discord_name: { type: types.String, required: true },

	password: { type: types.String, required: true }
});

export default mongoose.model("multiplatform", schema);

export { IMultiplatform, schema };
