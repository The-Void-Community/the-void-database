import mongoose, { Schema } from "mongoose";
import { types } from "../index.mongoose";

interface ICVC {
  guild_id: string;
  channel_id: string;
}

const schema = new Schema<ICVC>({
  guild_id: { type: types.String, required: true },
  channel_id: { type: types.String, required: true }
});

export default mongoose.model("create-voice-channels", schema);

export { ICVC, schema };
