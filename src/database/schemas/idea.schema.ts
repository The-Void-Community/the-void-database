import mongoose, { Schema } from "mongoose";
import { types } from "../index.mongoose";

interface IIdea {
  name: string;
  description: string;

  username: string;
  global_name: string;
  guild_name: string;
}

const schema = new Schema<IIdea>({
  name: { type: types.String, required: true },
  description: { type: types.String, required: true },

  username: { type: types.String, required: true },
  global_name: { type: types.String, required: true },
  guild_name: { type: types.String, required: true }
});

export default mongoose.model("idea", schema);

export { IIdea, schema };
