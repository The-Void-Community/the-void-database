import mongoose, { Schema } from "mongoose";
import { types } from "../index.mongoose";

interface ICVC {
	guildId: string;
	channelId: string;
}

const schema = new Schema<ICVC>({
	guildId: { type: types.String, required: true },
	channelId: { type: types.String, required: true }
});

export default mongoose.model("create-voice-channels", schema);

export { ICVC, schema };
