import mongoose, { Schema } from "mongoose";
import { types } from "../index.mongoose";

type ModKeys = "mutes" | "bans" | "warns";
interface IMod {
	added: boolean;
	cleaned: boolean;
	enabled: boolean;
}

type RequiredKeys = "channel_id" | "enabled";
interface IDefaultLog {
	channel_id: string;
	enabled: boolean;

	delete: boolean;
	update: boolean;

	exit: boolean;
	enter: boolean;
}

interface ILog {
	guild_id: string;

	options: {
		enabled: boolean;

		server: Pick<IDefaultLog, RequiredKeys | "update">;
		channels: Pick<IDefaultLog, RequiredKeys | "delete" | "update">;
		messages: Pick<IDefaultLog, RequiredKeys | "delete" | "update">;
		bots: Pick<IDefaultLog, RequiredKeys | "exit" | "enter">;

		users: {
			channel_id: string;
			enabled: boolean;

			server: {
				roles_update: boolean;

				exit: boolean;
				enter: boolean;
			};

			profile: {
				nickname: boolean;
				avatar: boolean;
			};

			moderation: Record<ModKeys, IMod>;
		};
	};
}

const defaultStringType = { type: types.String, required: true };
const defaultBooleanType = { type: types.Boolean, required: true };

const requiredTypes = {
	channel_id: defaultStringType,
	enabled: defaultBooleanType
};

const modTypes = {
	added: defaultBooleanType,
	cleaned: defaultBooleanType,
	enabled: defaultBooleanType
};

const schema = new Schema<ILog>({
	guild_id: { type: types.String, unique: true, required: true },

	options: {
		server: {
			...requiredTypes,
			update: defaultBooleanType
		},

		channels: {
			...requiredTypes,

			delete: defaultBooleanType,
			update: defaultBooleanType
		},

		messages: {
			...requiredTypes,

			delete: defaultBooleanType,
			update: defaultBooleanType
		},

		bots: {
			...requiredTypes,

			exit: defaultBooleanType,
			enter: defaultBooleanType
		},

		users: {
			...requiredTypes,

			server: {
				roles_update: defaultBooleanType,

				exit: defaultBooleanType,
				enter: defaultBooleanType
			},

			profile: {
				nickname: defaultBooleanType,
				avatar: defaultBooleanType
			},

			moderation: {
				mutes: modTypes,
				bans: modTypes,
				warns: modTypes
			}
		}
	}
});

export default mongoose.model("log", schema);

export { ILog, schema };
