import mongoose, { Schema } from "mongoose";

import type { SchemaParameters } from "../../types/mongodb.types";
import type { ITeam } from "../../types/guild-team.types";

const data: SchemaParameters<ITeam> = {
  id: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true
  },

  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true
  },

  owner_id: {
    type: mongoose.SchemaTypes.String,
    required: true
  },

  members: {
    type: mongoose.SchemaTypes.Map,
    required: true
  },

  roles: {
    type: mongoose.SchemaTypes.Map,
    required: true
  },

  channels: mongoose.SchemaTypes.Array
};
const keys = Object.keys(data);
const schema = new Schema<ITeam>(data);

const database = mongoose.model("team", schema);

export { schema as TeamSchema, data as TeamData, keys as TeamKeys };

export default database;
