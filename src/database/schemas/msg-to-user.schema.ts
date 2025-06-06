import mongoose, { Schema } from "mongoose";
import { types } from "../index.mongoose";

interface IMTU {
  guild_id: string;
  enabled: boolean;
  text: string;
}

const schema = new Schema<IMTU>({
  guild_id: { type: types.String, required: true },
  enabled: { type: types.Boolean, required: true },
  text: { type: types.String, required: true },
});

export default mongoose.model("mtu", schema);

export { IMTU, schema };
