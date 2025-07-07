import mongoose, { Schema, SchemaTypes } from "mongoose";
import { Settings } from "../../settings/settings";

import type { SchemaParameters } from "../../types/mongodb.types";
import type { IUser } from "../../types/user.type";

const data: SchemaParameters<IUser> = {
  id: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true
  },

  avatar_url: { type: SchemaTypes.String, required: false, unique: false },
  username: { type: SchemaTypes.String, required: true, unique: true },
  nickname: { type: SchemaTypes.String, required: false, unique: false },

  created_at: { type: SchemaTypes.String, required: true, unique: false },

  guilds: {
    type: [SchemaTypes.String],
    required: true
  },

  settings: { type: SchemaTypes.String, unique: false, default: Settings.CONSTANTS.raw.available.users.toString() },
  config: {
    type: {
      guild: {
        when_user_join_into_guild_send_message_to_user: { type: [SchemaTypes.String], required: false },
    
        when_user_leave_from_guild_send_message_to_user: { type: SchemaTypes.Mixed, required: false },
        when_user_join_into_guild_send_hello_message_to_channel: { type: SchemaTypes.Mixed, required: false },
    
        when_user_leave_from_guild_send_goodbye_message_to_channel: { type: SchemaTypes.Mixed, required: false },
        when_user_join_into_guild_grant_roles: { type: SchemaTypes.Mixed, required: false },
    
        /** channel id */
        when_user_join_into_voice_create_voice_and_move_him: { type: SchemaTypes.String, required: false },
      },
    
      logging: {
        when_bot_join_into_guild_send_log_into_channel: { type: SchemaTypes.String, required: false },
        when_bot_leave_from_guild_send_log_into_channel: { type: SchemaTypes.String, required: false },
    
        when_user_join_into_guild_send_log_into_channel: { type: SchemaTypes.String, required: false },
        when_user_leave_from_guild_send_log_into_channel: { type: SchemaTypes.String, required: false },
    
        when_message_was_sended_send_log_into_channel: { type: SchemaTypes.String, required: false },
        when_message_was_changed_send_log_into_channel: { type: SchemaTypes.String, required: false },
        when_message_was_deleted_send_log_into_channel: { type: SchemaTypes.String, required: false },
    
        when_user_change_profile_send_log_into_channel: { type: SchemaTypes.String, required: false },
        when_user_change_activity_send_log_into_channel: { type: SchemaTypes.String, required: false },
        when_user_takes_mute_send_log_into_channel: { type: SchemaTypes.String, required: false },
        when_user_takes_ban_send_log_into_channel: { type: SchemaTypes.String, required: false },
    
        when_roles_changes_at_user_send_log_into_channel: { type: SchemaTypes.String, required: false },
    
        when_guild_profile_changes_send_log_into_channel: { type: SchemaTypes.String, required: false },
      }
    },
    
    default: {
      guild: {
        when_user_join_into_guild_send_message_to_user: [],
    
        when_user_leave_from_guild_send_message_to_user: null,
        when_user_join_into_guild_send_hello_message_to_channel: null,
    
        when_user_leave_from_guild_send_goodbye_message_to_channel: null,
        when_user_join_into_guild_grant_roles: null,
    
        /** channel id */
        when_user_join_into_voice_create_voice_and_move_him: null,
      },
    
      logging: {
        when_bot_join_into_guild_send_log_into_channel: null,
        when_bot_leave_from_guild_send_log_into_channel: null,
    
        when_user_join_into_guild_send_log_into_channel: null,
        when_user_leave_from_guild_send_log_into_channel: null,
    
        when_message_was_sended_send_log_into_channel: null,
        when_message_was_changed_send_log_into_channel: null,
        when_message_was_deleted_send_log_into_channel: null,
    
        when_user_change_profile_send_log_into_channel: null,
        when_user_change_activity_send_log_into_channel: null,
        when_user_takes_mute_send_log_into_channel: null,
        when_user_takes_ban_send_log_into_channel: null,
    
        when_roles_changes_at_user_send_log_into_channel: null,
    
        when_guild_profile_changes_send_log_into_channel: null,
      },
    }
  }
};
const keys = Object.keys(data);
const schema = new Schema<IUser>(data);

const database = mongoose.model("user", schema);

export { schema as UserSchema, data as UserData, keys as UserKeys };

export default database;
